import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Character Sanctum",
  description: "View and manage your LifeQuest character — attributes, progression, and stats.",
}

/**
 * Character / Character Sanctum page — placeholder.
 * Full UI will be implemented from the Stitch design.
 */
export default function CharacterPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-4xl font-bold text-gold-400 text-glow-gold">
        Character Sanctum
      </h1>
      {/* TODO: CharacterProfile, CharacterAttributes, CharacterProgress, LevelUpModal */}
    </div>
  )
}
