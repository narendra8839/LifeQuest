import { redirect } from "next/navigation"

/**
 * Root route — redirects authenticated users to the dashboard,
 * unauthenticated users are handled by the middleware redirect to /login.
 */
export default function RootPage() {
  redirect("/dashboard")
}
