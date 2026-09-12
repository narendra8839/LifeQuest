import { createBrowserClient } from "@supabase/ssr"
import type { Database } from "@/types/database"

/**
 * createClient — Supabase browser client (for Client Components).
 * Call this inside "use client" components or hooks.
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
