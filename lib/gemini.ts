import { GoogleGenAI } from "@google/genai";

// Init client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

// -----------------------------
// TEXT GENERATION (CAPTIONS)
// -----------------------------
export async function generateCaption(prompt: string) {
  const resp = await ai.models.generateText({
    model: "gemini-1.5-flash",
    prompt,
  });

  return resp.outputText();
}

// -----------------------------
// IMAGE GENERATION (POSTER)
// -----------------------------
export async function generatePoster(prompt: string) {
  const response = await ai.models.generateImages({
    model: "imagen-4.0-generate-001", // Google Imagen v4
    prompt,
    config: {
      numberOfImages: 1,        // generate only 1 for MVP
      aspectRatio: "1:1",       // perfect for posters (1080x1080)
      // You can also add:
      // negativePrompt: "bad text, blurry, distorted"
    },
  });

  const generated = response.generatedImages?.[0];
  if (!generated) {
    throw new Error("Gemini / Imagen did not return an image");
  }

  const imgBytes = generated.image.imageBytes;
  const base64 = Buffer.from(imgBytes).toString("base64");

  return base64;
}
