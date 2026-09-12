import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Quest Board",
  description: "Manage and conquer your quests on LifeQuest.",
}

/**
 * Quests / Quest Board page — placeholder.
 * Full UI will be implemented from the Stitch design.
 */
export default function QuestsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-4xl font-bold text-gold-400 text-glow-gold">
        Quest Board
      </h1>
      {/* TODO: QuestFilters, QuestList, CreateQuestModal */}
    </div>
  )
}
