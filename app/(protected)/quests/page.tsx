"use client"

import { useState } from "react"
import { useHero } from "@/lib/stores/heroStore"
import { QuestList } from "@/components/quests/QuestList"
import { CreateQuestModal } from "@/components/quests/CreateQuestModal"
import { EditQuestModal } from "@/components/quests/EditQuestModal"
import { soundEngine } from "@/lib/utils/audio"
import { QUEST_CATEGORIES } from "@/lib/constants"
import type { Quest } from "@/types/quest"

export default function QuestsPage() {
  const { quests } = useHero()

  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [editingQuest, setEditingQuest] = useState<Quest | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL")
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "completed">("all")

  const activeCount = quests.filter((q) => !q.completed).length
  const completedCount = quests.filter((q) => q.completed).length
  const totalGoldEarned = quests
    .filter((q) => q.completed)
    .reduce((acc, q) => acc + q.gold_reward, 0)

  const filteredQuests = quests.filter((q) => {
    // Category filter
    if (selectedCategory !== "ALL" && q.category.toUpperCase() !== selectedCategory.toUpperCase()) {
      return false
    }
    // Status filter
    if (statusFilter === "active" && q.completed) return false
    if (statusFilter === "completed" && !q.completed) return false
    // Search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      const matchesTitle = q.title.toLowerCase().includes(query)
      const matchesDesc = q.description?.toLowerCase().includes(query) ?? false
      if (!matchesTitle && !matchesDesc) return false
    }
    return true
  })

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-6 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-white/8 pb-6">
        <div>
          <div className="flex items-center gap-2 text-[#ffc659] text-xs font-bold uppercase tracking-wider">
            <span className="material-symbols-rounded text-sm">swords</span>
            MISSION COMMAND • REALM BOUNTIES
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white text-glow-gold tracking-tight mt-1">
            Quest Board
          </h1>
          <p className="text-sm text-[#d4c4ae] max-w-2xl mt-1.5 leading-relaxed">
            Manage and conquer your daily challenges. Every completed bounty yields vital XP, gold spoils, and attribute mastery.
          </p>
        </div>

        {/* Post New Quest Action */}
        <button
          onClick={() => {
            soundEngine.playClick()
            setCreateModalOpen(true)
          }}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ffc659] to-[#e5a92b] px-5 py-3 text-xs font-bold uppercase tracking-wider text-black shadow-lg shadow-[#ffc659]/25 hover:brightness-110 active:scale-95 transition-all cursor-pointer self-start sm:self-auto"
        >
          <span className="material-symbols-rounded text-lg font-bold">add</span>
          Inscribe New Quest
        </button>
      </div>

      {/* Top Stats Ribbon */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-4 rounded-xl border border-white/8 bg-[#1a1b21] p-4 shadow-md">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#57dffe]/10 border border-[#57dffe]/30 text-[#57dffe]">
            <span className="material-symbols-rounded text-2xl">pending_actions</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-white/50 block tracking-wider">
              Active Objectives
            </span>
            <span className="font-display text-2xl font-bold text-white">{activeCount} Quests</span>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl border border-white/8 bg-[#1a1b21] p-4 shadow-md">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 border border-green-500/30 text-green-400">
            <span className="material-symbols-rounded text-2xl">task_alt</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-white/50 block tracking-wider">
              Conquered Quests
            </span>
            <span className="font-display text-2xl font-bold text-green-400">{completedCount} Completed</span>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl border border-white/8 bg-[#1a1b21] p-4 shadow-md">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ffc659]/10 border border-[#ffc659]/30 text-[#ffc659]">
            <span className="material-symbols-rounded text-2xl">savings</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-white/50 block tracking-wider">
              Bounty Gold Harvested
            </span>
            <span className="font-display text-2xl font-bold text-[#ffc659]">🪙 {totalGoldEarned} Gold</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4 rounded-2xl border border-white/8 bg-[#1a1b21] p-5 shadow-lg">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <span className="material-symbols-rounded absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 text-lg">
              search
            </span>
            <input
              type="text"
              placeholder="Search by keyword, lore, or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#0c0e13] pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/40 focus:border-[#ffc659] focus:outline-none"
            />
          </div>

          {/* Status Segmented Control */}
          <div className="flex rounded-xl bg-[#0c0e13] p-1 border border-white/8 text-xs self-start md:self-auto">
            {(["all", "active", "completed"] as const).map((s) => (
              <button
                key={s}
                onClick={() => {
                  soundEngine.playClick()
                  setStatusFilter(s)
                }}
                className={`rounded-lg px-4 py-1.5 font-bold uppercase text-[11px] tracking-wider transition-all ${
                  statusFilter === s
                    ? "bg-[#ffc659] text-black shadow-md"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 scrollbar-thin">
          <button
            onClick={() => {
              soundEngine.playClick()
              setSelectedCategory("ALL")
            }}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === "ALL"
                ? "bg-[#641ea3] text-white border border-[#ddb8ff]/30 shadow-md shadow-[#641ea3]/30"
                : "bg-[#111318] text-[#d4c4ae] border border-white/5 hover:bg-white/5 hover:text-white"
            }`}
          >
            All Disciplines ({quests.length})
          </button>
          {QUEST_CATEGORIES.map((cat) => {
            const count = quests.filter((q) => q.category.toLowerCase() === cat.toLowerCase()).length
            return (
              <button
                key={cat}
                onClick={() => {
                  soundEngine.playClick()
                  setSelectedCategory(cat.toUpperCase())
                }}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.toUpperCase()
                    ? "bg-[#641ea3] text-white border border-[#ddb8ff]/30 shadow-md shadow-[#641ea3]/30"
                    : "bg-[#111318] text-[#d4c4ae] border border-white/5 hover:bg-white/5 hover:text-white"
                }`}
              >
                {cat} ({count})
              </button>
            )
          })}
        </div>
      </div>

      {/* Quest Grid */}
      <QuestList
        quests={filteredQuests}
        onEditQuest={(quest) => setEditingQuest(quest)}
      />

      {/* Modals */}
      <CreateQuestModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />

      <EditQuestModal
        quest={editingQuest}
        open={!!editingQuest}
        onClose={() => setEditingQuest(null)}
      />
    </div>
  )
}
