import { createClient } from "@/lib/supabase/server"
import type { Profile, Attributes, UpdateProfileInput } from "@/types/profile"

/**
 * profileService — user profile + attributes database operations.
 */
export const profileService = {
  async getProfile(userId: string): Promise<Profile | null> {
    const supabase = await createClient()
    const { data, error } = await (supabase.from("profiles") as any)
      .select("*")
      .eq("id", userId)
      .single()

    if (error) return null
    return data as Profile
  },

  async updateProfile(userId: string, input: UpdateProfileInput): Promise<Profile> {
    const supabase = await createClient()
    const { data, error } = await (supabase.from("profiles") as any)
      .update({ ...input, updated_at: new Date().toISOString() })
      .eq("id", userId)
      .select()
      .single()

    if (error) throw error
    return data as Profile
  },

  async getAttributes(userId: string): Promise<Attributes | null> {
    const supabase = await createClient()
    const { data, error } = await (supabase.from("attributes") as any)
      .select("*")
      .eq("user_id", userId)
      .single()

    if (error) return null
    return data as Attributes
  },

  async upsertAttributes(userId: string, attrs: Partial<Omit<Attributes, "id" | "user_id">>): Promise<Attributes> {
    const supabase = await createClient()
    const { data, error } = await (supabase.from("attributes") as any)
      .upsert({ user_id: userId, ...attrs })
      .select()
      .single()

    if (error) throw error
    return data as Attributes
  },
}
