import type { Database, Json } from "@/types/database"

export type Achievement     = Database["public"]["Tables"]["achievements"]["Row"]
export type UserAchievement = Database["public"]["Tables"]["user_achievements"]["Row"] & {
  achievement?: Achievement
}

/** Typed achievement requirement shape */
export interface AchievementRequirement {
  quests_completed?: number
  level?:            number
  streak?:           number
  gold?:             number
  [key: string]:     number | undefined
}

export function parseRequirement(raw: Json): AchievementRequirement {
  return (raw as AchievementRequirement) ?? {}
}
