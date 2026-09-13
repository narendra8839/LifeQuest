"use client"

import { Modal } from "@/components/ui/Modal"
import type { Achievement } from "@/types/achievement"

interface AchievementDetailModalProps {
  achievement: Achievement | null
  open: boolean
  onClose: () => void
  isUnlocked: boolean
}

export function AchievementDetailModal({
  achievement,
  open,
  onClose,
  isUnlocked,
}: AchievementDetailModalProps) {
  if (!achievement) return null

  return (
    <Modal
      open={open}
      onClose={onClose}
      className="max-w-lg border-[#ffc659]/30 bg-[#161829] p-6 text-[#e2e2e9] shadow-2xl"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start gap-4 border-b border-white/10 pb-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ffc659]/20 to-[#641ea3]/30 border border-[#ffc659]/40 text-[#ffc659] shadow-lg shadow-[#ffc659]/10">
            <span className="material-symbols-rounded text-3xl">{achievement.icon}</span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="label-caps text-[#ffc659] text-[10px]">Archive Dossier</span>
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <span className={`text-[10px] uppercase font-bold tracking-wider ${
                isUnlocked ? "text-green-400" : "text-white/40"
              }`}>
                {isUnlocked ? "Unlocked" : "Sealed in Lore"}
              </span>
            </div>
            <h3 className="font-display text-2xl font-bold text-white mt-0.5">
              {achievement.name}
            </h3>
            <p className="text-xs text-[#d4c4ae] mt-0.5">{achievement.description}</p>
          </div>
        </div>

        {/* Lore Quote */}
        <div className="rounded-xl border border-white/5 bg-[#0c0e13] p-4 italic text-xs text-[#d4c4ae]/90 leading-relaxed">
          &ldquo;Every legendary triumph was once an ordinary deed repeated with unyielding determination.&rdquo;
        </div>

        {/* Requirements & Rewards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/5 bg-[#0c0e13] p-3.5 space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#57dffe] block tracking-wider">
              Trial Objective
            </span>
            <span className="text-xs font-semibold text-white">
              {achievement.description}
            </span>
          </div>

          <div className="rounded-xl border border-white/5 bg-[#0c0e13] p-3.5 space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#ffc659] block tracking-wider">
              Boon Claimed
            </span>
            <span className="text-xs font-mono font-bold text-[#ffc659]">
              +{achievement.reward_xp} XP & 🪙 +{achievement.reward_gold} Gold
            </span>
          </div>
        </div>

        {/* Dismiss Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="rounded-xl bg-[#ffc659] px-5 py-2 text-xs font-bold text-black hover:bg-[#ffdea8] shadow-md shadow-[#ffc659]/20 transition-all"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </Modal>
  )
}
