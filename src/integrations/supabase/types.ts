export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      amazon_products_1: {
        Row: {
          Brand: string | null
          Category: string | null
          "Combo Offers": string | null
          Date: string | null
          "Image Urls": string | null
          Mrp: string | null
          Offers: string | null
          "Pack Size Or Quantity": string | null
          Price: string | null
          "Product Description": string | null
          "Product Title": string | null
          Purchases: number | null
          "Site Name": string | null
          "Stock Availibility": string | null
          "Time Stamp": string | null
          "Unique ID": string | null
        }
        Insert: {
          Brand?: string | null
          Category?: string | null
          "Combo Offers"?: string | null
          Date?: string | null
          "Image Urls"?: string | null
          Mrp?: string | null
          Offers?: string | null
          "Pack Size Or Quantity"?: string | null
          Price?: string | null
          "Product Description"?: string | null
          "Product Title"?: string | null
          Purchases?: number | null
          "Site Name"?: string | null
          "Stock Availibility"?: string | null
          "Time Stamp"?: string | null
          "Unique ID"?: string | null
        }
        Update: {
          Brand?: string | null
          Category?: string | null
          "Combo Offers"?: string | null
          Date?: string | null
          "Image Urls"?: string | null
          Mrp?: string | null
          Offers?: string | null
          "Pack Size Or Quantity"?: string | null
          Price?: string | null
          "Product Description"?: string | null
          "Product Title"?: string | null
          Purchases?: number | null
          "Site Name"?: string | null
          "Stock Availibility"?: string | null
          "Time Stamp"?: string | null
          "Unique ID"?: string | null
        }
        Relationships: []
      }
      amazon_products_2: {
        Row: {
          Brand: string | null
          Category: string | null
          "Combo Offers": string | null
          Date: string | null
          "Image Urls": string | null
          Mrp: number | null
          Offers: string | null
          "Pack Size Or Quantity": string | null
          Price: number | null
          "Product Description": string | null
          "Product Title": string | null
          Purchases: number | null
          "Site Name": string | null
          "Stock Availibility": string | null
          "Time Stamp": string | null
          "Unique ID": string | null
        }
        Insert: {
          Brand?: string | null
          Category?: string | null
          "Combo Offers"?: string | null
          Date?: string | null
          "Image Urls"?: string | null
          Mrp?: number | null
          Offers?: string | null
          "Pack Size Or Quantity"?: string | null
          Price?: number | null
          "Product Description"?: string | null
          "Product Title"?: string | null
          Purchases?: number | null
          "Site Name"?: string | null
          "Stock Availibility"?: string | null
          "Time Stamp"?: string | null
          "Unique ID"?: string | null
        }
        Update: {
          Brand?: string | null
          Category?: string | null
          "Combo Offers"?: string | null
          Date?: string | null
          "Image Urls"?: string | null
          Mrp?: number | null
          Offers?: string | null
          "Pack Size Or Quantity"?: string | null
          Price?: number | null
          "Product Description"?: string | null
          "Product Title"?: string | null
          Purchases?: number | null
          "Site Name"?: string | null
          "Stock Availibility"?: string | null
          "Time Stamp"?: string | null
          "Unique ID"?: string | null
        }
        Relationships: []
      }
      fashion_1: {
        Row: {
          avg_rating: string | null
          brand: string | null
          colour: string | null
          description: string | null
          img: string | null
          name: string | null
          p_attributes: string | null
          p_id: number | null
          price: number | null
          ratingCount: string | null
        }
        Insert: {
          avg_rating?: string | null
          brand?: string | null
          colour?: string | null
          description?: string | null
          img?: string | null
          name?: string | null
          p_attributes?: string | null
          p_id?: number | null
          price?: number | null
          ratingCount?: string | null
        }
        Update: {
          avg_rating?: string | null
          brand?: string | null
          colour?: string | null
          description?: string | null
          img?: string | null
          name?: string | null
          p_attributes?: string | null
          p_id?: number | null
          price?: number | null
          ratingCount?: string | null
        }
        Relationships: []
      }
      flipkart_1: {
        Row: {
          brand: string | null
          crawl_timestamp: string | null
          description: string | null
          discounted_price: string | null
          image: Json | null
          is_FK_Advantage_product: boolean | null
          overall_rating: string | null
          pid: string | null
          product_category_tree: Json | null
          product_name: string | null
          product_rating: string | null
          product_specifications: string | null
          product_url: string | null
          retail_price: string | null
          uniq_id: string
        }
        Insert: {
          brand?: string | null
          crawl_timestamp?: string | null
          description?: string | null
          discounted_price?: string | null
          image?: Json | null
          is_FK_Advantage_product?: boolean | null
          overall_rating?: string | null
          pid?: string | null
          product_category_tree?: Json | null
          product_name?: string | null
          product_rating?: string | null
          product_specifications?: string | null
          product_url?: string | null
          retail_price?: string | null
          uniq_id: string
        }
        Update: {
          brand?: string | null
          crawl_timestamp?: string | null
          description?: string | null
          discounted_price?: string | null
          image?: Json | null
          is_FK_Advantage_product?: boolean | null
          overall_rating?: string | null
          pid?: string | null
          product_category_tree?: Json | null
          product_name?: string | null
          product_rating?: string | null
          product_specifications?: string | null
          product_url?: string | null
          retail_price?: string | null
          uniq_id?: string
        }
        Relationships: []
      }
      flipkart_2: {
        Row: {
          brand: string | null
          crawl_timestamp: string | null
          description: string | null
          discounted_price: string | null
          image: Json | null
          is_FK_Advantage_product: boolean | null
          overall_rating: string | null
          pid: string | null
          product_category_tree: Json | null
          product_name: string | null
          product_rating: string | null
          product_specifications: string | null
          product_url: string | null
          retail_price: string | null
          uniq_id: string | null
        }
        Insert: {
          brand?: string | null
          crawl_timestamp?: string | null
          description?: string | null
          discounted_price?: string | null
          image?: Json | null
          is_FK_Advantage_product?: boolean | null
          overall_rating?: string | null
          pid?: string | null
          product_category_tree?: Json | null
          product_name?: string | null
          product_rating?: string | null
          product_specifications?: string | null
          product_url?: string | null
          retail_price?: string | null
          uniq_id?: string | null
        }
        Update: {
          brand?: string | null
          crawl_timestamp?: string | null
          description?: string | null
          discounted_price?: string | null
          image?: Json | null
          is_FK_Advantage_product?: boolean | null
          overall_rating?: string | null
          pid?: string | null
          product_category_tree?: Json | null
          product_name?: string | null
          product_rating?: string | null
          product_specifications?: string | null
          product_url?: string | null
          retail_price?: string | null
          uniq_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
