"use client"

import type { Achievement } from "@/types/achievement"
import { soundEngine } from "@/lib/utils/audio"

interface AchievementCardProps {
  achievement: Achievement
  isUnlocked: boolean
  onClick: () => void
}

export function AchievementCard({ achievement, isUnlocked, onClick }: AchievementCardProps) {
  const req = achievement.requirement as Record<string, number>
  const target = Object.values(req)[0] || 1
  const current = isUnlocked ? target : Math.floor(target * 0.6)
  const progressPercent = Math.min(100, Math.round((current / target) * 100))

  return (
    <div
      onClick={() => {
        soundEngine.playClick()
        onClick()
      }}
      className={`group relative flex flex-col justify-between rounded-xl border p-5 transition-all duration-200 cursor-pointer ${
        isUnlocked
          ? "border-[#ffc659]/30 bg-[#161829] hover:border-[#ffc659] hover:-translate-y-1 shadow-lg shadow-[#ffc659]/5"
          : "border-white/8 bg-[#111318] opacity-70 hover:opacity-100 hover:border-white/20"
      }`}
    >
      <div>
        {/* Top Badges & Icon */}
        <div className="flex items-start justify-between">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-transform group-hover:scale-105 ${
              isUnlocked
                ? "bg-gradient-to-br from-[#ffc659]/20 to-[#641ea3]/20 border-[#ffc659]/40 text-[#ffc659] shadow-md shadow-[#ffc659]/10"
                : "bg-white/5 border-white/10 text-white/40"
            }`}
          >
            <span className="material-symbols-rounded text-2xl">{achievement.icon}</span>
          </div>

          <span
            className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
              isUnlocked
                ? "bg-green-500/10 border-green-500/30 text-green-400"
                : "bg-white/5 border-white/10 text-white/50"
            }`}
          >
            {isUnlocked ? "Unlocked" : "In Progress"}
          </span>
        </div>

        {/* Title & Lore */}
        <h4
          className={`mt-4 font-display text-base font-bold transition-colors ${
            isUnlocked ? "text-white group-hover:text-[#ffc659]" : "text-white/80"
          }`}
        >
          {achievement.name}
        </h4>
        <p className="mt-1 text-xs text-[#d4c4ae] leading-relaxed line-clamp-2">
          {achievement.description}
        </p>
      </div>

      <div className="mt-5 space-y-3 pt-3 border-t border-white/5">
        {/* Progress meter */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-white/50">{isUnlocked ? "Conquered" : `${current} / ${target}`}</span>
            <span className={isUnlocked ? "text-green-400 font-bold" : "text-[#57dffe]"}>
              {progressPercent}%
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isUnlocked ? "bg-gradient-to-r from-green-400 to-[#ffc659]" : "bg-gradient-to-r from-[#2dc3e1] to-[#57dffe]"
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Rewards */}
        <div className="flex items-center justify-between text-xs font-mono font-bold">
          <span className="text-[#57dffe]">+{achievement.reward_xp} XP</span>
          <span className="text-[#ffc659]">🪙 +{achievement.reward_gold} Gold</span>
        </div>
      </div>
    </div>
  )
}
