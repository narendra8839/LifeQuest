"use client"

import { Modal } from "@/components/ui/Modal"

interface HelpModalProps {
  open: boolean
  onClose: () => void
}

export function HelpModal({ open, onClose }: HelpModalProps) {
  return (
    <Modal open={open} onClose={onClose} className="max-w-xl bg-[#1a1b21] border-[#ffc659]/30 text-[#e2e2e9]">
      <div className="space-y-5">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ffc659]/10 border border-[#ffc659]/30 text-[#ffc659]">
            <span className="material-symbols-rounded">auto_stories</span>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-white">Codex of the Adventurer</h2>
            <p className="text-xs text-[#d4c4ae]">Core mechanics and rules of the realm</p>
          </div>
        </div>

        <div className="space-y-4 text-xs text-[#e2e2e9] leading-relaxed">
          <div className="rounded-lg bg-[#111318] p-3.5 border border-white/5">
            <h4 className="font-bold text-[#ffc659] uppercase tracking-wider text-[11px] mb-1">
              ⚔️ 1. Quests & Progression
            </h4>
            <p className="text-white/70">
              Transform your real-life tasks into bounties. Each completed quest awards Experience Points (XP)
              and Gold based on its chosen difficulty tier (Trivial to Legendary).
            </p>
          </div>

          <div className="rounded-lg bg-[#111318] p-3.5 border border-white/5">
            <h4 className="font-bold text-[#ddb8ff] uppercase tracking-wider text-[11px] mb-1">
              📈 2. Quadratic Level Curve
            </h4>
            <p className="text-white/70">
              Each subsequent level demands more XP than the last. Leveling up increases your Vanguard tier,
              unlocks exclusive Perks, and permanently elevates your standing.
            </p>
          </div>

          <div className="rounded-lg bg-[#111318] p-3.5 border border-white/5">
            <h4 className="font-bold text-[#57dffe] uppercase tracking-wider text-[11px] mb-1">
              🔥 3. Battle Streaks & Multipliers
            </h4>
            <p className="text-white/70">
              Completing at least one quest each day fuels your Battle Streak. Maintaining a streak gives you
              multiplier bonuses and unlocks legendary feats in the Achievement Codex.
            </p>
          </div>

          <div className="rounded-lg bg-[#111318] p-3.5 border border-white/5">
            <h4 className="font-bold text-[#ffb4ab] uppercase tracking-wider text-[11px] mb-1">
              🛡️ 4. Character Aptitudes (Attributes)
            </h4>
            <p className="text-white/70">
              Tasks sharpen specific traits: Coding & Reading advance <strong>Intellect</strong>, Gym boosts <strong>Strength</strong>,
              Habit rituals elevate <strong>Discipline</strong>, and Arts bolster <strong>Creativity</strong>.
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-[#ffc659] px-5 py-2 font-bold text-xs text-black hover:bg-[#ffdea8] transition-colors"
          >
            Understood, Lorekeeper
          </button>
        </div>
      </div>
    </Modal>
  )
}
