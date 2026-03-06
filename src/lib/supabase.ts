import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// To jest nasz "klient", którego będziemy importować w innych plikach
export const supabase = createClient(supabaseUrl, supabaseAnonKey)