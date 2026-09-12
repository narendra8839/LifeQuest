import { NextResponse, type NextRequest } from "next/server"
import { updateSession } from "@/lib/supabase/middleware"
import { PROTECTED_ROUTES, AUTH_ROUTES, NAV_ROUTES } from "@/lib/constants"

/**
 * middleware — runs on every matching request.
 * 1. Refreshes the Supabase session cookie.
 * 2. Redirects unauthenticated users from protected routes to /login.
 * 3. Redirects authenticated users away from auth routes to /dashboard.
 */
export async function middleware(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request)
  const { pathname }               = request.nextUrl

  const isProtected = PROTECTED_ROUTES.some((r) => pathname.startsWith(r))
  const isAuthRoute = AUTH_ROUTES.some((r) => pathname.startsWith(r))

  // Unauthenticated user trying to access a protected route
  if (isProtected && !user) {
    const loginUrl = new URL(NAV_ROUTES.login, request.url)
    loginUrl.searchParams.set("redirectTo", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Authenticated user hitting a login/signup page
  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL(NAV_ROUTES.dashboard, request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static (static files)
     * - _next/image (image optimisation)
     * - favicon.ico
     * - public folder files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
