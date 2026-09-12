import type { Achievement } from "@/types/achievement"
import type { Profile } from "@/types/profile"
import type { Quest } from "@/types/quest"

export interface AchievementCheckContext {
  profile: Profile
  quests: Quest[]
  unlockedIds: string[]
}

/**
 * checkAchievements — evaluates which achievements should be unlocked
 * given the player's current state.
 *
 * Returns an array of achievement IDs that are newly eligible.
 * Caller is responsible for persisting via achievementService.unlockAchievement().
 */
export function checkAchievements(
  achievements: Achievement[],
  ctx: AchievementCheckContext
): string[] {
  const { profile, quests, unlockedIds } = ctx
  const completedQuests = quests.filter((q) => q.completed)

  const newlyUnlocked: string[] = []

  for (const achievement of achievements) {
    // Skip already-unlocked achievements
    if (unlockedIds.includes(achievement.id)) continue

    // Evaluate requirement (extend this switch as more achievements are added)
    const req = achievement.requirement as Record<string, number>
    let eligible = false

    if (req.quests_completed !== undefined) {
      eligible = completedQuests.length >= req.quests_completed
    } else if (req.level !== undefined) {
      eligible = profile.level >= req.level
    } else if (req.streak !== undefined) {
      eligible = profile.streak >= req.streak
    } else if (req.gold !== undefined) {
      eligible = profile.gold >= req.gold
    }

    if (eligible) newlyUnlocked.push(achievement.id)
  }

  return newlyUnlocked
}
