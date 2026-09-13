"use client"

import { useState } from "react"
import { useHero } from "@/lib/stores/heroStore"
import { soundEngine } from "@/lib/utils/audio"

interface SecuritySettingsProps {
  onNotify: (msg: string) => void
}

export function SecuritySettings({ onNotify }: SecuritySettingsProps) {
  const { state, resetAllData } = useHero()
  const [confirmReset, setConfirmReset] = useState(false)

  const handleExport = () => {
    soundEngine.playClick()
    const jsonStr = JSON.stringify(state, null, 2)
    const blob = new Blob([jsonStr], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `lifequest-dossier-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    onNotify("Vanguard Dossier JSON downloaded successfully!")
  }

  const handleReset = () => {
    soundEngine.playClick()
    if (!confirmReset) {
      setConfirmReset(true)
      setTimeout(() => setConfirmReset(false), 4000)
      return
    }

    resetAllData()
    setConfirmReset(false)
    onNotify("Realm records purged and re-seeded to default state.")
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[#1a1b21] p-6 shadow-xl space-y-5">
      <div className="border-b border-white/8 pb-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ffb4ab]">
          <span className="material-symbols-rounded text-sm">security</span>
          Sanctum Wards & Archive
        </div>
        <h3 className="font-display text-xl font-bold text-white mt-0.5">Privacy & Security</h3>
        <p className="text-xs text-[#d4c4ae] mt-0.5">
          Export your hero dossier backup or purge local archives.
        </p>
      </div>

      <div className="space-y-3">
        {/* Export Data */}
        <div className="flex items-center justify-between rounded-xl bg-[#0c0e13] p-3.5 border border-white/5">
          <div>
            <span className="text-xs font-bold text-white block">Export Vanguard Dossier</span>
            <span className="text-[10px] text-white/50">Save full JSON archive of quests, stats, and achievements</span>
          </div>
          <button
            type="button"
            onClick={handleExport}
            className="rounded-lg border border-[#57dffe]/30 bg-[#57dffe]/10 px-3.5 py-1.5 text-xs font-bold text-[#57dffe] hover:bg-[#57dffe]/20 transition-all cursor-pointer"
          >
            Export JSON
          </button>
        </div>

        {/* Reset State */}
        <div className="flex items-center justify-between rounded-xl bg-[#0c0e13] p-3.5 border border-white/5">
          <div>
            <span className="text-xs font-bold text-white block">Purge Local Realm Cache</span>
            <span className="text-[10px] text-white/50">Reset local hero store and restore default seeded data</span>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
              confirmReset
                ? "bg-red-600 text-white animate-pulse"
                : "border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20"
            }`}
          >
            {confirmReset ? "Click to Confirm" : "Reset Data"}
          </button>
        </div>
      </div>
    </div>
  )
}
