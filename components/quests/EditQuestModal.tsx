"use client"

import { useState, useEffect } from "react"
import { Modal } from "@/components/ui/Modal"
import { useHero } from "@/lib/stores/heroStore"
import { QUEST_CATEGORIES, QUEST_DIFFICULTIES, XP_REWARDS, GOLD_REWARDS } from "@/lib/constants"
import type { Quest, QuestCategory, QuestDifficulty } from "@/types/quest"

interface EditQuestModalProps {
  quest: Quest | null
  open: boolean
  onClose: () => void
}

export function EditQuestModal({ quest, open, onClose }: EditQuestModalProps) {
  const { editQuest } = useHero()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState<QuestCategory>("Learning")
  const [difficulty, setDifficulty] = useState<QuestDifficulty>("normal")

  useEffect(() => {
    if (quest) {
      setTitle(quest.title)
      setDescription(quest.description || "")
      setCategory(quest.category as QuestCategory)
      setDifficulty(quest.difficulty)
    }
  }, [quest])

  if (!quest) return null

  const xpReward = XP_REWARDS[difficulty]
  const goldReward = GOLD_REWARDS[difficulty]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    editQuest(quest.id, {
      title: title.trim(),
      description: description.trim() || null,
      category,
      difficulty,
      xp_reward: xpReward,
      gold_reward: goldReward,
    })

    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} className="max-w-lg bg-[#1a1b21] border-[#ddb8ff]/30 text-[#e2e2e9]">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#641ea3]/30 border border-[#ddb8ff]/30 text-[#ddb8ff]">
            <span className="material-symbols-rounded">edit_document</span>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-white">Modify Quest</h2>
            <p className="text-xs text-[#d4c4ae]">Update objectives or alter bounty tiers</p>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-white/80">Quest Objective</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#0c0e13] px-3.5 py-2.5 text-sm text-white focus:border-[#ddb8ff] focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-white/80">Codex Notes</label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#0c0e13] px-3.5 py-2 text-sm text-white focus:border-[#ddb8ff] focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-white/80">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as QuestCategory)}
              className="w-full rounded-xl border border-white/10 bg-[#0c0e13] px-3 py-2.5 text-sm text-white focus:border-[#ddb8ff] focus:outline-none"
            >
              {QUEST_CATEGORIES.map((c) => (
                <option key={c} value={c} className="bg-[#1a1b21] text-white">
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-white/80">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as QuestDifficulty)}
              className="w-full rounded-xl border border-white/10 bg-[#0c0e13] px-3 py-2.5 text-sm text-white focus:border-[#ddb8ff] focus:outline-none capitalize"
            >
              {QUEST_DIFFICULTIES.map((d) => (
                <option key={d} value={d} className="bg-[#1a1b21] text-white capitalize">
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

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
            className="rounded-lg bg-[#ddb8ff] px-5 py-2 text-xs font-bold text-black hover:bg-[#f0dbff] transition-all"
          >
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  )
}
