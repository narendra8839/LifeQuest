interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
}

/** ErrorState — shown when a fetch/operation fails. */
export function ErrorState({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <span className="material-symbols-rounded mb-4 text-[48px] text-red-400/60">error</span>
      <h3 className="font-display text-xl font-semibold text-white/60">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-white/40">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 rounded-lg bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20"
        >
          Try again
        </button>
      )}
    </div>
  )
}
