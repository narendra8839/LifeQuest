"use client"

import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"
import { MobileNavigation } from "@/components/layout/MobileNavigation"

/**
 * ProtectedLayout — main app shell.
 * Renders the sidebar (desktop), header, and mobile bottom nav.
 * Wraps all protected route page content.
 */
export function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-1 flex-col lg:pl-64">
        <Header />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <MobileNavigation />
    </div>
  )
}
