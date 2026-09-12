import type { Achievement } from "@/types/achievement"

interface AchievementCardProps {
  achievement: Achievement
  unlocked: boolean
  unlockedAt?: string | null
}

/** AchievementCard — single achievement tile. TODO: implement from Stitch design. */
export function AchievementCard(_props: AchievementCardProps) {
  return <div className="rpg-panel p-4">{/* TODO */}</div>
}
