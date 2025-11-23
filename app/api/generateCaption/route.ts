// app/api/generateCaption/route.ts
import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: Request) {
  const { businessType, headline, details } = await req.json()

  try {
    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.5-flash" // ✅ correct model name
    })

    const prompt = `
You are a social media marketing expert. Generate 3 engaging captions for a ${businessType} promotional post.

Headline: ${headline}
Details: ${details}

Requirements:
- Catchy and engaging
- Include emojis
- Under 150 characters
- Suitable for Instagram/Facebook
- Numbered 1, 2, 3
    `.trim()

    console.log("Generating captions with Gemini...")

    const result = await model.generateContent(prompt)

    // ✔ Correct Gemini SDK method
    const text = result.response.text()

    console.log("Raw Gemini Output:", text)

    // ✔ Convert numbered text into array
    const captions = text
      .split(/\n?\d+\.\s/)
      .filter(Boolean)
      .map(c => c.trim())

    return NextResponse.json({ captions })

  } catch (err: any) {
    console.error("Caption API Error:", err)

    // ✔ headline exists here now
    const fallback = [
      `🎉 ${headline} — Don't miss out! Visit us today! 💫`,
      `✨ Special offer: ${headline} ${details ? '- ' + details : ''} 🛍️`,
      `🔥 Limited time: ${headline} — Tag a friend who needs this! 👇`
    ]

    return NextResponse.json({ captions: fallback })
  }
}
