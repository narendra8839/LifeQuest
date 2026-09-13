import { createClient } from "@/lib/supabase/server"
import type { Achievement, UserAchievement } from "@/types/achievement"

/**
 * achievementService — all achievement and user_achievement database operations.
 */
export const achievementService = {
  async getAllAchievements(): Promise<Achievement[]> {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("achievements")
      .select("*")
      .order("name")

    if (error) throw error
    return (data ?? []) as Achievement[]
  },

  async getUserAchievements(userId: string): Promise<UserAchievement[]> {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("user_achievements")
      .select("*, achievement:achievements(*)")
      .eq("user_id", userId)

    if (error) throw error
    return (data ?? []) as UserAchievement[]
  },

  async unlockAchievement(userId: string, achievementId: string): Promise<UserAchievement> {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("user_achievements")
      .insert({ user_id: userId, achievement_id: achievementId, unlocked_at: new Date().toISOString() } as any)
      .select()
      .single()

    if (error) throw error
    return data as UserAchievement
  },
}
