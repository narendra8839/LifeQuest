"use client"

import { useEffect } from "react"
import { Modal } from "@/components/ui/Modal"
import { soundEngine } from "@/lib/utils/audio"
import { triggerCelebration } from "@/lib/utils/confetti"

interface LevelUpModalProps {
  open: boolean
  onClose: () => void
  previousLevel: number
  newLevel: number
  xpGained: number
  goldGained: number
}

export function LevelUpModal({
  open,
  onClose,
  previousLevel,
  newLevel,
  xpGained,
  goldGained,
}: LevelUpModalProps) {
  useEffect(() => {
    if (open) {
      soundEngine.playLevelUp()
      triggerCelebration()
      const t = setTimeout(() => triggerCelebration(), 400)
      return () => clearTimeout(t)
    }
  }, [open])

  if (!open) return null

  return (
    <Modal
      open={open}
      onClose={onClose}
      className="max-w-md border-[#ffc659]/40 bg-[#161829] p-6 text-center text-[#e2e2e9] shadow-[0_0_50px_rgba(255,198,89,0.25)]"
    >
      <div className="space-y-6">
        {/* Animated Emblem */}
        <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ffc659] via-[#e5a92b] to-[#641ea3] p-1 shadow-xl shadow-[#ffc659]/30 animate-bounce">
          <div className="flex h-full w-full items-center justify-center rounded-xl bg-[#0c0e13]">
            <span className="material-symbols-rounded text-5xl text-[#ffc659] animate-pulse">
              military_tech
            </span>
          </div>
        </div>

        <div>
          <span className="label-caps text-[#ffc659] tracking-widest text-xs">
            Ascension Achieved
          </span>
          <h2 className="font-display text-3xl font-extrabold text-white text-glow-gold mt-1">
            LEVEL UP!
          </h2>
          <p className="text-xs text-[#d4c4ae] mt-1">
            Your relentless discipline has forged your soul into a sharper blade.
          </p>
        </div>

        {/* Level Transition Pill */}
        <div className="flex items-center justify-center gap-4 rounded-xl border border-white/10 bg-[#111318] py-3.5 px-6">
          <div className="text-center">
            <span className="text-[10px] uppercase font-bold text-white/40 block">From</span>
            <span className="font-display text-2xl font-bold text-white/70">Lvl {previousLevel}</span>
          </div>
          <span className="material-symbols-rounded text-2xl text-[#ffc659]">arrow_forward</span>
          <div className="text-center">
            <span className="text-[10px] uppercase font-bold text-[#ffc659] block">Ascended To</span>
            <span className="font-display text-3xl font-extrabold text-[#ffc659] text-glow-gold">
              Lvl {newLevel}
            </span>
          </div>
        </div>

        {/* Spoils of Conquest */}
        <div className="grid grid-cols-2 gap-3 text-left">
          <div className="rounded-lg bg-[#1a1b21] p-3 border border-white/5">
            <span className="text-[10px] uppercase font-bold text-[#57dffe] block">Experience</span>
            <span className="text-sm font-bold text-white">+{xpGained} XP Conquered</span>
          </div>
          <div className="rounded-lg bg-[#1a1b21] p-3 border border-white/5">
            <span className="text-[10px] uppercase font-bold text-[#ffc659] block">Vault Spoils</span>
            <span className="text-sm font-bold text-white">🪙 +{goldGained} Gold Earned</span>
          </div>
        </div>

        {/* Trait Boost */}
        <div className="rounded-xl border border-[#ddb8ff]/20 bg-[#641ea3]/20 p-3 text-xs text-[#ddb8ff]">
          <div className="flex items-center gap-2 font-bold justify-center">
            <span className="material-symbols-rounded text-sm">auto_awesome</span>
            <span>Attribute Cap Increased & Stats Fortified!</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => {
            soundEngine.playClick()
            onClose()
          }}
          className="w-full rounded-xl bg-gradient-to-r from-[#ffc659] to-[#e5a92b] py-3 font-bold text-black shadow-lg shadow-[#ffc659]/30 hover:brightness-110 active:scale-95 transition-all text-sm uppercase tracking-wider"
        >
          Claim Glory & Return
        </button>
      </div>
    </Modal>
  )
}
