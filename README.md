# 🛍️ Nexus Store – Multi-Source Price Aggregator & Product Discovery Engine

Welcome to **Nexus**, a modern, high-performance web-based shopping assistant and price comparison platform. Nexus allows users to query, aggregate, and rank products from multiple major e-commerce platforms (such as Amazon India, Flipkart, and Fashion/Myntra stores) in real-time, providing a unified shopping experience.

Nexus leverages **React**, **TypeScript**, and **Tailwind CSS** on the frontend, with **Supabase Database, Auth, and Deno Edge Functions** powering the backend.

---

## 🚀 Key Features

* **Multi-Store Search Aggregation:** Search across Amazon, Flipkart, and Fashion datasets simultaneously.
* **Custom Relevance Scoring Engine:** Search queries are processed by a custom server-side scoring algorithm that assigns weights to product fields (Title: 10, Brand: 7, Category/Store: 5, Description: 3), rewards exact word boundaries, applies early-position bonuses, and scores sequential phrase matches.
* **Smart Filtering & Sorting:** Filter products by custom price ranges (Min/Max) or specific category datasets. Sort results dynamically by Relevance, Price (Low to High, High to Low), or Product Ratings.
* **Dynamic Search Auto-Refresh:** Automatically refreshes the search results page every 30 seconds if the results are stale.
* **Unified UI Grid & UX:** High-fidelity UI cards showing current price, original price (MRP), automated discount percentage calculations, overall user ratings (rendered in interactive stars), merchant store attribution, and redirection to direct store URLs.
* **User Authentication:** Complete user registration, login, profile management, and session persistency using Supabase Auth.
* **Responsive, Premium Design:** Sleek modern aesthetics designed with Tailwind CSS, utilizing Radix UI primitives and shadcn/ui components.

---

## 🛠️ Technology Stack

### Frontend
* **Core:** React (v18), TypeScript, Vite (Build Tool)
* **Routing:** React Router DOM (v6)
* **State & Data Fetching:** TanStack React Query (v5)
* **Forms & Validation:** React Hook Form, Zod
* **Styling & UI:** Tailwind CSS, Radix UI primitives (via shadcn/ui), Lucide React (Icons)
* **Feedback:** Sonner & Shadcn UI Toasters

### Backend & Database
* **Database & Hosting:** Supabase (PostgreSQL)
* **Auth:** Supabase Auth (JWT based session management)
* **Edge Functions:** Supabase Edge Functions (Deno runtime, TypeScript)

---

## 📁 Project Directory Structure

```text
code-source-nexus-main 2.0/
├── public/                 # Static assets (images, logos, icons)
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/             # Radix + shadcn/ui base elements
│   │   ├── Header.tsx      # Main application navigation header with auth triggers
│   │   ├── Footer.tsx      # App footer with copyright and quick links
│   │   ├── ProductCard.tsx # Unified product item renderer with discount & store badge
│   │   ├── ProductGrid.tsx # Handles loading, error, empty state & grid layout
│   │   ├── SearchBar.tsx   # Controlled search input with debounce / submit hooks
│   │   └── FilterBar.tsx   # Sidebar or header bar for sorting and price range inputs
│   ├── context/
│   │   └── AuthContext.tsx # Global session and authentication state provider
│   ├── hooks/
│   │   ├── useProducts.ts  # React hook orchestrating calls to Supabase edge functions
│   │   └── use-toast.ts    # Notification management hooks
│   ├── integrations/
│   │   └── supabase/       # Supabase Client wrapper and generated TS types
│   ├── pages/              # Route level container components
│   │   ├── Index.tsx       # Landing page (hero, categories grid, popular list)
│   │   ├── CategoryPage.tsx# Filtered product views per category (Skincare, Watches, etc.)
│   │   ├── About.tsx       # Corporate mission statement and team background
│   │   ├── Contact.tsx     # Customer feedback and message submission form
│   │   ├── Auth.tsx        # Authentication forms (login, register, forgot password)
│   │   └── NotFound.tsx    # 404 fallback page
│   ├── App.tsx             # Route declarations and query client provider
│   ├── index.css           # Global CSS variables, fonts, and Tailwind directives
│   └── main.tsx            # App mount element entrypoint
├── supabase/
│   ├── config.toml         # Local Supabase CLI configuration
│   └── functions/          # Serverless Deno Edge functions
│       └── search-products/# API endpoint processing multi-table queries
│           ├── index.ts    # Server handler and table verification logic
│           ├── searchQueries.ts # Multi-keyword SQL generator and relevance scorer
│           ├── productTransformer.ts # Schema-to-Product normalizer
│           └── types.ts    # Deno-specific type contracts
├── package.json            # npm dependency manifest
├── tailwind.config.ts      # Tailwind styling definitions (colors, fonts, animations)
└── tsconfig.json           # Compiler rules for TypeScript
```

---

## 📊 Database Architecture

The backend queries data from five separate e-commerce tables stored in Supabase:

| Table Name | Primary Source | Key Columns |
| :--- | :--- | :--- |
| `amazon_products_1` | Amazon India | `Unique ID`, `Product Title`, `Price`, `Mrp`, `Brand`, `Category`, `Image Urls`, `Site Name`, `Offers` |
| `amazon_products_2` | Amazon India | `Unique ID`, `Product Title`, `Price` (numeric), `Mrp` (numeric), `Brand`, `Category`, `Image Urls` |
| `flipkart_1` | Flipkart | `uniq_id`, `product_name`, `discounted_price`, `retail_price`, `brand`, `image` (JSON), `product_rating`, `product_url` |
| `flipkart_2` | Flipkart | `uniq_id`, `product_name`, `discounted_price`, `retail_price`, `brand`, `image` (JSON), `product_rating`, `product_url` |
| `fashion_1` | Fashion (Myntra) | `p_id`, `name`, `price`, `brand`, `img` (URL), `avg_rating`, `colour`, `description` |

### Data Transformation Pipeline
Since each database schema differs (e.g. `product_name` on Flipkart vs `Product Title` on Amazon), the Supabase edge function standardizes these row types into a unified frontend interface:

```typescript
export interface Product {
  id: string;             // Standardized UUID or item identifier
  name: string;           // Title of the product
  price: number;          // Current selling price (INR)
  originalPrice?: number; // Retail price / MRP (INR)
  image: string;          // Extracted single image URL
  rating: number;         // Floating point scale rating (out of 5)
  store: string;          // Source merchant attribution (e.g. "Amazon In", "Flipkart")
  storeUrl: string;       // Direct referral or purchasing URL
  offer?: string;         // String summarizing the discount details
}
```

---

## 🧠 Custom Relevance Scoring Logic
When a search query is submitted, the search-products Edge Function does not just run basic SQL matches; it performs a complex multi-layered relevance sorting:

1. **Keyword Splitting:** The search string is split into individual keywords (e.g., `"blue running shoes"` $\to$ `["blue", "running", "shoes"]`).
2. **Database Querying:** Runs parallel `ilike` operations across titles, brands, and categories for all tables.
3. **Scoring:** For each matching product:
   * **Exact Boundary Matches:** Matches containing complete word boundaries (e.g. `\bword\b`) score double standard weights.
   * **Positional Boost:** Bonus points are awarded if the keyword appears near the beginning of the title.
   * **Multi-Keyword Synergy:** Products matching multiple separate terms (e.g., both `"blue"` and `"shoes"`) receive a significant multiplier boost.
   * **Phrase Match Bonus:** Matching the exact input sequence adds an additional flat bonus.
4. **Post-Query Sorting:** Once calculated, the temporary scores determine list positions before slicing the page payload.

---

## ⚙️ Getting Started

### Prerequisites
* **Node.js** (v18.x or above recommended)
* **npm** (or `bun` / `yarn`)
* **Supabase CLI** (Optional, for local Edge Function testing)

### Step 1: Clone the repository
```bash
git clone <YOUR_REPOSITORY_URL>
cd code-source-nexus-main-2.0
```

### Step 2: Install dependencies
Install frontend and dev packages using npm:
```bash
npm install
```

### Step 3: Set up environment variables
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=https://your-supabase-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anonymous-key
```

### Step 4: Run the development server
Start the local server. Vite will output an internal hosting IP (usually `http://localhost:5173`):
```bash
npm run dev
```

### Step 5: Test/Run Edge Functions (Local)
To verify the search backend locally, make sure you have the Supabase CLI logged in, and spin up Deno functions:
```bash
supabase functions serve search-products --no-verify-jwt
```

---

## 📦 Build & Deployment

### Production Compilation
To bundle the static application for production hosting (Vercel, Netlify, Github Pages, etc.):
```bash
npm run build
```
The output files will be created in the `/dist` directory.

### Deploying Supabase Edge Functions
Deploy changes made in the `supabase/functions/search-products` directory straight to your live cloud workspace:
```bash
supabase functions deploy search-products --project-ref your-project-id
```

---

## 🛡️ License

This project is proprietary and confidential. All rights reserved.
