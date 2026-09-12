"use client"

import { useProfile } from "@/hooks/useProfile"
import {
  calculateLevel,
  calculateLevelProgress,
  calculateXpToNextLevel,
} from "@/lib/utils/level"
import { isStreakActive } from "@/lib/utils/streak"
import type { ProgressionState } from "@/types/progression"

/**
 * useProgression — derives RPG progression state from the user's profile.
 * Combines profile data with pure RPG calculation utilities.
 */
export function useProgression(): { progression: ProgressionState | null; isLoading: boolean } {
  const { profile, isLoading } = useProfile()

  if (!profile) return { progression: null, isLoading }

  const progression: ProgressionState = {
    level:          calculateLevel(profile.xp),
    xp:             profile.xp,
    xpToNextLevel:  calculateXpToNextLevel(profile.xp),
    levelProgress:  calculateLevelProgress(profile.xp),
    gold:           profile.gold,
    streak:         profile.streak,
    // Streak active check requires completed_at dates — simplified here
    isStreakActive: profile.streak > 0,
  }

  return { progression, isLoading }
}
