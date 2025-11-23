// app/api/setupBucket/route.ts
import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

export async function POST() {
  try {
    // Try to read the bucket first
    const { data: bucket, error: getErr } = await supabaseAdmin.storage.getBucket('posters')
    if (getErr || !bucket) {
      // Create the bucket (public so client can read publicUrl)
      const { data, error } = await supabaseAdmin.storage.createBucket('posters', { public: true })
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      return NextResponse.json({ created: true, bucket: data })
    }

    return NextResponse.json({ created: false, bucket })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 })
  }
}
