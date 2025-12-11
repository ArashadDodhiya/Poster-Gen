import { GoogleGenAI } from "@google/genai";

// Init new client for Gemini
const GEMINI_API_KEY = process.env.GEMINI_API_KEY
if (!GEMINI_API_KEY) {
  // Avoid throwing at import time to not break environments that don't use Gemini
  console.warn("GEMINI_API_KEY is not set. Gemini functions will fail if called.")
}

const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

// -----------------------------
// TEXT GENERATION (CAPTIONS)
// -----------------------------
export async function generateCaption(prompt: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: "models/gemini-2.5-flash",
    contents: prompt,
  });

  // The SDK exposes a `text` property with the output text
  return response.text ?? "";
}

// -----------------------------
// IMAGE GENERATION (POSTER)
// -----------------------------
export async function generatePoster(_prompt: string): Promise<string> {
  // Avoid unused lint warning
  console.debug("generatePoster called with prompt length:", String(_prompt).length)

  // This project uses Hugging Face for the poster pipeline. If you'd like to
  // enable Gemini image generation here, we can add an implementation later
  // using `ai.images.generate()` or the appropriate method from the SDK.
  throw new Error("Image generation via Gemini is not currently supported in this configuration.");
}
