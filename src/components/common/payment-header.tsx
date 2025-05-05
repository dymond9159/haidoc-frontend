"use client"

import { Logo } from "../logo"

export function PaymentHeader() {
  const homeLink = "/"

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between bg-white px-4">
      <Logo size="md" href={homeLink} />
    </header>
  )
}
