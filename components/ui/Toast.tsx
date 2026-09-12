"use client"

import { useEffect } from "react"
import { cn } from "@/lib/utils/cn"

interface ToastProps {
  message: string
  type?: "success" | "error" | "info" | "warning"
  onDismiss: () => void
  duration?: number
}

/** Toast — transient notification. TODO: wire to a global toast store. */
export function Toast({ message, type = "info", onDismiss, duration = 4000 }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onDismiss, duration)
    return () => clearTimeout(t)
  }, [onDismiss, duration])

  const styles = {
    success: "border-gold-500/40   bg-gold-500/10   text-gold-300",
    error:   "border-red-500/40    bg-red-500/10    text-red-300",
    warning: "border-yellow-500/40 bg-yellow-500/10 text-yellow-300",
    info:    "border-cyan-500/40   bg-cyan-500/10   text-cyan-300",
  }

  return (
    <div
      role="alert"
      className={cn(
        "flex items-center gap-3 rounded-lg border px-4 py-3 text-sm shadow-panel",
        styles[type]
      )}
    >
      <span className="flex-1">{message}</span>
      <button onClick={onDismiss} className="opacity-60 hover:opacity-100" aria-label="Dismiss">
        <span className="material-symbols-rounded text-[16px]">close</span>
      </button>
    </div>
  )
}
