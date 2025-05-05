import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"

interface SectionHeaderProps {
  title: string
  viewAllLink?: string
  viewAllText?: string
  className?: string
  children?: ReactNode
}

export function SectionHeader({
  title,
  viewAllLink,
  viewAllText = "Ver todos",
  className,
  children,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between mb-4", className)}>
      <h2 className="text-lg font-medium">{title}</h2>
      <div className="flex items-center gap-2">
        {children}
        {viewAllLink && (
          <Link
            href={viewAllLink}
            className="text-primary-9 hover:text-primary-10 text-sm font-medium flex items-center gap-1"
          >
            {viewAllText}
            <ChevronRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  )
}
