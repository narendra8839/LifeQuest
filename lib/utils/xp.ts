import { XP_REWARDS } from "@/lib/constants"
import type { QuestDifficulty } from "@/types/quest"

/**
 * calculateQuestXp — base XP reward for a quest based on difficulty.
 */
export function calculateQuestXp(difficulty: QuestDifficulty): number {
  return XP_REWARDS[difficulty] ?? XP_REWARDS.normal
}

/**
 * calculateQuestGold — gold reward for a quest based on difficulty.
 * Gold scales with XP at a 1:2 ratio.
 */
export function calculateQuestGold(difficulty: QuestDifficulty): number {
  return Math.floor(calculateQuestXp(difficulty) / 2)
}

/**
 * formatXp — pretty-prints an XP value (e.g. 1200 → "1.2K XP").
 */
export function formatXp(xp: number): string {
  if (xp >= 1_000_000) return `${(xp / 1_000_000).toFixed(1)}M XP`
  if (xp >= 1_000)     return `${(xp / 1_000).toFixed(1)}K XP`
  return `${xp} XP`
}
