import { supabaseServer } from "@/lib/supabaseServer"
import { redirect } from "next/navigation"
import GenerateClient from "./GenerateClient"

export default async function GeneratePage() {
  const supabase = await supabaseServer()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) redirect("/login")

  return <GenerateClient userId={session.user.id} />
}