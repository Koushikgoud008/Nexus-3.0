
import { SearchParams, SearchResult } from "./types.ts";
import { transformProduct } from "./productTransformer.ts";

const productSources = [
  { tableName: 'amazon_products_1', transform: transformProduct.amazon },
  { tableName: 'amazon_products_2', transform: transformProduct.amazon },
  { tableName: 'flipkart_1', transform: transformProduct.flipkart },
  { tableName: 'flipkart_2', transform: transformProduct.flipkart },
  { tableName: 'fashion_1', transform: transformProduct.fashion }
];

export async function handleSearchQueries(
  supabase: any,
  params: SearchParams
): Promise<SearchResult> {
  console.log("Building queries for search params:", JSON.stringify(params, null, 2));
  
  // Get search results from all product sources
  const queries = buildQueries(supabase, params);
  console.log(`Executing ${queries.length} queries across product sources`);
  const results = await Promise.all(queries);
  
  let allProducts: any[] = [];
  let totalCount = 0;

  console.log("Processing query results...");
  results.forEach((result, index) => {
    if (result.error) {
      console.error(`Error in query for ${productSources[index].tableName}:`, result.error);
      throw result.error;
    }
    
    const sourceProducts = result.data || [];
    console.log(`Found ${sourceProducts.length} products in ${productSources[index].tableName}`);
    
    const transformedProducts = sourceProducts.map((product: any) => {
      try {
        return productSources[index].transform(product);
      } catch (error) {
        console.error(`Error transforming product from ${productSources[index].tableName}:`, error);
        return null;
      }
    }).filter(Boolean);
    
    allProducts = [...allProducts, ...transformedProducts];
    totalCount += result.count || 0;
  });

  console.log(`Combined ${allProducts.length} products from all sources`);

  // Apply price filters
  if (params.minPrice !== null && params.minPrice !== undefined) {
    allProducts = allProducts.filter(p => p.price >= params.minPrice);
  }
  if (params.maxPrice !== null && params.maxPrice !== undefined) {
    allProducts = allProducts.filter(p => p.price <= params.maxPrice);
  }

  // Apply relevance scoring and sorting
  if (params.searchTerm && params.searchTerm.trim() !== '') {
    calculateRelevanceScores(allProducts, params.searchTerm);
    allProducts.sort((a, b) => b._relevanceScore - a._relevanceScore);
    
    // Log top 3 results and their scores for debugging
    if (allProducts.length > 0) {
      console.log("Top search results with scores:");
      allProducts.slice(0, 3).forEach((p, i) => {
        console.log(`${i+1}. [Score: ${p._relevanceScore.toFixed(2)}] ${p.name}`);
      });
    }
  } else if (params.sortBy === 'price-low') {
    allProducts.sort((a, b) => a.price - b.price);
  } else if (params.sortBy === 'price-high') {
    allProducts.sort((a, b) => b.price - a.price);
  } else if (params.sortBy === 'rating') {
    allProducts.sort((a, b) => b.rating - a.rating);
  }

  // Remove the temporary relevance score property before returning
  allProducts = allProducts.map(p => {
    const product = {...p};
    delete product._relevanceScore;
    return product;
  });

  // Slice to match requested limit
  const paginatedProducts = allProducts.slice(params.offset, params.offset + params.limit);
  console.log(`Returning ${paginatedProducts.length} products after filtering and sorting`);

  return { products: paginatedProducts, totalCount: allProducts.length };
}

function buildQueries(supabase: any, params: SearchParams) {
  console.log(`Building queries for: ${params.searchTerm || 'empty search'}`);
  
  if (!params.searchTerm || params.searchTerm.trim() === '') {
    return productSources.map(source => {
      console.log(`Creating query for ${source.tableName} without search term`);
      return supabase
        .from(source.tableName)
        .select('*', { count: 'exact' })
        .limit(params.limit * 2); // Get more results for better sorting
    });
  }

  // Split search term into individual words
  const searchWords = params.searchTerm.toLowerCase().trim().split(/\s+/);
  console.log(`Search terms parsed as keywords: [${searchWords.join(', ')}]`);

  return productSources.map(source => {
    console.log(`Creating search query for ${source.tableName} with keywords`);
    const query = supabase
      .from(source.tableName)
      .select('*', { count: 'exact' });

    // Build query conditions based on source table
    if (source.tableName.startsWith('amazon')) {
      // For each search word, check if it appears in any of the relevant fields
      const conditions = searchWords.map(word => 
        `Product Title.ilike.%${word}%,Brand.ilike.%${word}%,Category.ilike.%${word}%,Product Description.ilike.%${word}%`
      );
      
      // Join conditions so that at least one word must match in at least one field
      const searchCondition = conditions.join(',');
      query.or(searchCondition);
      
    } else if (source.tableName.startsWith('flipkart')) {
      const conditions = searchWords.map(word => 
        `product_name.ilike.%${word}%,brand.ilike.%${word}%,description.ilike.%${word}%`
      );
      
      const searchCondition = conditions.join(',');
      query.or(searchCondition);
      
    } else if (source.tableName === 'fashion_1') {
      const conditions = searchWords.map(word => 
        `name.ilike.%${word}%,brand.ilike.%${word}%,description.ilike.%${word}%,colour.ilike.%${word}%`
      );
      
      const searchCondition = conditions.join(',');
      query.or(searchCondition);
    }

    // Get more results than needed to allow for better post-query relevance sorting
    const extraLimit = Math.max(50, params.limit * 3);
    return query.limit(extraLimit);
  });
}

function calculateRelevanceScores(products: any[], searchTerm: string) {
  // Parse search terms into individual words
  const searchWords = searchTerm.toLowerCase().trim().split(/\s+/);
  
  // Define field weights for scoring
  const fieldWeights = {
    name: 10,       // Product name/title has highest weight
    brand: 7,       // Brand is very important
    store: 5,       // Store name is somewhat important
    description: 3, // Description is less important but still valuable
    category: 5     // Category is moderately important
  };

  // Calculate relevance score for each product
  products.forEach(product => {
    let score = 0;
    
    // Fields to check for matches (normalize field names across different data sources)
    const fieldsToCheck = {
      name: product.name || '',
      brand: typeof product.brand === 'string' ? product.brand : '',
      store: product.store || '',
      description: product.description || '',
      category: product.category || ''
    };

    // Count matches for each search word in each field
    searchWords.forEach(word => {
      // Skip very short words (optional)
      if (word.length < 2) return;
      
      Object.entries(fieldsToCheck).forEach(([field, value]) => {
        const fieldText = String(value).toLowerCase();
        const weight = fieldWeights[field as keyof typeof fieldWeights] || 1;
        
        // Exact word match (with word boundaries)
        if (new RegExp(`\\b${word}\\b`).test(fieldText)) {
          score += weight * 2;
        } 
        // Partial match anywhere in the text
        else if (fieldText.includes(word)) {
          score += weight;
        }
        
        // Bonus for words appearing early in the field text
        if (fieldText.indexOf(word) !== -1) {
          const position = fieldText.indexOf(word);
          const positionBonus = Math.max(0, 1 - (position / 100)); // Higher bonus for earlier positions
          score += positionBonus * weight * 0.5;
        }
      });
    });
    
    // Bonus for matching multiple words (higher percentage of search words matched)
    const matchedWordCount = searchWords.filter(word => 
      Object.values(fieldsToCheck).some(value => 
        String(value).toLowerCase().includes(word)
      )
    ).length;
    
    const matchPercentage = matchedWordCount / searchWords.length;
    score += matchPercentage * 10; // Significant bonus for matching all terms
    
    // Check for sequential word matches (phrase matches)
    const allText = Object.values(fieldsToCheck).join(' ').toLowerCase();
    if (allText.includes(searchTerm.toLowerCase())) {
      score += 5; // Bonus for exact phrase match
    }
    
    // Store the score on the product (will be removed before returning to client)
    product._relevanceScore = Math.max(0, score);
  });
}

