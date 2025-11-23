import { GoogleGenerativeAI } from "@google/generative-ai";

// Init client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// -----------------------------
// TEXT GENERATION (CAPTIONS)
// -----------------------------
export async function generateCaption(prompt: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

// -----------------------------
// IMAGE GENERATION (POSTER)
// -----------------------------
export async function generatePoster(prompt: string) {
  // Image generation implementation pending correct SDK usage or API availability.
  // The previous implementation used a method that caused build errors.
  throw new Error("Image generation via Gemini is not currently supported in this configuration.");
}
