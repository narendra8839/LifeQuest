"use client"

import type { Achievement } from "@/types/achievement"
import { AchievementCard } from "@/components/achievements/AchievementCard"

interface AchievementGridProps {
  achievements: Achievement[]
  unlockedIds: string[]
  onSelect: (ach: Achievement) => void
}

export function AchievementGrid({ achievements, unlockedIds, onSelect }: AchievementGridProps) {
  if (achievements.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#111318] p-12 text-center">
        <span className="material-symbols-rounded text-5xl text-white/20">search_off</span>
        <h4 className="mt-3 text-base font-bold text-white">No Achievements Found</h4>
        <p className="mt-1 text-xs text-[#d4c4ae] max-w-sm">
          No records match your active category or filter chip.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {achievements.map((ach) => (
        <AchievementCard
          key={ach.id}
          achievement={ach}
          isUnlocked={unlockedIds.includes(ach.id)}
          onClick={() => onSelect(ach)}
        />
      ))}
    </div>
  )
}
