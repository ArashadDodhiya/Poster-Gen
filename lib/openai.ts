// lib/openai.ts
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!
})

export async function generatePoster(prompt: string): Promise<string> {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      response_format: "b64_json"
    })

    const b64Image = response.data?.[0]?.b64_json ?? ""
    if (!b64Image) throw new Error("No image data returned")
    return b64Image
  } catch (error: any) {
    console.error("Error generating poster:", error)
    throw error
  }
}