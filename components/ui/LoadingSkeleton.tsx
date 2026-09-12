import { cn } from "@/lib/utils/cn"

interface LoadingSkeletonProps {
  className?: string
  lines?: number
}

/** LoadingSkeleton — shimmer placeholder blocks for loading states. */
export function LoadingSkeleton({ className, lines = 1 }: LoadingSkeletonProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="skeleton h-4 w-full rounded" />
      ))}
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="rpg-panel space-y-3 p-6">
      <div className="skeleton h-5 w-1/3 rounded" />
      <div className="skeleton h-4 w-full rounded" />
      <div className="skeleton h-4 w-3/4 rounded" />
    </div>
  )
}
