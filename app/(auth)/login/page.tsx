"use client"
import { useState } from "react"
import { supabaseBrowser } from "@/lib/supabaseBrowser"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const supabase = supabaseBrowser()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: any) {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert(error.message)
    } else {
      router.push("/generate")
      router.refresh()
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleLogin} className="bg-white shadow p-6 rounded w-96">
      <h1 className="text-xl font-semibold mb-4">Login</h1>

      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full mb-3 rounded"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-3 rounded"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        disabled={loading}
        className="bg-blue-600 text-white w-full py-2 rounded"
      >
        {loading ? "Loading..." : "Login"}
      </button>
    </form>
  )
}
