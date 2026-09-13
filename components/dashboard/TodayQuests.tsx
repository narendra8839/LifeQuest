"use client"

import { useState } from "react"
import Link from "next/link"
import { useHero } from "@/lib/stores/heroStore"
import { soundEngine } from "@/lib/utils/audio"

export function TodayQuests() {
  const { quests, conquerQuest } = useHero()
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all")

  const filteredQuests = quests.filter((q) => {
    if (filter === "active") return !q.completed
    if (filter === "completed") return q.completed
    return true
  })

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "learning":
      case "coding":
        return {
          border: "border-[#57dffe]/30 hover:border-[#57dffe]/60",
          tag: "bg-[#57dffe]/10 text-[#57dffe] border-[#57dffe]/20",
          icon: "code",
          accentText: "text-[#57dffe]",
        }
      case "work":
        return {
          border: "border-[#ddb8ff]/30 hover:border-[#ddb8ff]/60",
          tag: "bg-[#ddb8ff]/10 text-[#ddb8ff] border-[#ddb8ff]/20",
          icon: "terminal",
          accentText: "text-[#ddb8ff]",
        }
      case "health":
        return {
          border: "border-[#ffc659]/30 hover:border-[#ffc659]/60",
          tag: "bg-[#ffc659]/10 text-[#ffc659] border-[#ffc659]/20",
          icon: "fitness_center",
          accentText: "text-[#ffc659]",
        }
      case "creative":
        return {
          border: "border-[#ddb8ff]/30 hover:border-[#ddb8ff]/60",
          tag: "bg-[#ddb8ff]/10 text-[#ddb8ff] border-[#ddb8ff]/20",
          icon: "palette",
          accentText: "text-[#ddb8ff]",
        }
      default:
        return {
          border: "border-[#57dffe]/30 hover:border-[#57dffe]/60",
          tag: "bg-[#57dffe]/10 text-[#57dffe] border-[#57dffe]/20",
          icon: "shield",
          accentText: "text-[#57dffe]",
        }
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[#1a1b21] p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-white/8 pb-4">
        <div>
          <div className="flex items-center gap-2 text-[#ffc659] text-xs font-semibold uppercase tracking-wider">
            <span className="material-symbols-rounded text-sm">swords</span>
            Tactical Mission Board
          </div>
          <h3 className="font-display text-2xl font-bold text-white mt-0.5">Today's Quests</h3>
          <p className="text-xs text-[#d4c4ae]">
            Conquer your objectives and strengthen your legend.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Filter Pills */}
          <div className="flex rounded-lg bg-[#111318] p-1 border border-white/5 text-xs">
            {(["all", "active", "completed"] as const).map((f) => (
              <button
                key={f}
                onClick={() => {
                  soundEngine.playClick()
                  setFilter(f)
                }}
                className={`rounded-md px-3 py-1 font-medium capitalize transition-all ${
                  filter === f
                    ? "bg-[#ffc659] text-black font-bold shadow-sm"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <Link
            href="/quests"
            onClick={() => soundEngine.playClick()}
            className="flex items-center gap-1 rounded-lg border border-[#ffc659]/30 bg-[#ffc659]/10 px-3 py-1.5 text-xs font-bold text-[#ffc659] hover:bg-[#ffc659]/20 transition-all"
          >
            <span className="material-symbols-rounded text-sm">add</span>
            New Quest
          </Link>
        </div>
      </div>

      {/* Quest Cards Grid */}
      <div className="space-y-3.5">
        {filteredQuests.map((quest) => {
          const style = getCategoryColor(quest.category)

          return (
            <div
              key={quest.id}
              className={`group relative flex flex-col justify-between rounded-xl border bg-[#0c0e13] p-4 sm:p-5 transition-all duration-200 ${
                quest.completed
                  ? "border-white/5 opacity-60 bg-[#0c0e13]/50"
                  : `${style.border} hover:bg-[#111318] hover:-translate-y-0.5 shadow-md`
              }`}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-1.5 flex-1 pr-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${style.tag}`}>
                      <span className="material-symbols-rounded text-xs">{style.icon}</span>
                      {quest.category}
                    </span>
                    <span className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/50 border border-white/5">
                      {quest.difficulty}
                    </span>
                    {quest.completed && (
                      <span className="rounded-md bg-green-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-green-400 border border-green-500/20">
                        ✓ Conquered
                      </span>
                    )}
                  </div>

                  <h4 className={`font-semibold text-base sm:text-lg transition-colors ${
                    quest.completed ? "line-through text-white/40" : "text-white group-hover:text-[#ffc659]"
                  }`}>
                    {quest.title}
                  </h4>

                  {quest.description && (
                    <p className="text-xs text-[#d4c4ae] leading-relaxed line-clamp-2">
                      {quest.description}
                    </p>
                  )}
                </div>

                {/* Right: Rewards & Conquer Action */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5">
                  <div className="flex items-center gap-3 text-xs font-mono font-bold">
                    <span className="text-[#57dffe] flex items-center gap-0.5">
                      +{quest.xp_reward} XP
                    </span>
                    <span className="text-[#ffc659] flex items-center gap-0.5">
                      🪙 +{quest.gold_reward} Gold
                    </span>
                  </div>

                  {quest.completed ? (
                    <div className="flex items-center gap-1.5 text-xs text-white/40 font-semibold py-1.5 px-3">
                      <span className="material-symbols-rounded text-sm text-green-400">check_circle</span>
                      Conquered
                    </div>
                  ) : (
                    <button
                      onClick={() => conquerQuest(quest.id)}
                      className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#ffc659] to-[#e5a92b] px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-black shadow-md shadow-[#ffc659]/20 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                    >
                      <span className="material-symbols-rounded text-sm">swords</span>
                      Conquer Quest
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}

        {filteredQuests.length === 0 && (
          <div className="text-center py-12 rounded-xl border border-dashed border-white/10 bg-[#0c0e13]">
            <span className="material-symbols-rounded text-4xl text-white/20">inbox</span>
            <p className="text-sm font-semibold text-white/60 mt-2">No quests in this chamber</p>
            <p className="text-xs text-white/40 mt-0.5">Post a new bounty to keep your legend alive</p>
          </div>
        )}
      </div>
    </div>
  )
}
