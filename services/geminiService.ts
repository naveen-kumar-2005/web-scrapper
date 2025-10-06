import { GoogleGenAI, Type } from '@google/genai';
import type { Product } from '../types';
import { Platform } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you might want to handle this more gracefully.
  // For this environment, we assume API_KEY is always present.
  console.warn("API_KEY environment variable not set. Using a placeholder.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      id: { type: Type.STRING, description: 'A unique product ID' },
      platform: {
        type: Type.STRING,
        enum: Object.values(Platform),
        description: 'The e-commerce platform name.',
      },
      title: { type: Type.STRING, description: 'The full product title.' },
      price: { type: Type.NUMBER, description: 'The product price in numbers, in Indian Rupees.' },
      currency: { type: Type.STRING, description: "The currency symbol, must be '₹'." },
      rating: { type: Type.NUMBER, description: 'The product rating out of 5, e.g., 4.5.' },
      reviewCount: { type: Type.INTEGER, description: 'The total number of reviews.' },
      productUrl: { type: Type.STRING, description: 'The direct URL to the product page.' },
      imageUrl: { type: Type.STRING, description: 'A URL for the product image.' },
      isAvailable: { type: Type.BOOLEAN, description: 'Whether the product is in stock.' },
    },
    required: ['id', 'platform', 'title', 'price', 'currency', 'rating', 'reviewCount', 'productUrl', 'imageUrl', 'isAvailable'],
  },
};

export const fetchScrapedData = async (keyword: string): Promise<Product[]> => {
  try {
    const prompt = `
      Act as a web scraping API. For the search term "${keyword}", generate a realistic but fictional list of 20 to 30 product listings from various e-commerce platforms like Amazon, Flipkart, eBay, and Walmart. 
      Prices must be in Indian Rupees (INR) and the currency symbol must be '₹'.
      Ensure a good mix of platforms.
      For image URLs, use the format: https://picsum.photos/seed/{a-random-word}/200/200
      Provide the response as a JSON array that conforms to the specified schema.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    const data = JSON.parse(jsonText) as Product[];

    // Post-process to ensure data consistency
    return data.map(item => ({
        ...item,
        // Ensure rating is within a 0-5 range with one decimal place
        rating: Math.max(0, Math.min(5, parseFloat(item.rating.toFixed(1)))),
    }));

  } catch (error) {
    console.error('Error fetching data from Gemini API:', error);
    throw new Error('Failed to retrieve scraped data. The AI model may be temporarily unavailable.');
  }
};