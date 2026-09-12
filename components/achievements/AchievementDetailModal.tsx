"use client"

import type { Achievement } from "@/types/achievement"

interface AchievementDetailModalProps {
  achievement: Achievement | null
  open: boolean
  onClose: () => void
}

/** AchievementDetailModal — expanded achievement details overlay. TODO: implement from Stitch design. */
export function AchievementDetailModal(_props: AchievementDetailModalProps) {
  return null /* TODO */
}
