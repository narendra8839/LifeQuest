import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Achievement Codex",
  description: "Browse, track and unlock achievements in LifeQuest.",
}

/**
 * Achievements / Achievement Codex page — placeholder.
 * Full UI will be implemented from the Stitch design.
 */
export default function AchievementsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-4xl font-bold text-gold-400 text-glow-gold">
        Achievement Codex
      </h1>
      {/* TODO: AchievementGrid, AchievementDetailModal */}
    </div>
  )
}
