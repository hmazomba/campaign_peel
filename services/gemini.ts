
import { GoogleGenAI, Type } from "@google/genai";
import { MarketingAsset, GenerationParams } from "../types";

// Always use the injected process.env.API_KEY directly
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateMarketingAssets = async (params: GenerationParams): Promise<MarketingAsset[]> => {
  const prompt = `
    Analyze the following marketing content and generate a diverse set of high-converting marketing assets.
    
    Source Content: "${params.sourceText}"
    Desired Tone: "${params.tone}"
    Target Audience: "${params.targetAudience}"
    
    Requirements:
    1. LinkedIn Post: Thought-leadership style, professional but hooky.
    2. Twitter Thread: A 4-tweet thread with a strong opening "hook".
    3. Instagram Caption: Punchy, emojis included, lifestyle-oriented.
    4. Facebook Ad: Direct response, focusing on pain points and solutions.
    5. Google Search Ad: Two headlines and a description.
    
    Provide the output in a structured JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              type: { type: Type.STRING, description: "The platform or type of asset" },
              content: { type: Type.STRING, description: "The main body text of the asset" },
              headline: { type: Type.STRING, description: "Optional headline or hook" },
              hashtags: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "Relevant hashtags without the #"
              }
            },
            required: ["type", "content"]
          }
        }
      }
    });

    const jsonStr = response.text || "[]";
    const data = JSON.parse(jsonStr);
    
    return data.map((item: any, index: number) => ({
      id: `asset-${Date.now()}-${index}`,
      type: item.type,
      content: item.content,
      headline: item.headline,
      hashtags: item.hashtags
    }));
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate campaign assets. Please check your source text and try again.");
  }
};
