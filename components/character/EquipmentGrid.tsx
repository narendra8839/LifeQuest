"use client"

import { useHero } from "@/lib/stores/heroStore"

export function EquipmentGrid() {
  const { equipment } = useHero()

  const getRarityStyle = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return {
          border: "border-[#ffc659]/40 group-hover:border-[#ffc659]",
          bg: "bg-[#ffc659]/10 text-[#ffc659]",
          glow: "shadow-[0_0_12px_rgba(255,198,89,0.2)]",
        }
      case "epic":
        return {
          border: "border-[#ddb8ff]/40 group-hover:border-[#ddb8ff]",
          bg: "bg-[#641ea3]/30 text-[#ddb8ff]",
          glow: "shadow-[0_0_12px_rgba(100,30,163,0.25)]",
        }
      default:
        return {
          border: "border-[#57dffe]/40 group-hover:border-[#57dffe]",
          bg: "bg-[#57dffe]/10 text-[#57dffe]",
          glow: "shadow-[0_0_12px_rgba(87,223,254,0.2)]",
        }
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[#1a1b21] p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-white/8 pb-3">
        <div>
          <span className="label-caps text-[#ddb8ff] text-[10px]">Arsenal</span>
          <h4 className="font-display text-lg font-bold text-white mt-0.5">Enchanted Gear & Relics</h4>
        </div>
        <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[10px] font-bold text-white/60">
          4 / 4 Equipped
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {equipment.map((item) => {
          const style = getRarityStyle(item.rarity)

          return (
            <div
              key={item.id}
              className={`group flex items-center gap-3 rounded-xl border bg-[#0c0e13] p-3 transition-all ${style.border} ${style.glow}`}
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 ${style.bg}`}>
                <span className="material-symbols-rounded text-xl">{item.icon}</span>
              </div>
              <div className="min-w-0 flex-1">
                <h5 className="font-semibold text-xs text-white truncate group-hover:text-[#ffc659] transition-colors">
                  {item.name}
                </h5>
                <span className="text-[10px] font-mono font-bold text-[#57dffe] block mt-0.5">
                  {item.attributeBonus}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
