import { GoogleGenAI } from "@google/genai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set in environment variables");
}

export const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

export const MODEL_NAME = "gemini-2.5-flash";

// Reusable config for JSON responses
export const JSON_CONFIG = {
  responseMimeType: "application/json" as const,
  temperature: 0.1, // Lower = more deterministic/consistent
};