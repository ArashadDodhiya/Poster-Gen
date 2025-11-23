// lib/huggingface.ts
export async function generatePoster(prompt: string): Promise<string> {
  try {
    // Enhanced prompt for better marketing posters
    const enhancedPrompt = `${prompt}, professional marketing poster, vibrant colors, high quality, 8k resolution, sharp focus, professional photography, commercial advertisement style, clean composition, studio lighting`

    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-dev",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: enhancedPrompt,
          parameters: {
            width: 1024,
            height: 1024,
            num_inference_steps: 28,
            guidance_scale: 3.5,
          }
        }),
      }
    )

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Hugging Face API error: ${error}`)
    }

    const blob = await response.blob()
    const arrayBuffer = await blob.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString('base64')
    
    return base64
  } catch (error: any) {
    console.error("Error generating poster:", error)
    throw error
  }
}