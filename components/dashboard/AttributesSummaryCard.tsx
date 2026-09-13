"use client"

import Link from "next/link"
import { useHero } from "@/lib/stores/heroStore"

export function AttributesSummaryCard() {
  const { attributes, combinedPower } = useHero()

  const ATTRS = [
    { key: "discipline", label: "Discipline", val: attributes.discipline, max: 100, color: "from-[#641ea3] to-[#ddb8ff]", icon: "self_improvement" },
    { key: "intellect",  label: "Intellect",  val: attributes.intellect,  max: 100, color: "from-[#2dc3e1] to-[#57dffe]", icon: "psychology" },
    { key: "vitality",   label: "Vitality",   val: attributes.vitality,   max: 100, color: "from-[#e5a92b] to-[#ffc659]", icon: "favorite" },
    { key: "creativity", label: "Creativity", val: attributes.creativity, max: 100, color: "from-[#641ea3] to-[#ddb8ff]", icon: "palette" },
    { key: "strength",   label: "Strength",   val: attributes.strength,   max: 100, color: "from-[#93000a] to-[#ffb4ab]", icon: "fitness_center" },
  ]

  return (
    <div className="rounded-2xl border border-white/10 bg-[#1a1b21] p-5 shadow-lg space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="label-caps text-[#57dffe] text-[10px]">Aptitudes</span>
          <h4 className="font-display text-lg font-bold text-white mt-0.5">Attributes Matrix</h4>
        </div>
        <div className="text-right">
          <span className="text-[10px] uppercase font-bold text-white/40 block">Power</span>
          <span className="font-mono text-sm font-bold text-[#ffc659]">{combinedPower} PTS</span>
        </div>
      </div>

      <div className="space-y-3 pt-1">
        {ATTRS.map((a) => (
          <div key={a.key} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-white/80">
                <span className="material-symbols-rounded text-sm text-white/50">{a.icon}</span>
                {a.label}
              </span>
              <span className="font-mono font-bold text-white">{a.val}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#0c0e13]">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${a.color} transition-all duration-500`}
                style={{ width: `${Math.min(100, a.val)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-white/5 text-center">
        <Link
          href="/character"
          className="text-xs font-semibold text-[#57dffe] hover:underline flex items-center justify-center gap-1"
        >
          Inspect Full Radar in Sanctum
          <span className="material-symbols-rounded text-sm">arrow_forward</span>
        </Link>
      </div>
    </div>
  )
}
