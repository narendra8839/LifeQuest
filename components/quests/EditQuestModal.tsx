"use client"

import type { Quest } from "@/types/quest"

interface EditQuestModalProps {
  quest: Quest | null
  open: boolean
  onClose: () => void
}

/** EditQuestModal — modal for editing an existing quest. TODO: implement from Stitch design. */
export function EditQuestModal({ quest: _quest, open: _open, onClose: _onClose }: EditQuestModalProps) {
  return null /* TODO */
}
