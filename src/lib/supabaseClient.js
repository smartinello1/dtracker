import { createClient } from '@supabase/supabase-js'
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)

const getSession = async () => {
  let supabaseSession = await supabase.auth.getSession()
  return supabaseSession.data
}

const supabaseSession = await getSession()

// Create a single supabase client for interacting with your database
export { supabase, supabaseSession }
