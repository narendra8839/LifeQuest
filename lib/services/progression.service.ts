import { createClient } from "@/lib/supabase/server"
import { calculateLevel, calculateXpForNextLevel } from "@/lib/utils/level"

/**
 * progressionService — handles XP grants, level-ups, gold updates, and streak tracking.
 * This keeps all RPG progression logic separate from the UI and from quest CRUD.
 */
export const progressionService = {
  /**
   * Award XP and Gold to a user after completing a quest.
   * Handles level-up if XP threshold is crossed.
   */
  async awardRewards(
    userId: string,
    xpReward: number,
    goldReward: number
  ): Promise<{ newLevel: number; leveledUp: boolean }> {
    const supabase = await createClient()

    const { data: profile, error } = await (supabase.from("profiles") as any)
      .select("xp, level, gold")
      .eq("id", userId)
      .single()

    if (error || !profile) throw error ?? new Error("Profile not found")

    const currentProfile = profile as { xp: number; level: number; gold: number }
    const newXp    = currentProfile.xp   + xpReward
    const newGold  = currentProfile.gold  + goldReward
    const newLevel = calculateLevel(newXp)
    const leveledUp = newLevel > currentProfile.level

    await (supabase.from("profiles") as any)
      .update({ xp: newXp, gold: newGold, level: newLevel, updated_at: new Date().toISOString() })
      .eq("id", userId)

    return { newLevel, leveledUp }
  },

  /**
   * Increment the user's streak by 1.
   */
  async incrementStreak(userId: string): Promise<number> {
    const supabase = await createClient()

    const { data: profile } = await (supabase.from("profiles") as any)
      .select("streak")
      .eq("id", userId)
      .single()

    const currentProfile = profile as { streak: number } | null
    const newStreak = (currentProfile?.streak ?? 0) + 1

    await (supabase.from("profiles") as any)
      .update({ streak: newStreak, updated_at: new Date().toISOString() })
      .eq("id", userId)

    return newStreak
  },

  /**
   * Reset the user's streak to 0 (called when a daily quest is missed).
   */
  async resetStreak(userId: string): Promise<void> {
    const supabase = await createClient()
    await (supabase.from("profiles") as any)
      .update({ streak: 0, updated_at: new Date().toISOString() })
      .eq("id", userId)
  },
}

// Re-export for convenience
export { calculateXpForNextLevel }
