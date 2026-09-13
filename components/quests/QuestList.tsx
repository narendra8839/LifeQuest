"use client"

import type { Quest } from "@/types/quest"
import { QuestCard } from "@/components/quests/QuestCard"

interface QuestListProps {
  quests: Quest[]
  onEditQuest: (quest: Quest) => void
}

export function QuestList({ quests, onEditQuest }: QuestListProps) {
  if (quests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#111318] p-12 text-center">
        <span className="material-symbols-rounded text-5xl text-white/20">search_off</span>
        <h4 className="mt-3 text-base font-bold text-white">No Quests Match Filters</h4>
        <p className="mt-1 text-xs text-[#d4c4ae] max-w-sm">
          Adjust your category or status filters, or inscribe a new quest to conquer your day.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {quests.map((quest) => (
        <QuestCard key={quest.id} quest={quest} onEdit={onEditQuest} />
      ))}
    </div>
  )
}
