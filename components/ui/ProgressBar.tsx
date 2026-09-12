import { cn } from "@/lib/utils/cn"

interface ProgressBarProps {
  value: number       // 0–100
  color?: "gold" | "purple" | "cyan"
  className?: string
  showLabel?: boolean
  label?: string
  animated?: boolean
}

export function ProgressBar({
  value,
  color = "gold",
  className,
  showLabel = false,
  label,
  animated = true,
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value))

  const trackColors = {
    gold:   "bg-gold-500",
    purple: "bg-purple-500",
    cyan:   "bg-cyan-500",
  }

  return (
    <div className={cn("w-full", className)}>
      {(showLabel || label) && (
        <div className="mb-1 flex justify-between text-xs text-white/60">
          <span>{label}</span>
          <span>{clampedValue}%</span>
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className={cn("h-full rounded-full transition-all", trackColors[color], animated && "duration-700 ease-out")}
          style={{ width: `${clampedValue}%` }}
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  )
}
