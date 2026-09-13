"use client"

import { useHero } from "@/lib/stores/heroStore"
import { AttributeRadar } from "@/components/character/AttributeRadar"
import { AttributeBreakdown } from "@/components/character/AttributeBreakdown"

export function AttributesMatrix() {
  const { combinedPower } = useHero()

  return (
    <div className="rounded-2xl border border-white/10 bg-[#1a1b21] p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/8 pb-4">
        <div>
          <span className="label-caps text-[#57dffe] text-[10px]">Character Aptitudes</span>
          <h3 className="font-display text-2xl font-bold text-white mt-0.5">Core Attributes Matrix</h3>
        </div>
        <div className="rounded-xl border border-[#ffc659]/30 bg-[#ffc659]/10 px-4 py-2 text-right">
          <span className="text-[10px] uppercase font-bold text-white/50 block tracking-wider">
            Combined Power
          </span>
          <span className="font-mono text-lg font-extrabold text-[#ffc659] text-glow-gold">
            {combinedPower} PTS
          </span>
        </div>
      </div>

      {/* Grid: Radar visualization on left, Breakdown on right */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-center">
        <div className="xl:col-span-5 flex justify-center">
          <AttributeRadar />
        </div>
        <div className="xl:col-span-7">
          <AttributeBreakdown />
        </div>
      </div>
    </div>
  )
}
