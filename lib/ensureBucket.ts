// lib/ensureBucket.ts
import { supabaseAdmin } from './supabaseAdmin'

export async function ensureBucket(bucketName: string) {
  try {
    // 1) Check if bucket exists
    const { data: existingBucket, error: getError } = await supabaseAdmin.storage.getBucket(bucketName)

    if (existingBucket && !getError) {
      console.log(`Bucket '${bucketName}' already exists`)
      return
    }

    // 2) Create bucket
    console.log(`Creating bucket '${bucketName}'...`)
    const { data: newBucket, error: createError } = await supabaseAdmin.storage.createBucket(bucketName, {
      public: true,
      fileSizeLimit: 52428800, // 50MB
      allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg']
    })

    if (createError) {
      if (createError.message.includes('already exists')) {
        console.log(`Bucket '${bucketName}' already exists`)
        return
      }
      throw new Error(`Failed to create bucket: ${createError.message}`)
    }

    // 3) Set up RLS policies via SQL
    console.log('Setting up storage policies...')
    const { error: policyError } = await supabaseAdmin.rpc('exec_sql', {
      sql: `
        -- Allow all operations on the posters bucket
        CREATE POLICY IF NOT EXISTS "Public Access to ${bucketName}"
        ON storage.objects FOR ALL
        USING (bucket_id = '${bucketName}');
      `
    })

    if (policyError) {
      console.warn('Policy creation warning (may already exist):', policyError.message)
    }

    console.log(`Bucket '${bucketName}' created successfully`)
  } catch (err: any) {
    console.error('ensureBucket error:', err)
    throw err
  }
}