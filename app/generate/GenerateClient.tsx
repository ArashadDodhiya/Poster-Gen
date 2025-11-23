"use client"

import { useState } from "react"
import PosterForm from "../../components/PosterForm"
import OutputCard from "../../components/OutputCard"

export default function GenerateClient({ userId }: { userId: string }) {
  const [result, setResult] = useState<{ imageUrl: string | null, captions?: string[] } | null>(null)

  return (
    <div className="space-y-6">
      <PosterForm userId={userId} onResult={setResult} />
      {result && <OutputCard data={result} />}
    </div>
  )
}
