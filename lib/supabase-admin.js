import { createClient } from '@supabase/supabase-js'

// This client uses the service role key and bypasses RLS
// It should ONLY be used in secure server environments (like API routes or Scripts)
// NEVER expose the service role key to the client

if (!process.env.SUPABASE_SERVICE_KEY) {
  console.warn('⚠️ Missing SUPABASE_SERVICE_KEY in environment variables.');
}

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY || '',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)
