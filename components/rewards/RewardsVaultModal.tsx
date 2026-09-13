"use client"

import { useState } from "react"
import { useHero } from "@/lib/stores/heroStore"
import { Modal } from "@/components/ui/Modal"

interface RewardsVaultModalProps {
  open: boolean
  onClose: () => void
}

interface VaultItem {
  id: string
  title: string
  type: "theme" | "badge" | "equipment"
  cost: number
  description: string
  icon: string
  accentColor: string
}

const VAULT_ITEMS: VaultItem[] = [
  {
    id: "item-theme-arcane",
    title: "Arcane Realm Aura",
    type: "theme",
    cost: 500,
    description: "Bathes your entire interface in purple nebula & shimmering amethyst runes.",
    icon: "palette",
    accentColor: "text-[#ddb8ff]",
  },
  {
    id: "item-theme-golden",
    title: "Golden Sunburst Aura",
    type: "theme",
    cost: 750,
    description: "Unlocks rich imperial gold parchment atmosphere and glowing sunburst runes.",
    icon: "auto_awesome",
    accentColor: "text-[#ffc659]",
  },
  {
    id: "item-theme-night",
    title: "Night Starlit Aura",
    type: "theme",
    cost: 400,
    description: "Deep starlit obsidian realm with neon cyan accents for midnight coding.",
    icon: "bedtime",
    accentColor: "text-[#57dffe]",
  },
  {
    id: "item-badge-apex",
    title: "Sigil of the Apex Titan",
    type: "badge",
    cost: 300,
    description: "A prestigious legendary insignia displayed proudly upon your vanguard dossier.",
    icon: "shield",
    accentColor: "text-[#ffc659]",
  },
  {
    id: "item-badge-flame",
    title: "Ignis Flame Frame",
    type: "badge",
    cost: 350,
    description: "An animated fiery border contour for your hero portrait.",
    icon: "local_fire_department",
    accentColor: "text-[#ffb4ab]",
  },
  {
    id: "item-relic-iron",
    title: "Elixir of Iron Will",
    type: "equipment",
    cost: 200,
    description: "Consumable draught permanently empowering your Discipline attribute by +5.",
    icon: "fitness_center",
    accentColor: "text-[#ddb8ff]",
  },
  {
    id: "item-relic-binary",
    title: "Tome of Binary Insight",
    type: "equipment",
    cost: 200,
    description: "Ancient algorithm grimoire granting +5 permanent bonus to Intellect.",
    icon: "psychology",
    accentColor: "text-[#57dffe]",
  },
]

export function RewardsVaultModal({ open, onClose }: RewardsVaultModalProps) {
  const { profile, unlockedBadges, purchaseItem, updatePreferences } = useHero()
  const [purchaseMsg, setPurchaseMsg] = useState<string | null>(null)

  const handleBuy = (item: VaultItem) => {
    if (profile.gold < item.cost) {
      setPurchaseMsg("⚠️ Insufficient Gold in vault. Conquer more quests!")
      setTimeout(() => setPurchaseMsg(null), 3000)
      return
    }

    const success = purchaseItem(item.cost, item.title, item.type)
    if (success) {
      if (item.id === "item-theme-arcane") updatePreferences({ theme: "arcane" })
      if (item.id === "item-theme-golden") updatePreferences({ theme: "golden" })
      if (item.id === "item-theme-night") updatePreferences({ theme: "night" })

      setPurchaseMsg(`✨ Acquired: ${item.title}!`)
      setTimeout(() => setPurchaseMsg(null), 3000)
    }
  }

  return (
    <Modal open={open} onClose={onClose} className="max-w-2xl bg-[#1a1b21] border-[#ffc659]/20 text-[#e2e2e9]">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2 text-[#ffc659] text-xs font-semibold tracking-wider uppercase">
              <span className="material-symbols-rounded text-sm">savings</span>
              Rewards Vault & Armory
            </div>
            <h2 className="font-display text-2xl font-bold text-white mt-1">Acquire Relics & Auras</h2>
            <p className="text-xs text-[#d4c4ae] mt-0.5">
              Exchange your hard-earned quest gold for cosmetics, themes, and badges.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-[#ffc659]/10 border border-[#ffc659]/30 px-3 py-1.5 text-[#ffc659] font-bold text-sm shadow-sm">
            <span>🪙</span>
            <span>{profile.gold.toLocaleString()} Gold</span>
          </div>
        </div>

        {purchaseMsg && (
          <div className="rounded-lg bg-[#ffc659]/10 border border-[#ffc659]/30 px-4 py-2 text-sm text-[#ffc659] animate-pulse">
            {purchaseMsg}
          </div>
        )}

        {/* Items Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-h-[60vh] overflow-y-auto pr-1">
          {VAULT_ITEMS.map((item) => {
            const isOwned = unlockedBadges.includes(item.title)
            const canAfford = profile.gold >= item.cost

            return (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between rounded-xl border border-white/8 bg-[#111318] p-4 transition-all hover:border-[#ffc659]/40 hover:bg-[#1a1b21]"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                        <span className={`material-symbols-rounded text-xl ${item.accentColor}`}>{item.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-white group-hover:text-[#ffc659] transition-colors">
                          {item.title}
                        </h4>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-white/40">
                          {item.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-[#d4c4ae] leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#ffc659]">
                    <span>🪙</span>
                    <span>{item.cost} Gold</span>
                  </div>

                  {isOwned ? (
                    <span className="rounded bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/50">
                      Unlocked
                    </span>
                  ) : (
                    <button
                      onClick={() => handleBuy(item)}
                      disabled={!canAfford}
                      className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                        canAfford
                          ? "bg-[#ffc659] text-black hover:bg-[#ffdea8] shadow-md shadow-[#ffc659]/20 active:scale-95"
                          : "bg-white/5 text-white/30 cursor-not-allowed"
                      }`}
                    >
                      {canAfford ? "Unlock" : "Need Gold"}
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Modal>
  )
}
