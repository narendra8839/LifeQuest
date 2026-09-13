"use client"

import { useState } from "react"
import { Modal } from "@/components/ui/Modal"
import { useHero } from "@/lib/stores/heroStore"
import { QUEST_CATEGORIES, QUEST_DIFFICULTIES, XP_REWARDS, GOLD_REWARDS } from "@/lib/constants"
import type { QuestCategory, QuestDifficulty } from "@/types/quest"

interface CreateQuestModalProps {
  open: boolean
  onClose: () => void
}

export function CreateQuestModal({ open, onClose }: CreateQuestModalProps) {
  const { addQuest } = useHero()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState<QuestCategory>("Learning")
  const [difficulty, setDifficulty] = useState<QuestDifficulty>("normal")
  const [error, setError] = useState("")

  const xpReward = XP_REWARDS[difficulty]
  const goldReward = GOLD_REWARDS[difficulty]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      setError("Quest title is required")
      return
    }

    addQuest({
      title: title.trim(),
      description: description.trim() || undefined,
      category,
      difficulty,
      xpReward,
      goldReward,
    })

    setTitle("")
    setDescription("")
    setCategory("Learning")
    setDifficulty("normal")
    setError("")
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} className="max-w-lg bg-[#1a1b21] border-[#ffc659]/30 text-[#e2e2e9]">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ffc659]/10 border border-[#ffc659]/30 text-[#ffc659]">
            <span className="material-symbols-rounded">add_task</span>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-white">Post New Quest</h2>
            <p className="text-xs text-[#d4c4ae]">Inscribe a new real-world bounty into the codex</p>
          </div>
        </div>

        {error && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-2.5 text-xs text-red-400">
            {error}
          </div>
        )}

        {/* Title */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-white/80">
            Quest Objective *
          </label>
          <input
            type="text"
            required
            placeholder="e.g., Read 20 pages of clean code"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#0c0e13] px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#ffc659] focus:outline-none"
          />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-white/80">
            Codex Notes / Description
          </label>
          <textarea
            rows={2}
            placeholder="Optional lore, goals, or criteria..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#0c0e13] px-3.5 py-2 text-sm text-white placeholder-white/30 focus:border-[#ffc659] focus:outline-none"
          />
        </div>

        {/* Category & Difficulty */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-white/80">
              Discipline (Category)
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as QuestCategory)}
              className="w-full rounded-xl border border-white/10 bg-[#0c0e13] px-3 py-2.5 text-sm text-white focus:border-[#ffc659] focus:outline-none"
            >
              {QUEST_CATEGORIES.map((c) => (
                <option key={c} value={c} className="bg-[#1a1b21] text-white">
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-white/80">
              Difficulty Tier
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as QuestDifficulty)}
              className="w-full rounded-xl border border-white/10 bg-[#0c0e13] px-3 py-2.5 text-sm text-white focus:border-[#ffc659] focus:outline-none capitalize"
            >
              {QUEST_DIFFICULTIES.map((d) => (
                <option key={d} value={d} className="bg-[#1a1b21] text-white capitalize">
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Live Reward Calculation Preview */}
        <div className="rounded-xl border border-[#ffc659]/30 bg-[#ffc659]/5 p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#ffc659] block">Bounty Rewards</span>
            <span className="text-xs text-white/70">Calculated based on {difficulty} tier</span>
          </div>
          <div className="flex items-center gap-3 font-mono font-bold text-sm">
            <span className="text-[#57dffe]">+{xpReward} XP</span>
            <span className="text-[#ffc659]">🪙 +{goldReward} Gold</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-xs font-semibold text-white/60 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-[#ffc659] px-5 py-2 text-xs font-bold text-black hover:bg-[#ffdea8] shadow-md shadow-[#ffc659]/20 transition-all"
          >
            Inscribe Quest
          </button>
        </div>
      </form>
    </Modal>
  )
}
