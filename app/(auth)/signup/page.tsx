"use client"
import { useState } from "react"
import { supabaseBrowser } from "@/lib/supabaseBrowser"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const supabase = supabaseBrowser()
  const router = useRouter()

  async function handleSignup(e: any) {
    e.preventDefault()

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) alert(error.message)
    else router.push("/login")
  }

  return (
    <form onSubmit={handleSignup} className="bg-white shadow p-6 rounded w-96">
      <h1 className="text-xl font-semibold mb-4">Create Account</h1>

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

      <button className="bg-green-600 text-white w-full py-2 rounded">
        Sign Up
      </button>
    </form>
  )
}
