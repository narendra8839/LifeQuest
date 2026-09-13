"use client"

import { useState } from "react"
import { useHero } from "@/lib/stores/heroStore"
import { AchievementGrid } from "@/components/achievements/AchievementGrid"
import { AchievementDetailModal } from "@/components/achievements/AchievementDetailModal"
import { soundEngine } from "@/lib/utils/audio"
import type { Achievement } from "@/types/achievement"

const CATEGORIES = [
  { id: "ALL", label: "ALL" },
  { id: "QUESTS", label: "QUESTS" },
  { id: "STREAKS", label: "STREAKS" },
  { id: "LEVEL", label: "LEVEL" },
  { id: "DISCIPLINE", label: "DISCIPLINE" },
  { id: "EXPLORATION", label: "EXPLORATION" },
]

export default function AchievementsPage() {
  const { achievements, userAchievements } = useHero()

  const [selectedCategory, setSelectedCategory] = useState("ALL")
  const [quickFilter, setQuickFilter] = useState<"all" | "unlocked" | "in_progress" | "secret">("all")
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)

  const unlockedIds = userAchievements.map((ua) => ua.achievement_id)
  const totalCount = achievements.length
  const unlockedCount = unlockedIds.length
  const completionPercent = Math.round((unlockedCount / totalCount) * 100)

  // Filter logic
  const filtered = achievements.filter((ach) => {
    // Quick filter
    const isUnlocked = unlockedIds.includes(ach.id)
    if (quickFilter === "unlocked" && !isUnlocked) return false
    if (quickFilter === "in_progress" && isUnlocked) return false
    if (quickFilter === "secret" && ach.id !== "ach-9") return false

    // Category filter
    if (selectedCategory === "QUESTS" && !ach.name.toLowerCase().includes("quest") && !ach.description.toLowerCase().includes("quest")) return false
    if (selectedCategory === "STREAKS" && !ach.name.toLowerCase().includes("streak") && !ach.description.toLowerCase().includes("streak")) return false
    if (selectedCategory === "LEVEL" && !ach.name.toLowerCase().includes("level") && !ach.description.toLowerCase().includes("level")) return false
    if (selectedCategory === "DISCIPLINE" && !ach.name.toLowerCase().includes("discipline") && !ach.name.toLowerCase().includes("riser")) return false
    if (selectedCategory === "EXPLORATION" && ach.id !== "ach-1" && ach.id !== "ach-9") return false

    return true
  })

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-6 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between border-b border-white/8 pb-6">
        <div>
          <div className="flex items-center gap-2 text-[#ffc659] text-xs font-bold uppercase tracking-wider">
            <span className="material-symbols-rounded text-sm">auto_stories</span>
            Codex Memoria • Record of the Ascended
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white text-glow-gold tracking-tight mt-1">
            Achievements
          </h1>
          <p className="text-sm text-[#d4c4ae] max-w-2xl mt-1.5 leading-relaxed">
            Every quest leaves a permanent mark upon the annals of time. Catalog your heroic triumphs, unearth secret boons, and elevate your standing among the guild lorekeepers.
          </p>
        </div>

        {/* Codex Rank Status Card */}
        <div className="flex items-center gap-3.5 rounded-2xl border border-[#ffc659]/30 bg-[#1a1b21] p-4 shadow-lg min-w-[280px]">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ffc659]/10 border border-[#ffc659]/30 text-[#ffc659]">
            <span className="material-symbols-rounded text-2xl">history_edu</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#ffc659] block tracking-wider">
              CODEX RANK STATUS
            </span>
            <h4 className="font-display text-base font-bold text-white">Tome-Keeper Tier III</h4>
            <span className="text-xs text-[#57dffe] font-mono font-semibold">
              1,850 Codex Points Earned
            </span>
          </div>
        </div>
      </div>

      {/* Great Archive Progression Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-[#1a1b21] via-[#1e1f25] to-[#111318] p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#641ea3]/40 border border-[#ddb8ff]/30 text-[#ddb8ff]">
              <span className="material-symbols-rounded text-2xl">workspace_premium</span>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-white">Great Archive Progression</h3>
              <p className="text-xs text-[#d4c4ae]">Harmonized completion across all realm scrolls</p>
            </div>
          </div>

          <div className="text-right">
            <span className="font-mono text-xl sm:text-2xl font-extrabold text-[#ffc659]">
              {unlockedCount} / {totalCount} UNLOCKED
            </span>
            <span className="text-xs text-white/50 block font-semibold">({completionPercent}% Completion)</span>
          </div>
        </div>

        <div className="relative mt-4 h-3 w-full overflow-hidden rounded-full bg-[#0c0e13] p-0.5 border border-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#ffc659] via-[#e5a92b] to-[#ddb8ff] transition-all duration-700 shadow-[0_0_12px_rgba(255,198,89,0.4)]"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
      </div>

      {/* Progression Counter Ribbon (4 Stats) */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="flex items-center gap-3.5 rounded-xl border border-[#ffc659]/20 bg-[#1a1b21] p-4 shadow-md">
          <span className="material-symbols-rounded text-2xl text-[#ffc659]">emoji_events</span>
          <div>
            <span className="font-display text-2xl font-bold text-white">{unlockedCount}</span>
            <span className="text-xs text-white/50 block font-semibold">Unlocked</span>
          </div>
        </div>

        <div className="flex items-center gap-3.5 rounded-xl border border-white/8 bg-[#1a1b21] p-4 shadow-md">
          <span className="material-symbols-rounded text-2xl text-white/40">lock</span>
          <div>
            <span className="font-display text-2xl font-bold text-white/70">{totalCount - unlockedCount}</span>
            <span className="text-xs text-white/50 block font-semibold">Locked</span>
          </div>
        </div>

        <div className="flex items-center gap-3.5 rounded-xl border border-[#57dffe]/20 bg-[#1a1b21] p-4 shadow-md">
          <span className="material-symbols-rounded text-2xl text-[#57dffe]">hotel_class</span>
          <div>
            <span className="font-display text-2xl font-bold text-[#57dffe]">6</span>
            <span className="text-xs text-white/50 block font-semibold">Rare Feats</span>
          </div>
        </div>

        <div className="flex items-center gap-3.5 rounded-xl border border-[#ddb8ff]/20 bg-[#1a1b21] p-4 shadow-md">
          <span className="material-symbols-rounded text-2xl text-[#ddb8ff]">crown</span>
          <div>
            <span className="font-display text-2xl font-bold text-[#ddb8ff]">2</span>
            <span className="text-xs text-white/50 block font-semibold">Legendary</span>
          </div>
        </div>
      </div>

      {/* Category Tabs & Quick Filter Chips */}
      <div className="space-y-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto border-b border-white/8 pb-3 scrollbar-thin">
          {CATEGORIES.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundEngine.playClick()
                setSelectedCategory(tab.id)
              }}
              className={`rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === tab.id
                  ? "bg-[#641ea3] text-white border border-[#ddb8ff]/40 shadow-lg shadow-[#641ea3]/40"
                  : "text-[#d4c4ae] hover:bg-white/5 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Quick Filter Chips & Sort Indicator */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-1">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "Show All" },
              { id: "unlocked", label: `Unlocked Only (${unlockedCount})` },
              { id: "in_progress", label: `In Progress (${totalCount - unlockedCount})` },
              { id: "secret", label: "Secret Feats (1)" },
            ].map((chip) => (
              <button
                key={chip.id}
                onClick={() => {
                  soundEngine.playClick()
                  setQuickFilter(chip.id as any)
                }}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  quickFilter === chip.id
                    ? "bg-[#ffc659] text-black font-bold shadow-sm"
                    : "bg-[#111318] text-white/60 border border-white/5 hover:text-white"
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-white/40">
            <span className="material-symbols-rounded text-sm">sort</span>
            <span>Sort by: Recency & Rarity</span>
          </div>
        </div>
      </div>

      {/* Achievement Grid */}
      <AchievementGrid
        achievements={filtered}
        unlockedIds={unlockedIds}
        onSelect={(ach) => setSelectedAchievement(ach)}
      />

      {/* Achievement Detail Modal */}
      <AchievementDetailModal
        achievement={selectedAchievement}
        isUnlocked={selectedAchievement ? unlockedIds.includes(selectedAchievement.id) : false}
        open={!!selectedAchievement}
        onClose={() => setSelectedAchievement(null)}
      />
    </div>
  )
}
