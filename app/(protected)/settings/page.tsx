"use client"

import { useState } from "react"
import { ProfileSettings } from "@/components/settings/ProfileSettings"
import { AppearanceSettings } from "@/components/settings/AppearanceSettings"
import { AccessibilitySettings } from "@/components/settings/AccessibilitySettings"
import { AccountSettings } from "@/components/settings/AccountSettings"
import { SecuritySettings } from "@/components/settings/SecuritySettings"
import { Toast } from "@/components/ui/Toast"
import { soundEngine } from "@/lib/utils/audio"

export default function SettingsPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const handleSaveAll = () => {
    soundEngine.playCoin()
    setToastMessage("All realm preferences & auras synchronized to the Cloud Codex!")
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-6 space-y-8">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50">
          <Toast message={toastMessage} type="success" onDismiss={() => setToastMessage(null)} />
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-white/8 pb-6">
        <div>
          <div className="flex items-center gap-2 text-[#ffc659] text-xs font-bold uppercase tracking-wider">
            <span className="material-symbols-rounded text-sm">shield_with_house</span>
            Sanctum Preferences • Realm Configuration
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white text-glow-gold tracking-tight mt-1">
            Settings
          </h1>
          <p className="text-sm text-[#d4c4ae] max-w-2xl mt-1.5 leading-relaxed">
            Configure your realm, notifications, aesthetic auras, and security wards to sustain peak operational focus across all heroic pursuits.
          </p>
        </div>

        {/* Cloud Codex Status Card */}
        <div className="hidden md:flex items-center gap-3 rounded-xl border border-white/10 bg-[#111318] px-4 py-2.5 shadow-sm">
          <span className="pulse-indicator" />
          <div className="text-xs">
            <span className="text-white/50 block text-[10px] uppercase font-bold tracking-wider">Cloud Codex Link</span>
            <span className="font-semibold text-[#57dffe]">Active & Synchronized</span>
          </div>
        </div>
      </div>

      {/* 12-Column Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          <ProfileSettings />
          <AppearanceSettings />
          <AccessibilitySettings />
        </div>

        {/* Right Column (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          <AccountSettings />
          <SecuritySettings onNotify={(msg) => setToastMessage(msg)} />
        </div>
      </div>

      {/* Sticky Save Action Bar */}
      <div className="sticky bottom-6 z-30 flex items-center justify-between rounded-2xl border border-[#ffc659]/30 bg-[#161829]/95 p-4 shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="material-symbols-rounded text-[#ffc659] text-xl">auto_awesome</span>
          <div>
            <span className="font-semibold text-xs text-white">Unsaved Astral Changes?</span>
            <p className="text-[10px] text-[#d4c4ae]">Live preferences are saved locally and synced automatically.</p>
          </div>
        </div>

        <button
          onClick={handleSaveAll}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ffc659] to-[#e5a92b] px-6 py-2.5 text-xs font-extrabold uppercase tracking-wider text-black shadow-lg shadow-[#ffc659]/30 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
        >
          <span className="material-symbols-rounded text-base">save</span>
          Save Preferences
        </button>
      </div>
    </div>
  )
}
