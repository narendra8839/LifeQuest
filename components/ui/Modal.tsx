"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils/cn"

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  className?: string
}

/** Modal — accessible dialog wrapper. TODO: wire to Stitch design. */
export function Modal({ open, onClose, title, children, className }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (open) document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
    >
      <div className={cn("rpg-panel w-full max-w-lg p-6", className)}>
        {title ? (
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-gold-400">{title}</h2>
            <button onClick={onClose} className="text-white/40 hover:text-white" aria-label="Close">
              <span className="material-symbols-rounded">close</span>
            </button>
          </div>
        ) : null}
        {children}
      </div>
    </div>
  )
}
