import type { QuestDifficulty } from "@/types/quest"

// ── XP / Level curve ───────────────────────────────────────────────────────
export const XP_PER_LEVEL_BASE  = 100
export const XP_LEVEL_SCALING   = 1

// ── XP rewards per difficulty ─────────────────────────────────────────────
export const XP_REWARDS: Record<QuestDifficulty, number> = {
  trivial:    25,
  easy:       50,
  normal:    100,
  hard:      200,
  legendary: 400,
}

// ── Gold rewards per difficulty ───────────────────────────────────────────
export const GOLD_REWARDS: Record<QuestDifficulty, number> = {
  trivial:    10,
  easy:       25,
  normal:     50,
  hard:      100,
  legendary: 200,
}

// ── Quest categories ──────────────────────────────────────────────────────
export const QUEST_CATEGORIES = [
  "Health",
  "Learning",
  "Work",
  "Social",
  "Creative",
  "Finance",
  "Personal",
  "Other",
] as const

// ── Quest difficulties ────────────────────────────────────────────────────
export const QUEST_DIFFICULTIES: QuestDifficulty[] = [
  "trivial",
  "easy",
  "normal",
  "hard",
  "legendary",
]

// ── RPG Attributes ────────────────────────────────────────────────────────
export const CHARACTER_ATTRIBUTES = [
  { key: "intellect",   label: "Intellect",   icon: "psychology",    color: "cyan"   },
  { key: "strength",    label: "Strength",    icon: "fitness_center", color: "gold"   },
  { key: "discipline",  label: "Discipline",  icon: "self_improvement",color: "purple" },
  { key: "vitality",   label: "Vitality",   icon: "favorite",       color: "gold"   },
  { key: "creativity", label: "Creativity", icon: "palette",        color: "purple" },
] as const

// ── Navigation ────────────────────────────────────────────────────────────
export const NAV_ROUTES = {
  dashboard:    "/dashboard",
  quests:       "/quests",
  character:    "/character",
  achievements: "/achievements",
  settings:     "/settings",
  login:        "/login",
  signup:       "/signup",
} as const

export const PROTECTED_ROUTES = [
  NAV_ROUTES.dashboard,
  NAV_ROUTES.quests,
  NAV_ROUTES.character,
  NAV_ROUTES.achievements,
  NAV_ROUTES.settings,
]

export const AUTH_ROUTES = [
  NAV_ROUTES.login,
  NAV_ROUTES.signup,
]

// ── Supabase table names (avoids magic strings) ───────────────────────────
export const DB_TABLES = {
  profiles:         "profiles",
  attributes:       "attributes",
  quests:           "quests",
  achievements:     "achievements",
  userAchievements: "user_achievements",
} as const
