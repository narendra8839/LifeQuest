"use client"

import { useState } from "react"
import { useHero } from "@/lib/stores/heroStore"
import { CharacterPortrait } from "@/components/character/CharacterPortrait"
import { EquipmentGrid } from "@/components/character/EquipmentGrid"
import { AttributesMatrix } from "@/components/character/AttributesMatrix"
import { LifetimeMetrics } from "@/components/character/LifetimeMetrics"
import { EvolutionMilestones } from "@/components/character/EvolutionMilestones"
import { CollectibleBadges } from "@/components/character/CollectibleBadges"
import { EditCharacterModal } from "@/components/character/EditCharacterModal"
import { Toast } from "@/components/ui/Toast"
import { soundEngine } from "@/lib/utils/audio"

export default function CharacterPage() {
  const { profile, combinedPower, attributes } = useHero()
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const handleShareDossier = () => {
    soundEngine.playClick()
    const text = `⚔️ LIFEQUEST VANGUARD DOSSIER\n━━━━━━━━━━━━━━━━━━━━\nHero: ${profile.username || "Arjun"} (Lvl ${profile.level})\nTitle: The Resilient Scholar\nCombined Power: ${combinedPower} PTS\nDiscipline: ${attributes.discipline} | Intellect: ${attributes.intellect} | Vitality: ${attributes.vitality}\nBattle Streak: ${profile.streak} Days | Gold Vault: 🪙 ${profile.gold.toLocaleString()}\n━━━━━━━━━━━━━━━━━━━━\nForged in LifeQuest • Turn Your Life Into An Adventure`

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setToastMessage(`Vanguard Dossier #${profile.level} Copied to Arcane Scroll!`)
      })
    } else {
      setToastMessage("Dossier copied to clipboard!")
    }
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-6 space-y-8">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50">
          <Toast message={toastMessage} type="success" onDismiss={() => setToastMessage(null)} />
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-white/8 pb-6">
        <div>
          <div className="flex items-center gap-2 text-[#ffc659] text-xs font-bold uppercase tracking-wider">
            <span className="material-symbols-rounded text-sm">person</span>
            Vanguard Dossier • Codex Sanctorum
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white text-glow-gold tracking-tight mt-1">
            Character Sanctum
          </h1>
          <p className="text-sm text-[#d4c4ae] max-w-2xl mt-1.5 leading-relaxed">
            Track your growth, inspect your battle statistics, and witness your evolution into a legend.
          </p>
        </div>

        {/* Header Summary Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-xl border border-white/10 bg-[#111318] px-3.5 py-1.5 text-xs text-[#57dffe] font-semibold">
            Rank: Silver III
          </span>
          <span className="rounded-xl border border-white/10 bg-[#111318] px-3.5 py-1.5 text-xs text-[#ffc659] font-semibold">
            The Resilient Scholar
          </span>
          <span className="rounded-xl border border-white/10 bg-[#111318] px-3.5 py-1.5 text-xs text-[#ddb8ff] font-semibold">
            Knights of Perpetual Focus
          </span>
        </div>
      </div>

      {/* 12-Column Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <CharacterPortrait />
          <EquipmentGrid />
        </div>

        {/* Right Column (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <AttributesMatrix />
          <LifetimeMetrics />
          <EvolutionMilestones />
          <CollectibleBadges />
        </div>
      </div>

      {/* Footer Action Panel */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-white/10 bg-[#1a1b21] p-5 shadow-lg">
        <div>
          <span className="font-display text-sm font-bold text-white">Sanctum Codex v1.4</span>
          <p className="text-xs text-[#d4c4ae] mt-0.5">
            All progression points sync directly to your weekly guild rank and achievement archive.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShareDossier}
            className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold text-white hover:bg-white/10 hover:border-[#ffc659]/40 transition-all cursor-pointer"
          >
            <span className="material-symbols-rounded text-base">share</span>
            Share Dossier
          </button>
          <button
            onClick={() => {
              soundEngine.playClick()
              setEditModalOpen(true)
            }}
            className="flex items-center gap-2 rounded-xl bg-[#ffc659] px-4 py-2 text-xs font-bold text-black hover:bg-[#ffdea8] shadow-md shadow-[#ffc659]/20 transition-all cursor-pointer"
          >
            <span className="material-symbols-rounded text-base">edit</span>
            Edit Title & Sigils
          </button>
        </div>
      </div>

      {/* Edit Character Modal */}
      <EditCharacterModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
      />
    </div>
  )
}
