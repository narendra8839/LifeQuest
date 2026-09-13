"use client"

import { useHero } from "@/lib/stores/heroStore"

export function LifetimeMetrics() {
  const { profile, quests } = useHero()

  const completedCount = quests.filter((q) => q.completed).length

  const METRICS = [
    {
      title: "Current Level",
      val: `Lvl ${profile.level}`,
      sub: "Silver Blade Tier",
      icon: "military_tech",
      color: "text-[#ffc659]",
    },
    {
      title: "Total XP Gained",
      val: profile.xp.toLocaleString(),
      sub: "+320 this epoch",
      icon: "bolt",
      color: "text-[#57dffe]",
    },
    {
      title: "Quests Conquered",
      val: completedCount.toString(),
      sub: "98.4% success rate",
      icon: "task_alt",
      color: "text-green-400",
    },
    {
      title: "Days In Realm",
      val: "37 Days",
      sub: "Season 1 Veteran",
      icon: "calendar_today",
      color: "text-[#ddb8ff]",
    },
    {
      title: "Gold Accumulated",
      val: `🪙 ${(profile.gold + 4580).toLocaleString()}`,
      sub: `${profile.gold.toLocaleString()} currently in vault`,
      icon: "savings",
      color: "text-[#ffc659]",
    },
    {
      title: "Highest Streak",
      val: "14 Days",
      sub: `${profile.streak} Days active right now`,
      icon: "local_fire_department",
      color: "text-[#ffb4ab]",
    },
  ]

  return (
    <div className="rounded-2xl border border-white/10 bg-[#1a1b21] p-6 shadow-xl space-y-4">
      <div className="border-b border-white/8 pb-3">
        <span className="label-caps text-[#ffc659] text-[10px]">Chronicle Records</span>
        <h4 className="font-display text-xl font-bold text-white mt-0.5">Lifetime Progression Metrics</h4>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
        {METRICS.map((m) => (
          <div key={m.title} className="rounded-xl border border-white/5 bg-[#0c0e13] p-4 space-y-1">
            <div className="flex items-center gap-2">
              <span className={`material-symbols-rounded text-lg ${m.color}`}>{m.icon}</span>
              <span className="text-[10px] uppercase font-bold text-white/50 truncate">{m.title}</span>
            </div>
            <p className="font-display text-lg sm:text-xl font-bold text-white tracking-wide">{m.val}</p>
            <p className="text-[11px] text-[#d4c4ae]/70">{m.sub}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
