"use client"

/**
 * Header — top app bar for the protected layout.
 * TODO: Replace placeholder markup with Stitch design.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/8 bg-background-secondary/80 px-4 backdrop-blur sm:px-6">
      {/* Left — page title or breadcrumb will go here */}
      <div className="flex items-center gap-3">
        {/* Mobile menu button (shown only on mobile) */}
        <button
          type="button"
          className="rounded-lg p-2 text-white/60 hover:bg-white/5 hover:text-white lg:hidden"
          aria-label="Open menu"
        >
          <span className="material-symbols-rounded">menu</span>
        </button>
      </div>

      {/* Right — notifications, user avatar, etc. */}
      <div className="flex items-center gap-3">
        {/* TODO: NotificationBell, UserAvatarMenu */}
        <div className="h-8 w-8 rounded-full bg-white/10" />
      </div>
    </header>
  )
}
