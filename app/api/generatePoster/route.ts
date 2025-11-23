import { NextResponse } from "next/server"
import { generatePoster } from "../../../lib/huggingface"
import { supabaseAdmin } from "../../../lib/supabaseAdmin"
import { ensureBucket } from "../../../lib/ensureBucket"

// ----------------------------
// BUSINESS TEMPLATE DEFINITIONS
// ----------------------------
const templateMap: Record<string, string> = {
  "Restaurant": `
    realistic restaurant dish photography, elegant menu layout,
    warm lighting, clean modern typography, premium dining vibe
  `,
  "Clothing Store": `
    fashion model, stylish clothing, minimal boutique layout,
    soft shadows, premium fashion aesthetic
  `,
  "Beauty Salon": `
    luxury beauty visual, makeup brushes, soft gradients,
    glowing skin retouching, elegant salon vibe
  `,
  "Gym / Fitness": `
    sporty fitness poster, dumbbells, gym machines,
    bold high-energy layout, strong contrast
  `,
  "Real Estate": `
    modern house interior, architectural lighting,
    premium property showcasing, clean real estate brochure style
  `,
  "Grocery Store": `
    fresh fruits & vegetables, colorful grocery layout,
    discount box space, clean and friendly vibe
  `,
  "Home Services": `
    cleaning tools, handyman tools, service icons,
    clean layout, professional service poster
  `,
  "Tuition / Coaching": `
    books, classroom illustrations, study desk,
    educational visuals, clean academic layout
  `,
  "Cake Shop": `
    delicious cakes, pastries, dessert photography,
    pastel bakery colors, sweet shop vibe
  `,
  "Tiffin Service": `
    Indian homemade meals, tiffin boxes, steel plates,
    warm food lighting, homely comfort style
  `,
  "Boutique": `
    designer fabric textures, elegant patterns,
    beauty-oriented clothing theme, boutique elegance
  `,
  "Cafe": `
    coffee cup, latte art, cozy cafe interior,
    warm brown tones, aesthetic cafe poster
  `
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      businessType,
      headline,
      details,
      style = "modern",
      colors = "bright"
    } = body

    // --- pick template or fallback ---
    const template = templateMap[businessType] || `
      clean professional business poster, elegant layout, soft gradient lighting
    `

    // -------------------------------
    // FINAL AI PROMPT WITH TEMPLATE
    // -------------------------------
    const prompt = `
Create a high-quality **1080x1080** promotional poster for:

Business Type: **${businessType}**

Apply this visual style:
${template}

Poster Style: ${style}
Color Theme: ${colors}

Text to include:
- Headline: "${headline}"
- Details: "${details || ""}"

Rules:
- No watermark
- No distorted text
- No random objects
- Make the poster clean, symmetrical, aesthetic
- 1:1 ratio, social media friendly
    `

    // 1) Generate poster using HuggingFace SDXL
    const b64Image = await generatePoster(prompt)
    const buffer = Buffer.from(b64Image, "base64")

    // 2) Ensure bucket exists
    await ensureBucket("posters")

    // 3) Upload to Supabase
    const fileName = `poster-${Date.now()}.png`
    const { error: uploadErr } = await supabaseAdmin.storage
      .from("posters")
      .upload(fileName, buffer, {
        contentType: "image/png",
        upsert: true
      })

    if (uploadErr) throw uploadErr

    // 4) Get public URL
    const { data: urlData } = supabaseAdmin.storage
      .from("posters")
      .getPublicUrl(fileName)

    return NextResponse.json({ imageUrl: urlData.publicUrl })

  } catch (err: any) {
    console.error("Poster API Error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
