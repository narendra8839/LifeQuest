"use client"

import { useHero } from "@/lib/stores/heroStore"

export function CharacterPortrait() {
  const { profile, xpProgress, xpToNext } = useHero()

  return (
    <div className="space-y-6 rounded-2xl border border-white/10 bg-[#1a1b21] p-6 shadow-xl">
      {/* Character Image & Badges */}
      <div className="relative flex flex-col items-center text-center">
        <div className="relative">
          <div className="h-32 w-32 rounded-2xl overflow-hidden ring-4 ring-[#641ea3] shadow-2xl shadow-[#641ea3]/40">
            <img
              src={profile.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"}
              alt={profile.username || "Hero"}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-2.5 inset-x-0 mx-auto w-fit rounded-full bg-gradient-to-r from-[#ffc659] to-[#e5a92b] px-3 py-0.5 text-[11px] font-extrabold text-black shadow-md">
            LVL {profile.level}
          </div>
        </div>

        <div className="mt-4 space-y-1">
          <div className="flex items-center justify-center gap-2">
            <span className="rounded-full bg-[#641ea3]/30 border border-[#ddb8ff]/30 px-2.5 py-0.5 text-[10px] font-bold text-[#ddb8ff] uppercase tracking-wider">
              Arcane Blade
            </span>
            <span className="rounded-full bg-[#ffb4ab]/20 border border-[#ffb4ab]/30 px-2.5 py-0.5 text-[10px] font-bold text-[#ffb4ab] uppercase tracking-wider">
              STREAK × 1.4
            </span>
          </div>

          <h3 className="font-display text-2xl font-bold text-white tracking-wide">
            {profile.username || "Arjun"}
          </h3>
          <p className="text-xs text-[#d4c4ae]">
            Vanguard Rank: Silver III • The Resilient Scholar
          </p>
        </div>
      </div>

      {/* Recessed XP Progression Meter */}
      <div className="rounded-xl border border-white/5 bg-[#0c0e13] p-4 space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="label-caps text-[#ffc659] text-[10px]">XP Progression</span>
          <span className="font-mono text-xs font-bold text-white">
            {profile.xp} / {profile.xp + xpToNext} XP ({xpProgress}%)
          </span>
        </div>

        <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#ffc659] to-[#ddb8ff] transition-all duration-700 shadow-[0_0_10px_rgba(255,198,89,0.5)]"
            style={{ width: `${xpProgress}%` }}
          />
        </div>
      </div>

      {/* Next Perk Milestone */}
      <div className="rounded-xl border border-[#57dffe]/30 bg-[#57dffe]/5 p-4 flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#57dffe]/10 border border-[#57dffe]/30 text-[#57dffe]">
          <span className="material-symbols-rounded text-lg">auto_awesome</span>
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#57dffe] block">
            Next Perk at Lvl {profile.level + 1}
          </span>
          <h5 className="font-semibold text-xs text-white mt-0.5">Focus Aura II</h5>
          <p className="text-[11px] text-[#d4c4ae] mt-0.5">
            +15% Study XP multiplier and enhanced mental stamina during deep work rituals.
          </p>
        </div>
      </div>
    </div>
  )
}
