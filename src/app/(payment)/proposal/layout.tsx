import type React from "react"

export default function ProposalLayout({ children }: { children: React.ReactNode }) {
  return <div className="w-full md:max-w-lg mx-auto px-4 md:px-0 pb-10">{children}</div>
}
