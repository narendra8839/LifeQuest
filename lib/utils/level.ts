import { XP_PER_LEVEL_BASE, XP_LEVEL_SCALING } from "@/lib/constants"

/**
 * calculateXpForLevel — total XP needed to reach a given level from level 1.
 * Uses a quadratic curve: XP = BASE * level * (level + SCALING) / 2
 */
export function calculateXpForLevel(level: number): number {
  return Math.floor(XP_PER_LEVEL_BASE * level * (level + XP_LEVEL_SCALING) / 2)
}

/**
 * calculateXpForNextLevel — XP required to go from current level to the next.
 */
export function calculateXpForNextLevel(currentLevel: number): number {
  return calculateXpForLevel(currentLevel + 1) - calculateXpForLevel(currentLevel)
}

/**
 * calculateLevel — determines a player's level from their total XP.
 */
export function calculateLevel(totalXp: number): number {
  let level = 1
  while (calculateXpForLevel(level + 1) <= totalXp) {
    level++
  }
  return level
}

/**
 * calculateLevelProgress — returns progress (0–100) towards the next level.
 */
export function calculateLevelProgress(totalXp: number): number {
  const level     = calculateLevel(totalXp)
  const xpAtLevel = calculateXpForLevel(level)
  const xpAtNext  = calculateXpForLevel(level + 1)
  const progress  = ((totalXp - xpAtLevel) / (xpAtNext - xpAtLevel)) * 100
  return Math.min(100, Math.max(0, Math.round(progress)))
}

/**
 * calculateXpToNextLevel — raw XP still needed to level up.
 */
export function calculateXpToNextLevel(totalXp: number): number {
  const level    = calculateLevel(totalXp)
  const xpAtNext = calculateXpForLevel(level + 1)
  return Math.max(0, xpAtNext - totalXp)
}
