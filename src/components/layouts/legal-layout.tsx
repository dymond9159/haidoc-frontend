import Link from "next/link"
import type React from "react"

interface LegalLayoutProps {
  title: string
  lastUpdated: string
  children: React.ReactNode
}

export function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <div className="max-w-4xl mx-auto my-12">
      <div className="bg-white p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{title}</h1>
        <p className="text-sm text-muted-foreground mb-6">Last updated: {lastUpdated}</p>

        <div className="prose prose-blue max-w-none">{children}</div>

        <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row gap-4 text-sm">
          <Link href="/privacy-policy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="text-primary hover:underline">
            Terms of Service
          </Link>
          <Link href="/cookie-policy" className="text-primary hover:underline">
            Cookie Policy
          </Link>
        </div>
      </div>
    </div>
  )
}
