import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Missing credentials shouldn't break the rest of the app — only leaderboard
// features (which check for null) are affected.
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

if (!supabase) {
  console.warn('Leaderboard disabled: missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY')
}
