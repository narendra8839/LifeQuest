interface EmptyStateProps {
  icon?: string
  title: string
  description?: string
  action?: React.ReactNode
}

/** EmptyState — shown when a list/grid has no items. */
export function EmptyState({ icon = "inbox", title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <span className="material-symbols-rounded mb-4 text-[48px] text-white/20">{icon}</span>
      <h3 className="font-display text-xl font-semibold text-white/60">{title}</h3>
      {description && <p className="mt-2 max-w-sm text-sm text-white/40">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
