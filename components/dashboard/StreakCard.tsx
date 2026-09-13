"use client"

import { useHero } from "@/lib/stores/heroStore"

export function StreakCard() {
  const { profile } = useHero()

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#ffb4ab]/20 bg-gradient-to-br from-[#1a1b21] to-[#111318] p-5 shadow-lg">
      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[#93000a]/20 blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ffb4ab]">
          <span className="material-symbols-rounded text-base">local_fire_department</span>
          Battle Streak
        </div>
        <span className="rounded-full bg-[#ffb4ab]/10 border border-[#ffb4ab]/30 px-2.5 py-0.5 text-[10px] font-bold text-[#ffb4ab]">
          STREAK × 1.4
        </span>
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="font-display text-4xl font-extrabold text-white">
          {profile.streak}
        </span>
        <span className="text-sm font-semibold text-[#d4c4ae]">Consecutive Days</span>
      </div>

      <p className="mt-2 text-xs text-white/60 leading-relaxed">
        Your momentum grants a +40% bonus multiplier to all earned XP and Gold. Complete at least one quest daily to sustain the fire.
      </p>

      <div className="mt-4 flex items-center justify-between rounded-xl bg-[#0c0e13] p-3 border border-white/5">
        <div className="flex items-center gap-2">
          <span className="material-symbols-rounded text-green-400 text-sm">shield</span>
          <span className="text-xs text-white/80">Streak Ward Status</span>
        </div>
        <span className="text-[11px] font-bold text-green-400">Active Today</span>
      </div>
    </div>
  )
}
