"use client"

import { useState } from "react"
import { useHero } from "@/lib/stores/heroStore"
import { EditCharacterModal } from "@/components/character/EditCharacterModal"
import { soundEngine } from "@/lib/utils/audio"

export function ProfileSettings() {
  const { profile } = useHero()
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <div className="rounded-2xl border border-white/10 bg-[#1a1b21] p-6 shadow-xl space-y-5">
        <div className="flex items-center justify-between border-b border-white/8 pb-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ffc659]">
              <span className="material-symbols-rounded text-sm">account_circle</span>
              Vanguard Identity
            </div>
            <h3 className="font-display text-xl font-bold text-white mt-0.5">Character Profile</h3>
          </div>

          <button
            onClick={() => {
              soundEngine.playClick()
              setModalOpen(true)
            }}
            className="flex items-center gap-1.5 rounded-lg border border-[#ffc659]/30 bg-[#ffc659]/10 px-3 py-1.5 text-xs font-bold text-[#ffc659] hover:bg-[#ffc659]/20 transition-all cursor-pointer"
          >
            <span className="material-symbols-rounded text-sm">edit</span>
            Edit Dossier
          </button>
        </div>

        <div className="flex items-center gap-4">
          <img
            src={profile.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
            alt={profile.username || "Arjun"}
            className="h-16 w-16 rounded-2xl object-cover ring-2 ring-[#641ea3] shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-display text-xl font-bold text-white tracking-wide">
                {profile.username || "Arjun"}
              </h4>
              <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-bold text-[#ffc659]">
                Lvl {profile.level}
              </span>
            </div>
            <p className="text-xs text-[#d4c4ae] mt-0.5">
              Arcane Blade • Vanguard Rank: Silver III
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[11px] text-white/50 font-mono">
                Ward Email: {profile.username?.toLowerCase() || "arjun"}@example.com
              </span>
              <span className="rounded-full bg-green-500/10 border border-green-500/20 px-2 py-0.2 text-[9px] font-bold uppercase text-green-400">
                Verified
              </span>
            </div>
          </div>
        </div>
      </div>

      <EditCharacterModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
