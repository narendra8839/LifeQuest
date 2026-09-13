"use client"

import { useHero } from "@/lib/stores/heroStore"

export function PlayerSummary() {
  const { profile, xpProgress, xpToNext } = useHero()

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#1a1b21] via-[#1e1f25] to-[#111318] p-6 shadow-2xl">
      {/* Background ambient lighting */}
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#641ea3]/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#ffc659]/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left: Avatar & Identity */}
        <div className="flex items-center gap-5">
          <div className="relative">
            <img
              src={profile.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
              alt={profile.username || "Arjun"}
              className="h-20 w-20 rounded-2xl object-cover ring-4 ring-[#641ea3] shadow-lg shadow-[#641ea3]/30"
            />
            <div className="absolute -bottom-2 -right-2 rounded-lg bg-gradient-to-r from-[#ffc659] to-[#e5a92b] px-2 py-0.5 text-xs font-extrabold text-black shadow-md">
              LVL {profile.level}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="label-caps text-[#ffc659] text-[10px]">Vanguard Dossier</span>
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <span className="text-[10px] uppercase font-bold text-[#57dffe] tracking-wider">
                Silver III
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-wide">
              {profile.username || "Arjun"}
            </h2>
            <p className="text-xs text-[#d4c4ae] mt-0.5">
              Warrior-Scholar • Grand Spellblade Aspirant
            </p>
          </div>
        </div>

        {/* Right: Quick Stat Badges */}
        <div className="grid grid-cols-3 gap-3">
          {/* Gold */}
          <div className="flex flex-col items-center justify-center rounded-xl border border-[#ffc659]/20 bg-[#ffc659]/5 px-4 py-3 min-w-[90px] sm:min-w-[110px]">
            <span className="text-lg">🪙</span>
            <span className="font-display text-lg font-bold text-[#ffc659] mt-0.5">
              {profile.gold.toLocaleString()}
            </span>
            <span className="text-[9px] uppercase font-bold text-white/40 tracking-wider">
              Gold Vault
            </span>
          </div>

          {/* Streak */}
          <div className="flex flex-col items-center justify-center rounded-xl border border-[#ffb4ab]/20 bg-[#ffb4ab]/5 px-4 py-3 min-w-[90px] sm:min-w-[110px]">
            <span className="text-lg">🔥</span>
            <span className="font-display text-lg font-bold text-[#ffb4ab] mt-0.5">
              {profile.streak} Days
            </span>
            <span className="text-[9px] uppercase font-bold text-white/40 tracking-wider">
              Battle Streak
            </span>
          </div>

          {/* XP to Next */}
          <div className="flex flex-col items-center justify-center rounded-xl border border-[#57dffe]/20 bg-[#57dffe]/5 px-4 py-3 min-w-[90px] sm:min-w-[110px]">
            <span className="text-lg">⚡</span>
            <span className="font-display text-lg font-bold text-[#57dffe] mt-0.5">
              {xpToNext} XP
            </span>
            <span className="text-[9px] uppercase font-bold text-white/40 tracking-wider">
              To Next Lvl
            </span>
          </div>
        </div>
      </div>

      {/* Recessed RPG XP Meter */}
      <div className="relative z-10 mt-6 pt-5 border-t border-white/10">
        <div className="flex items-center justify-between text-xs mb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-rounded text-sm text-[#ffc659]">military_tech</span>
            <span className="font-bold text-white tracking-wider text-[11px] uppercase">
              Experience Points
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-[#ffc659] font-bold">{profile.xp}</span>
            <span className="text-white/40">/</span>
            <span className="text-white/60">{profile.xp + xpToNext} XP</span>
            <span className="ml-2 rounded bg-[#ffc659]/10 px-1.5 py-0.5 text-[10px] font-bold text-[#ffc659]">
              {xpProgress}%
            </span>
          </div>
        </div>

        <div className="relative h-3 w-full overflow-hidden rounded-full bg-[#0c0e13] p-0.5 border border-white/10 shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#e5a92b] via-[#ffc659] to-[#ddb8ff] transition-all duration-700 ease-out shadow-[0_0_12px_rgba(255,198,89,0.5)]"
            style={{ width: `${xpProgress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
