import { createClient } from "@/lib/supabase/server"
import type { Quest, CreateQuestInput, UpdateQuestInput } from "@/types/quest"

/**
 * questService — all quest database operations.
 * Row-level security ensures users only see their own quests.
 */
export const questService = {
  async getAll(userId: string): Promise<Quest[]> {
    const supabase = await createClient()
    const { data, error } = await (supabase.from("quests") as any)
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return (data ?? []) as Quest[]
  },

  async create(input: CreateQuestInput): Promise<Quest> {
    const supabase = await createClient()
    const { data, error } = await (supabase.from("quests") as any)
      .insert(input)
      .select()
      .single()

    if (error) throw error
    return data as Quest
  },

  async update(id: string, input: UpdateQuestInput): Promise<Quest> {
    const supabase = await createClient()
    const { data, error } = await (supabase.from("quests") as any)
      .update(input)
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data as Quest
  },

  async delete(id: string): Promise<void> {
    const supabase = await createClient()
    const { error } = await (supabase.from("quests") as any).delete().eq("id", id)
    if (error) throw error
  },

  async complete(id: string): Promise<Quest> {
    return questService.update(id, {
      completed: true,
      completed_at: new Date().toISOString(),
    })
  },
}
