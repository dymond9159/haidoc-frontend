import type { ReactNode } from "react"

interface AuthLayoutProps {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="auth-layout">
      <div className="flex min-h-screen items-center justify-center bg-system-2">
        {children}
      </div>
    </div>
  )
}
