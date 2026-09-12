import type { Quest } from "@/types/quest"

interface QuestCardProps {
  quest: Quest
}

/** QuestCard — single quest tile. TODO: implement from Stitch design. */
export function QuestCard({ quest: _quest }: QuestCardProps) {
  return <div className="rpg-panel p-4">{/* TODO */}</div>
}
