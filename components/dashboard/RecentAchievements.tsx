"use client"

import Link from "next/link"
import { useHero } from "@/lib/stores/heroStore"

export function RecentAchievements() {
  const { userAchievements, achievements } = useHero()

  const recent = userAchievements.slice(0, 3)

  return (
    <div className="rounded-2xl border border-white/10 bg-[#1a1b21] p-5 shadow-lg space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="label-caps text-[#ddb8ff] text-[10px]">Accolades</span>
          <h4 className="font-display text-lg font-bold text-white mt-0.5">Recent Achievements</h4>
        </div>
        <span className="rounded-full bg-[#641ea3]/30 border border-[#ddb8ff]/30 px-2.5 py-0.5 text-[10px] font-bold text-[#ddb8ff]">
          {userAchievements.length} / {achievements.length} Unlocked
        </span>
      </div>

      <div className="space-y-2.5">
        {recent.map((ua) => (
          <div
            key={ua.id}
            className="flex items-center gap-3 rounded-xl border border-white/5 bg-[#0c0e13] p-3 hover:border-[#ffc659]/30 transition-all group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#ffc659]/20 to-[#641ea3]/20 border border-[#ffc659]/30 text-[#ffc659]">
              <span className="material-symbols-rounded text-xl">
                {ua.achievement?.icon || "military_tech"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h5 className="font-semibold text-xs text-white group-hover:text-[#ffc659] transition-colors truncate">
                {ua.achievement?.name || "Heroic Feat"}
              </h5>
              <p className="text-[10px] text-white/50 truncate">
                {ua.achievement?.description}
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-[#ffc659] block">
                +{ua.achievement?.reward_xp || 50} XP
              </span>
            </div>
          </div>
        ))}

        {recent.length === 0 && (
          <div className="py-6 text-center text-xs text-white/40">
            No achievements unlocked yet. Conquer your quests to fill the archive!
          </div>
        )}
      </div>

      <div className="pt-2 border-t border-white/5 text-center">
        <Link
          href="/achievements"
          className="text-xs font-semibold text-[#ddb8ff] hover:underline flex items-center justify-center gap-1"
        >
          Explore Achievement Codex
          <span className="material-symbols-rounded text-sm">arrow_forward</span>
        </Link>
      </div>
    </div>
  )
}
