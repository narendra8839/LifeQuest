import { createClient } from "@/lib/supabase/server"
import type { AuthCredentials, AuthResult } from "@/types/auth"

/**
 * authService — server-side authentication operations.
 * All methods use the server Supabase client.
 */
export const authService = {
  async signUp({ email, password }: AuthCredentials): Promise<AuthResult> {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.signUp({ email, password })
    return { data, error }
  },

  async signIn({ email, password }: AuthCredentials): Promise<AuthResult> {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    return { data, error }
  },

  async signOut(): Promise<void> {
    const supabase = await createClient()
    await supabase.auth.signOut()
  },

  async getUser() {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },
}
