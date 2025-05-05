import type React from "react"

export default function SubscriptionLayout({ children }: { children: React.ReactNode }) {
  return <div className="w-full md:max-w-lg mx-auto px-4 md:px-0">{children}</div>
}
