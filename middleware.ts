import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  // This is a placeholder for middleware logic
  // You can implement authentication checks, redirects, etc.
  // without relying on next-auth
  const headers = new Headers(request.headers)
  headers.set("x-next-url", request.nextUrl.pathname)
  return NextResponse.next({ headers })
}

export const config = {
  // Add paths that should be protected by middleware
  // For example: '/dashboard/:path*', '/api/:path*'
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
