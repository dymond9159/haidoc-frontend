import { Logo } from "@/components/logo"
import type React from "react"

export default function PaymentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-4">
        <div className="py-4">
          <Logo />
        </div>
        <main>{children}</main>
      </div>
    </div>
  )
}
