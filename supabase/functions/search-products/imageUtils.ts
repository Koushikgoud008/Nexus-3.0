
export function parseImageUrls(jsonbString: string): string[] {
  try {
    // Parse the JSONB string into an array
    const urls: string[] = JSON.parse(jsonbString);
    
    // Optional: Log each URL
    urls.forEach((url, index) => {
      console.log(`Image ${index + 1}: ${url}`);
    });
    
    return urls;
  } catch (error) {
    console.error('Failed to parse image URLs:', error);
    return [];
  }
}

// Example usage
// const imageUrls = parseImageUrls(jsonbImageString);
