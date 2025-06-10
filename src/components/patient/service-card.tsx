import Link from "next/link"
import type React from "react"

interface ServiceCardProps {
  title: string
  icon: React.ComponentType<{ className?: string }>
  href: string
}

export function ServiceCard({ title, icon: Icon, href }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="flex flex-row items-center gap-3 p-6 rounded-lg bg-secondary-1 hover:bg-secondary-2 transition-colors"
    >
      <div className="w-12 h-12 rounded-full bg-haidoc-lightBlue flex items-center justify-center">
        <Icon className="w-8 h-8 text-secondary" />
      </div>
      <span className="text-sm font-bold text-center text-secondary">{title}</span>
    </Link>
  )
}
