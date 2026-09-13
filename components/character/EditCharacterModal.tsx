"use client"

import { useState } from "react"
import { Modal } from "@/components/ui/Modal"
import { useHero } from "@/lib/stores/heroStore"

interface EditCharacterModalProps {
  open: boolean
  onClose: () => void
}

const AVATAR_OPTIONS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
]

export function EditCharacterModal({ open, onClose }: EditCharacterModalProps) {
  const { profile, updateProfile } = useHero()

  const [username, setUsername] = useState(profile.username || "Arjun")
  const [selectedAvatar, setSelectedAvatar] = useState(profile.avatar || AVATAR_OPTIONS[0])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile({
      username: username.trim() || "Arjun",
      avatar: selectedAvatar,
    })
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} className="max-w-md bg-[#1a1b21] border-[#ffc659]/30 text-[#e2e2e9]">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ffc659]/10 border border-[#ffc659]/30 text-[#ffc659]">
            <span className="material-symbols-rounded">badge</span>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-white">Edit Title & Sigils</h2>
            <p className="text-xs text-[#d4c4ae]">Customize your vanguard identity</p>
          </div>
        </div>

        {/* Display Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-white/80">
            Character Name
          </label>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#0c0e13] px-3.5 py-2.5 text-sm text-white focus:border-[#ffc659] focus:outline-none"
          />
        </div>

        {/* Avatar Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-white/80">
            Sigil / Portrait
          </label>
          <div className="grid grid-cols-4 gap-3">
            {AVATAR_OPTIONS.map((url, i) => (
              <button
                type="button"
                key={i}
                onClick={() => setSelectedAvatar(url)}
                className={`relative aspect-square rounded-xl overflow-hidden ring-2 transition-all ${
                  selectedAvatar === url
                    ? "ring-[#ffc659] scale-105 shadow-md shadow-[#ffc659]/30"
                    : "ring-white/10 hover:ring-white/40"
                }`}
              >
                <img src={url} alt={`Avatar ${i + 1}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/8">
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
            Save Sigil
          </button>
        </div>
      </form>
    </Modal>
  )
}
