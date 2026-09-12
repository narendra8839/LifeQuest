import { ProtectedLayout } from "@/components/layout/ProtectedLayout"

/**
 * Protected route group layout.
 * Wraps all authenticated routes with the sidebar + header shell.
 * Actual auth checking is done in middleware.ts.
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedLayout>{children}</ProtectedLayout>
}
