import { DIYTopic } from "./types";

// Note: This service requires Google Generative AI library
// Install it with: npm install @google/genai

let GoogleGenAI: any;
let Type: any;

try {
  const genai = require("@google/genai");
  GoogleGenAI = genai.GoogleGenAI;
  Type = genai.Type;
} catch (error) {
  console.warn("@google/genai not installed. AI-powered search will be disabled.");
}

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export async function generateDIYTopics(query: string): Promise<DIYTopic[]> {
  if (!GoogleGenAI || !API_KEY) {
    throw new Error("Gemini API is not configured. Please add NEXT_PUBLIC_GEMINI_API_KEY to your environment variables.");
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a list of 8 specific and actionable DIY project ideas related to "${query}". Focus on construction, home improvement, decor, and repair tasks. For each idea, provide a short, engaging one-sentence description.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            projects: {
              type: Type.ARRAY,
              description: "A list of DIY project ideas.",
              items: {
                type: Type.OBJECT,
                properties: {
                  title: {
                    type: Type.STRING,
                    description: "The title of the DIY project.",
                  },
                  description: {
                    type: Type.STRING,
                    description: "A short, one-sentence description of the project.",
                  },
                },
                required: ["title", "description"],
              },
            },
          },
          required: ["projects"],
        },
      },
    });

    const jsonString = response.text.trim();
    const parsedResponse = JSON.parse(jsonString);
    
    if (parsedResponse && Array.isArray(parsedResponse.projects)) {
      return parsedResponse.projects;
    } else {
      console.warn("Gemini API returned an unexpected format.", parsedResponse);
      throw new Error("Could not parse DIY topics from the response.");
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to fetch DIY ideas from Gemini API.");
  }
}
