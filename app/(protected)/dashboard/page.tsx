import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Command Center",
  description: "Your LifeQuest dashboard — overview of your quests, XP, gold, and achievements.",
}

/**
 * Dashboard / Command Center page — placeholder.
 * Full UI will be implemented from the Stitch design.
 */
export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-4xl font-bold text-gold-400 text-glow-gold">
        Command Center
      </h1>
      {/* TODO: PlayerSummary, XPProgress, StreakCard, GoldCard, TodayQuests, RecentAchievements */}
    </div>
  )
}
