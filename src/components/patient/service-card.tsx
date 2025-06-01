import Link from "next/link"
import type React from "react"

interface ServiceCardProps {
  title: string
  icon: React.ComponentType<{ className?: string }>
  href: string
}

export function ServiceCard({ title, icon: Icon, href }: ServiceCardProps) {
  return (
    <Link href={href} className="flex flex-col items-center gap-3 p-6 rounded-lg hover:bg-system-3 transition-colors">
      <div className="w-12 h-12 rounded-full bg-haidoc-lightBlue flex items-center justify-center">
        <Icon className="w-6 h-6 text-haidoc-blue" />
      </div>
      <span className="text-sm font-medium text-center">{title}</span>
    </Link>
  )
}
