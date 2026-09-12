import type { Database } from "@/types/database"

export type QuestRow           = Database["public"]["Tables"]["quests"]["Row"]
export type CreateQuestInput   = Database["public"]["Tables"]["quests"]["Insert"]
export type UpdateQuestInput   = Database["public"]["Tables"]["quests"]["Update"]

// Strongly-typed difficulty enum
export type QuestDifficulty = "trivial" | "easy" | "normal" | "hard" | "legendary"

// App-facing Quest type with strong difficulty typing
export interface Quest extends Omit<QuestRow, "difficulty"> {
  difficulty: QuestDifficulty
}

export type QuestCategory =
  | "Health"
  | "Learning"
  | "Work"
  | "Social"
  | "Creative"
  | "Finance"
  | "Personal"
  | "Other"

export type QuestFilter = {
  category?:   QuestCategory | "all"
  difficulty?: QuestDifficulty | "all"
  completed?:  boolean | "all"
}
