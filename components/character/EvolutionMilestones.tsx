"use client"

import { useHero } from "@/lib/stores/heroStore"

export function EvolutionMilestones() {
  const { profile } = useHero()

  const MILESTONES = [
    { level: 1,  title: "Novice Wanderer",            desc: "First steps beyond the sanctum gates", icon: "explore" },
    { level: 5,  title: "Apprentice Seeker",          desc: "Mastery of primary habits and daily flow", icon: "hiking" },
    { level: 10, title: "Ascendant Warrior",          desc: "Proven endurance across trials of will", icon: "shield" },
    { level: 15, title: "Grand Spellblade",           desc: "Harmonized intellect, discipline, and power", icon: "auto_stories" },
    { level: 20, title: "Mythic Titan of Discipline", desc: "Supreme focus unbreakable by earthly chaos", icon: "military_tech" },
  ]

  const getStatus = (targetLvl: number) => {
    if (profile.level > targetLvl) return "unlocked"
    if (profile.level === targetLvl) return "current"
    if (profile.level + 4 >= targetLvl) return "near_future"
    return "locked"
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[#1a1b21] p-6 shadow-xl space-y-4">
      <div className="border-b border-white/8 pb-3">
        <span className="label-caps text-[#ddb8ff] text-[10px]">Ascension Path</span>
        <h4 className="font-display text-xl font-bold text-white mt-0.5">Character Evolution Milestones</h4>
      </div>

      <div className="space-y-3">
        {MILESTONES.map((m) => {
          const status = getStatus(m.level)

          const statusStyles = {
            unlocked: {
              badge: "bg-green-500/10 text-green-400 border-green-500/20",
              label: "Conquered",
              iconColor: "text-green-400",
              bg: "bg-[#0c0e13] border-white/5",
            },
            current: {
              badge: "bg-[#ffc659]/20 text-[#ffc659] border-[#ffc659]/40 font-bold",
              label: "Current Tier",
              iconColor: "text-[#ffc659]",
              bg: "bg-[#ffc659]/5 border-[#ffc659]/30 shadow-md",
            },
            near_future: {
              badge: "bg-[#57dffe]/10 text-[#57dffe] border-[#57dffe]/30",
              label: "Near Future",
              iconColor: "text-[#57dffe]",
              bg: "bg-[#0c0e13] border-white/5",
            },
            locked: {
              badge: "bg-white/5 text-white/30 border-white/5",
              label: "Locked",
              iconColor: "text-white/20",
              bg: "bg-[#0c0e13]/60 border-transparent opacity-50",
            },
          }

          const s = statusStyles[status]

          return (
            <div
              key={m.level}
              className={`flex items-center justify-between gap-4 rounded-xl border p-4 transition-all ${s.bg}`}
            >
              <div className="flex items-center gap-3.5">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/10 ${s.iconColor}`}>
                  <span className="material-symbols-rounded text-xl">{m.icon}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#ffc659]">Lvl {m.level}</span>
                    <h5 className="font-bold text-sm text-white">{m.title}</h5>
                  </div>
                  <p className="text-xs text-[#d4c4ae]/80 mt-0.5">{m.desc}</p>
                </div>
              </div>

              <span className={`shrink-0 rounded-full border px-3 py-1 text-[10px] uppercase font-bold tracking-wider ${s.badge}`}>
                {s.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
