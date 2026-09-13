import type { Metadata } from "next"
import { PlayerSummary } from "@/components/dashboard/PlayerSummary"
import { TodayQuests } from "@/components/dashboard/TodayQuests"
import { StreakCard } from "@/components/dashboard/StreakCard"
import { AttributesSummaryCard } from "@/components/dashboard/AttributesSummaryCard"
import { RecentAchievements } from "@/components/dashboard/RecentAchievements"

export const metadata: Metadata = {
  title: "Command Center",
  description: "Your LifeQuest dashboard — overview of your quests, XP, gold, and achievements.",
}

export default function DashboardPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-6 space-y-8">
      {/* Dashboard Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-white/8 pb-6">
        <div>
          <div className="flex items-center gap-2 text-[#ffc659] text-xs font-bold uppercase tracking-wider">
            <span className="material-symbols-rounded text-sm">shield</span>
            COMMAND CENTER • DAILY QUEST LOG
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white text-glow-gold tracking-tight mt-1">
            Command Center
          </h1>
          <p className="text-sm text-[#d4c4ae] max-w-2xl mt-1.5 leading-relaxed">
            Small steps create legendary results. Your next quest awaits, vanguard.
          </p>
        </div>

        {/* Right Status Panel */}
        <div className="hidden md:flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#111318] px-4 py-2.5 shadow-sm">
          <span className="pulse-indicator" />
          <div className="text-xs">
            <span className="text-white/50 block text-[10px] uppercase font-bold tracking-wider">Cloud Codex Link</span>
            <span className="font-semibold text-[#57dffe]">Active & Synchronized</span>
          </div>
        </div>
      </div>

      {/* Hero Progression Panel */}
      <PlayerSummary />

      {/* 12-Column Main Layout Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left 8 Columns: Today's Quests */}
        <div className="lg:col-span-8">
          <TodayQuests />
        </div>

        {/* Right 4 Columns: Streak, Attributes, Recent Achievements */}
        <div className="lg:col-span-4 space-y-6">
          <StreakCard />
          <AttributesSummaryCard />
          <RecentAchievements />
        </div>
      </div>
    </div>
  )
}
