"use client"

import { LegalLayout } from "@/components/layouts/legal-layout"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

interface LegalPageLayoutProps {
  children: ReactNode
}

const LegalPageTitles = {
  "terms-of-service": "Terms of Service",
  "privacy-policy": "Privacy Policy",
  "cookie-policy": "Cookie Policy",
}

export default function LegalPageLayout({ children }: LegalPageLayoutProps) {
  const pathname = usePathname()
  const titleKey = pathname.split("/").pop() ?? "Legal"

  const title = LegalPageTitles[titleKey as keyof typeof LegalPageTitles]

  const lastUpdated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <LegalLayout title={title} lastUpdated={lastUpdated}>
      {children}
    </LegalLayout>
  )
}
