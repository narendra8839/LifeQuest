"use client"

import { useState, useEffect, useCallback } from "react"
import type { Quest, QuestDifficulty, QuestCategory } from "@/types/quest"
import type { Profile, Attributes } from "@/types/profile"
import type { Achievement, UserAchievement } from "@/types/achievement"
import { calculateLevel, calculateXpForNextLevel, calculateLevelProgress, calculateXpToNextLevel } from "@/lib/utils/level"
import { soundEngine } from "@/lib/utils/audio"
import { triggerCelebration } from "@/lib/utils/confetti"

export interface EquipmentItem {
  id: string
  name: string
  slot: "helm" | "cloak" | "ring" | "codex"
  attributeBonus: string
  icon: string
  rarity: "rare" | "epic" | "legendary"
}

export interface UserPreferences {
  theme: "dark" | "night" | "arcane" | "golden"
  fontScale: "standard" | "compact"
  runicBorders: boolean
  reduceMotion: boolean
  highContrast: boolean
  dyslexicFont: boolean
  fullKeyboardNav: boolean
  soundEnabled: boolean
  dailyReminders: boolean
  streakAlerts: boolean
}

export interface HeroState {
  profile: Profile
  attributes: Attributes
  quests: Quest[]
  achievements: Achievement[]
  userAchievements: UserAchievement[]
  equipment: EquipmentItem[]
  preferences: UserPreferences
  unlockedBadges: string[]
  levelUpModal: {
    isOpen: boolean
    previousLevel: number
    newLevel: number
    xpGained: number
    goldGained: number
  } | null
}

const STORAGE_KEY = "lifequest_hero_state_v1"

// Seed initial state matching Stitch specification
const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: "ach-1",
    name: "First Blood",
    description: "Conquer your very first quest in the realm.",
    requirement: { quests_completed: 1 },
    reward_xp: 50,
    reward_gold: 25,
    icon: "military_tech",
  },
  {
    id: "ach-2",
    name: "Early Riser",
    description: "Complete a morning ritual before 07:00 AM 7 times.",
    requirement: { morning_quests: 7 },
    reward_xp: 50,
    reward_gold: 25,
    icon: "wb_sunny",
  },
  {
    id: "ach-3",
    name: "7 Day Warrior",
    description: "Maintain a 7-day Battle Streak without dropping momentum.",
    requirement: { streak: 7 },
    reward_xp: 100,
    reward_gold: 150,
    icon: "local_fire_department",
  },
  {
    id: "ach-4",
    name: "Quest Hunter",
    description: "Conquer 50 total quests across all disciplines.",
    requirement: { quests_completed: 50 },
    reward_xp: 200,
    reward_gold: 100,
    icon: "swords",
  },
  {
    id: "ach-5",
    name: "Bookworm",
    description: "Complete 20 knowledge quests or technical reading logs.",
    requirement: { knowledge_quests: 20 },
    reward_xp: 120,
    reward_gold: 50,
    icon: "auto_stories",
  },
  {
    id: "ach-6",
    name: "Level 10 Hero",
    description: "Reach Level 10 and ascend to Tier II Vanguard rank.",
    requirement: { level: 10 },
    reward_xp: 300,
    reward_gold: 200,
    icon: "military_tech",
  },
  {
    id: "ach-7",
    name: "Golden Adventurer",
    description: "Accumulate 5,000 Gold from conquered bounties.",
    requirement: { gold: 5000 },
    reward_xp: 250,
    reward_gold: 0,
    icon: "paid",
  },
  {
    id: "ach-8",
    name: "Iron Discipline",
    description: "Clear 100% of scheduled daily rituals in a single cycle.",
    requirement: { flawless_day: 1 },
    reward_xp: 80,
    reward_gold: 40,
    icon: "verified",
  },
  {
    id: "ach-9",
    name: "Shadow of Procrastination",
    description: "Overcome the midnight temptation and strike before the hour resets.",
    requirement: { midnight_slayer: 1 },
    reward_xp: 150,
    reward_gold: 75,
    icon: "visibility_off",
  },
]

const INITIAL_STATE: HeroState = {
  profile: {
    id: "guest-hero-id",
    username: "Arjun",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    level: 12,
    xp: 840,
    gold: 1240,
    streak: 7,
    created_at: new Date(Date.now() - 37 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  attributes: {
    id: "attr-1",
    user_id: "guest-hero-id",
    discipline: 91,
    intellect: 82,
    vitality: 72,
    creativity: 68,
    strength: 65,
  },
  quests: [
    {
      id: "q-1",
      user_id: "guest-hero-id",
      title: "Solve 2 LeetCode Problems",
      description: "Solve two algorithm problems to sharpen your intellect and graph skills.",
      category: "Learning",
      difficulty: "hard",
      xp_reward: 100,
      gold_reward: 50,
      completed: false,
      created_at: new Date().toISOString(),
      completed_at: null,
    },
    {
      id: "q-2",
      user_id: "guest-hero-id",
      title: "Deep Work Sprint (90 Mins)",
      description: "Uninterrupted focus session on system architecture with zero tab switching.",
      category: "Work",
      difficulty: "hard",
      xp_reward: 120,
      gold_reward: 60,
      completed: false,
      created_at: new Date().toISOString(),
      completed_at: null,
    },
    {
      id: "q-3",
      user_id: "guest-hero-id",
      title: "Morning Strength Workout",
      description: "Complete full 45-minute hypertrophy circuit and stretch protocol.",
      category: "Health",
      difficulty: "normal",
      xp_reward: 80,
      gold_reward: 40,
      completed: false,
      created_at: new Date().toISOString(),
      completed_at: null,
    },
    {
      id: "q-4",
      user_id: "guest-hero-id",
      title: "Read 15 Pages of Codex",
      description: "Technical chapter on distributed consensus algorithms and raft protocol.",
      category: "Learning",
      difficulty: "normal",
      xp_reward: 60,
      gold_reward: 30,
      completed: true,
      created_at: new Date(Date.now() - 3600000).toISOString(),
      completed_at: new Date(Date.now() - 1800000).toISOString(),
    },
    {
      id: "q-5",
      user_id: "guest-hero-id",
      title: "UI Prototype Motion Design",
      description: "Craft tactile CSS animations and micro-interactions for sanctum cards.",
      category: "Creative",
      difficulty: "normal",
      xp_reward: 75,
      gold_reward: 35,
      completed: true,
      created_at: new Date(Date.now() - 7200000).toISOString(),
      completed_at: new Date(Date.now() - 3600000).toISOString(),
    },
  ],
  achievements: INITIAL_ACHIEVEMENTS,
  userAchievements: [
    {
      id: "ua-1",
      user_id: "guest-hero-id",
      achievement_id: "ach-1",
      unlocked_at: new Date(Date.now() - 86400000 * 20).toISOString(),
      achievement: INITIAL_ACHIEVEMENTS[0],
    },
    {
      id: "ua-2",
      user_id: "guest-hero-id",
      achievement_id: "ach-2",
      unlocked_at: new Date(Date.now() - 86400000 * 14).toISOString(),
      achievement: INITIAL_ACHIEVEMENTS[1],
    },
    {
      id: "ua-3",
      user_id: "guest-hero-id",
      achievement_id: "ach-3",
      unlocked_at: new Date(Date.now() - 86400000 * 7).toISOString(),
      achievement: INITIAL_ACHIEVEMENTS[2],
    },
    {
      id: "ua-4",
      user_id: "guest-hero-id",
      achievement_id: "ach-6",
      unlocked_at: new Date(Date.now() - 86400000 * 2).toISOString(),
      achievement: INITIAL_ACHIEVEMENTS[5],
    },
    {
      id: "ua-5",
      user_id: "guest-hero-id",
      achievement_id: "ach-8",
      unlocked_at: new Date(Date.now() - 86400000 * 1).toISOString(),
      achievement: INITIAL_ACHIEVEMENTS[7],
    },
  ],
  equipment: [
    { id: "eq-1", name: "Helm of Clarity", slot: "helm", attributeBonus: "+8 Intellect", icon: "psychology", rarity: "epic" },
    { id: "eq-2", name: "Cloak of Deep Work", slot: "cloak", attributeBonus: "+12 Discipline", icon: "shield", rarity: "legendary" },
    { id: "eq-3", name: "Ring of Iron Will", slot: "ring", attributeBonus: "+10 Vitality", icon: "favorite", rarity: "epic" },
    { id: "eq-4", name: "Codex Algorithms", slot: "codex", attributeBonus: "+14 Arcana", icon: "auto_stories", rarity: "legendary" },
  ],
  preferences: {
    theme: "dark",
    fontScale: "standard",
    runicBorders: true,
    reduceMotion: false,
    highContrast: false,
    dyslexicFont: false,
    fullKeyboardNav: true,
    soundEnabled: true,
    dailyReminders: true,
    streakAlerts: true,
  },
  unlockedBadges: ["Deep Focus Sage", "Flame of Fortitude", "Binary Alchemist"],
  levelUpModal: null,
}

// Global subscribers for multi-component reactivity
const listeners = new Set<() => void>()
let globalState: HeroState = INITIAL_STATE

function notify() {
  listeners.forEach((listener) => listener())
}

function loadState(): HeroState {
  if (typeof window === "undefined") return INITIAL_STATE
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_STATE))
      return INITIAL_STATE
    }
    const parsed = JSON.parse(raw)
    // Merge with defaults to prevent schema drift
    return {
      ...INITIAL_STATE,
      ...parsed,
      profile: { ...INITIAL_STATE.profile, ...parsed.profile },
      attributes: { ...INITIAL_STATE.attributes, ...parsed.attributes },
      preferences: { ...INITIAL_STATE.preferences, ...parsed.preferences },
      achievements: INITIAL_ACHIEVEMENTS,
    }
  } catch {
    return INITIAL_STATE
  }
}

function saveState(state: HeroState) {
  globalState = state
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (e) {
      console.error("Failed to save LifeQuest state", e)
    }
  }
  notify()
}

// Initialize on client
if (typeof window !== "undefined") {
  globalState = loadState()
}

export function useHero() {
  const [state, setState] = useState<HeroState>(globalState)

  useEffect(() => {
    // Sync on mount
    setState(globalState)

    const updateListener = () => {
      setState({ ...globalState })
    }
    listeners.add(updateListener)
    return () => {
      listeners.delete(updateListener)
    }
  }, [])

  // ── Actions ──────────────────────────────────────────────────────────────

  const addQuest = useCallback((input: {
    title: string
    description?: string
    category: QuestCategory
    difficulty: QuestDifficulty
    xpReward: number
    goldReward: number
  }) => {
    const newQuest: Quest = {
      id: `q-${Date.now()}`,
      user_id: state.profile.id,
      title: input.title,
      description: input.description ?? null,
      category: input.category,
      difficulty: input.difficulty,
      xp_reward: input.xpReward,
      gold_reward: input.goldReward,
      completed: false,
      created_at: new Date().toISOString(),
      completed_at: null,
    }

    const updatedQuests = [newQuest, ...state.quests]
    soundEngine.playClick()
    saveState({ ...state, quests: updatedQuests })
    return newQuest
  }, [state])

  const editQuest = useCallback((id: string, updates: Partial<Quest>) => {
    const updatedQuests = state.quests.map((q) =>
      q.id === id ? { ...q, ...updates } : q
    )
    saveState({ ...state, quests: updatedQuests })
  }, [state])

  const deleteQuest = useCallback((id: string) => {
    const updatedQuests = state.quests.filter((q) => q.id !== id)
    soundEngine.playClick()
    saveState({ ...state, quests: updatedQuests })
  }, [state])

  const conquerQuest = useCallback((questId: string) => {
    const target = state.quests.find((q) => q.id === questId)
    if (!target || target.completed) return

    // Play sounds & confetti
    soundEngine.playQuestComplete()
    setTimeout(() => soundEngine.playCoin(), 300)
    triggerCelebration()

    const now = new Date().toISOString()
    const updatedQuests = state.quests.map((q) =>
      q.id === questId ? { ...q, completed: true, completed_at: now } : q
    )

    const earnedXp = target.xp_reward
    const earnedGold = target.gold_reward

    const newXp = state.profile.xp + earnedXp
    const newGold = state.profile.gold + earnedGold
    const oldLevel = state.profile.level
    const newLevel = calculateLevel(newXp)
    const leveledUp = newLevel > oldLevel

    // Update attributes based on quest category
    const attrs = { ...state.attributes }
    if (target.category === "Learning" || target.category === "Work") {
      attrs.intellect += 1
    } else if (target.category === "Health") {
      attrs.strength += 1
    } else if (target.category === "Creative") {
      attrs.creativity += 1
    } else if (target.category === "Personal") {
      attrs.discipline += 1
    } else {
      attrs.vitality += 1
    }

    // New streak
    const newStreak = state.profile.streak + (state.profile.streak === 0 ? 1 : 0)

    const updatedProfile: Profile = {
      ...state.profile,
      xp: newXp,
      gold: newGold,
      level: newLevel,
      streak: newStreak,
      updated_at: now,
    }

    let levelUpData = state.levelUpModal
    if (leveledUp) {
      setTimeout(() => {
        soundEngine.playLevelUp()
        triggerCelebration()
      }, 500)
      levelUpData = {
        isOpen: true,
        previousLevel: oldLevel,
        newLevel: newLevel,
        xpGained: earnedXp,
        goldGained: earnedGold,
      }
    }

    // Check newly unlocked achievements
    const completedCount = updatedQuests.filter((q) => q.completed).length
    const currentUnlocked = new Set(state.userAchievements.map((ua) => ua.achievement_id))
    const newUserAchievements = [...state.userAchievements]

    state.achievements.forEach((ach) => {
      if (currentUnlocked.has(ach.id)) return
      const req = ach.requirement as Record<string, number>
      let unlocked = false
      if (req.quests_completed && completedCount >= req.quests_completed) unlocked = true
      if (req.level && newLevel >= req.level) unlocked = true
      if (req.gold && newGold >= req.gold) unlocked = true
      if (req.streak && newStreak >= req.streak) unlocked = true

      if (unlocked) {
        newUserAchievements.push({
          id: `ua-${Date.now()}-${ach.id}`,
          user_id: state.profile.id,
          achievement_id: ach.id,
          unlocked_at: now,
          achievement: ach,
        })
      }
    })

    saveState({
      ...state,
      quests: updatedQuests,
      profile: updatedProfile,
      attributes: attrs,
      userAchievements: newUserAchievements,
      levelUpModal: levelUpData,
    })
  }, [state])

  const closeLevelUpModal = useCallback(() => {
    saveState({ ...state, levelUpModal: null })
  }, [state])

  const updatePreferences = useCallback((prefs: Partial<UserPreferences>) => {
    const updated = { ...state.preferences, ...prefs }
    saveState({ ...state, preferences: updated })
  }, [state])

  const updateProfile = useCallback((profileUpdates: Partial<Profile>) => {
    const updated = { ...state.profile, ...profileUpdates, updated_at: new Date().toISOString() }
    saveState({ ...state, profile: updated })
  }, [state])

  const purchaseItem = useCallback((cost: number, itemName: string, type: "theme" | "badge" | "equipment") => {
    if (state.profile.gold < cost) return false
    soundEngine.playCoin()
    triggerCelebration()
    const updatedProfile = {
      ...state.profile,
      gold: state.profile.gold - cost,
      updated_at: new Date().toISOString(),
    }
    const updatedBadges = type === "badge" ? [...state.unlockedBadges, itemName] : state.unlockedBadges
    saveState({
      ...state,
      profile: updatedProfile,
      unlockedBadges: updatedBadges,
    })
    return true
  }, [state])

  const resetAllData = useCallback(() => {
    saveState(INITIAL_STATE)
  }, [])

  // Derived calculations
  const xpAtCurrent = state.profile.xp
  const currentLevel = state.profile.level
  const xpProgress = calculateLevelProgress(xpAtCurrent)
  const xpToNext = calculateXpToNextLevel(xpAtCurrent)
  const totalCombinedPower =
    state.attributes.discipline +
    state.attributes.intellect +
    state.attributes.vitality +
    state.attributes.creativity +
    state.attributes.strength

  return {
    state,
    profile: state.profile,
    attributes: state.attributes,
    quests: state.quests,
    achievements: state.achievements,
    userAchievements: state.userAchievements,
    equipment: state.equipment,
    preferences: state.preferences,
    unlockedBadges: state.unlockedBadges,
    levelUpModal: state.levelUpModal,
    combinedPower: totalCombinedPower,
    xpProgress,
    xpToNext,
    currentLevel,
    // Actions
    addQuest,
    editQuest,
    deleteQuest,
    conquerQuest,
    closeLevelUpModal,
    updatePreferences,
    updateProfile,
    purchaseItem,
    resetAllData,
  }
}
