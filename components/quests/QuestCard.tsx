"use client"

import { useState } from "react"
import type { Quest } from "@/types/quest"
import { useHero } from "@/lib/stores/heroStore"
import { soundEngine } from "@/lib/utils/audio"

interface QuestCardProps {
  quest: Quest
  onEdit: (quest: Quest) => void
}

export function QuestCard({ quest, onEdit }: QuestCardProps) {
  const { conquerQuest, deleteQuest } = useHero()
  const [confirmDelete, setConfirmDelete] = useState(false)

  const getCategoryTheme = (category: string) => {
    switch (category.toLowerCase()) {
      case "learning":
      case "coding":
        return {
          border: "hover:border-[#57dffe]/50",
          tag: "bg-[#57dffe]/10 text-[#57dffe] border-[#57dffe]/20",
          icon: "code",
          trait: "+1 Intellect",
          traitColor: "text-[#57dffe]",
        }
      case "work":
        return {
          border: "hover:border-[#ddb8ff]/50",
          tag: "bg-[#ddb8ff]/10 text-[#ddb8ff] border-[#ddb8ff]/20",
          icon: "terminal",
          trait: "+1 Intellect",
          traitColor: "text-[#ddb8ff]",
        }
      case "health":
        return {
          border: "hover:border-[#ffc659]/50",
          tag: "bg-[#ffc659]/10 text-[#ffc659] border-[#ffc659]/20",
          icon: "fitness_center",
          trait: "+1 Strength",
          traitColor: "text-[#ffc659]",
        }
      case "creative":
        return {
          border: "hover:border-[#ddb8ff]/50",
          tag: "bg-[#ddb8ff]/10 text-[#ddb8ff] border-[#ddb8ff]/20",
          icon: "palette",
          trait: "+1 Creativity",
          traitColor: "text-[#ddb8ff]",
        }
      case "personal":
        return {
          border: "hover:border-[#ffc659]/50",
          tag: "bg-[#ffc659]/10 text-[#ffc659] border-[#ffc659]/20",
          icon: "self_improvement",
          trait: "+1 Discipline",
          traitColor: "text-[#ffc659]",
        }
      default:
        return {
          border: "hover:border-[#57dffe]/50",
          tag: "bg-[#57dffe]/10 text-[#57dffe] border-[#57dffe]/20",
          icon: "shield",
          trait: "+1 Vitality",
          traitColor: "text-[#57dffe]",
        }
    }
  }

  const theme = getCategoryTheme(quest.category)

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-xl border bg-[#111318] p-5 transition-all duration-200 ${
        quest.completed
          ? "border-white/5 opacity-55 bg-[#0c0e13]/60"
          : `border-white/8 ${theme.border} hover:-translate-y-1 shadow-lg hover:shadow-xl`
      }`}
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${theme.tag}`}>
              <span className="material-symbols-rounded text-xs">{theme.icon}</span>
              {quest.category}
            </span>
            <span className="rounded-md bg-white/5 border border-white/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/50 capitalize">
              {quest.difficulty}
            </span>
          </div>

          <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => {
                soundEngine.playClick()
                onEdit(quest)
              }}
              className="rounded p-1 text-white/50 hover:bg-white/5 hover:text-white"
              title="Edit Quest"
            >
              <span className="material-symbols-rounded text-sm">edit</span>
            </button>
            <button
              onClick={() => {
                soundEngine.playClick()
                if (confirmDelete) {
                  deleteQuest(quest.id)
                } else {
                  setConfirmDelete(true)
                  setTimeout(() => setConfirmDelete(false), 3000)
                }
              }}
              className={`rounded p-1 transition-colors ${
                confirmDelete
                  ? "bg-red-500/20 text-red-400 font-bold text-xs px-2"
                  : "text-white/50 hover:bg-white/5 hover:text-red-400"
              }`}
              title="Delete Quest"
            >
              {confirmDelete ? (
                "Confirm?"
              ) : (
                <span className="material-symbols-rounded text-sm">delete</span>
              )}
            </button>
          </div>
        </div>

        {/* Title & Description */}
        <h3 className={`mt-3 font-semibold text-base sm:text-lg transition-colors ${
          quest.completed ? "line-through text-white/40" : "text-white group-hover:text-[#ffc659]"
        }`}>
          {quest.title}
        </h3>

        {quest.description && (
          <p className="mt-1.5 text-xs text-[#d4c4ae] leading-relaxed line-clamp-3">
            {quest.description}
          </p>
        )}
      </div>

      {/* Footer Info & Conquer Button */}
      <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/5">
        <div className="flex items-center gap-3 text-xs">
          <span className="font-mono font-bold text-[#57dffe]">+{quest.xp_reward} XP</span>
          <span className="font-mono font-bold text-[#ffc659]">🪙 +{quest.gold_reward} Gold</span>
          <span className={`text-[11px] font-bold ${theme.traitColor} hidden sm:inline-block`}>
            {theme.trait}
          </span>
        </div>

        {quest.completed ? (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-green-400">
            <span className="material-symbols-rounded text-base">check_circle</span>
            Conquered
          </div>
        ) : (
          <button
            onClick={() => conquerQuest(quest.id)}
            className="flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-[#ffc659] to-[#e5a92b] px-4 py-2 text-xs font-bold uppercase tracking-wider text-black shadow-md shadow-[#ffc659]/20 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-rounded text-sm">swords</span>
            Conquer Quest
          </button>
        )}
      </div>
    </div>
  )
}
