"use client"

import { useHero } from "@/lib/stores/heroStore"

export function AttributeBreakdown() {
  const { attributes } = useHero()

  const ITEMS = [
    {
      name: "Discipline",
      value: attributes.discipline,
      icon: "self_improvement",
      color: "from-[#641ea3] to-[#ddb8ff]",
      textColor: "text-[#ddb8ff]",
      stats: ["7-Day streak multiplier active", "Zero daily rituals missed this epoch"],
    },
    {
      name: "Intellect",
      value: attributes.intellect,
      icon: "psychology",
      color: "from-[#2dc3e1] to-[#57dffe]",
      textColor: "text-[#57dffe]",
      stats: ["42 Coding quests conquered", "28 Technical reading logs recorded"],
    },
    {
      name: "Vitality",
      value: attributes.vitality,
      icon: "favorite",
      color: "from-[#e5a92b] to-[#ffc659]",
      textColor: "text-[#ffc659]",
      stats: ["Optimal sleep & restoration index", "Consistent hydration rituals fulfilled"],
    },
    {
      name: "Creativity",
      value: attributes.creativity,
      icon: "palette",
      color: "from-[#641ea3] to-[#ddb8ff]",
      textColor: "text-[#ddb8ff]",
      stats: ["Interactive UI design sprints", "Reflective codex journaling"],
    },
    {
      name: "Strength",
      value: attributes.strength,
      icon: "fitness_center",
      color: "from-[#93000a] to-[#ffb4ab]",
      textColor: "text-[#ffb4ab]",
      stats: ["35 Physical conditioning rituals", "18 Cardio & endurance runs"],
    },
  ]

  return (
    <div className="space-y-3.5">
      {ITEMS.map((item) => (
        <div
          key={item.name}
          className="rounded-xl border border-white/5 bg-[#0c0e13] p-4 space-y-2 hover:border-white/15 transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`material-symbols-rounded text-lg ${item.textColor}`}>{item.icon}</span>
              <span className="font-semibold text-sm text-white">{item.name}</span>
            </div>
            <span className="font-mono text-sm font-bold text-white">{item.value} / 100</span>
          </div>

          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${item.color} transition-all duration-500`}
              style={{ width: `${Math.min(100, item.value)}%` }}
            />
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-[11px] text-[#d4c4ae]/70">
            {item.stats.map((s, idx) => (
              <span key={idx} className="flex items-center gap-1">
                <span className="h-1 w-1 rounded-full bg-white/30" />
                {s}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
