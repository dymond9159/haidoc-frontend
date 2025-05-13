import { cn } from "@/lib/utils"
import { ChevronRightIcon } from "lucide-react"
import Link from "next/link"
import { cloneElement, isValidElement, type ReactNode } from "react"
import { Card, CardContent } from "../ui/card"

interface NavigationCardProps {
  title: string
  description?: string
  icon?: ReactNode
  illustration?: ReactNode
  href: string
  className?: string
}

export function NavigationCard({ title, description, icon, illustration, href, className }: NavigationCardProps) {
  const sizedIcon = isValidElement(icon)
    ? cloneElement(icon as React.ReactElement<any>, {
        size: 21, // Lucide or similar icon prop
        className: "w-[21px] h-[21px]",
      })
    : icon

  return (
    <Link href={href}>
      <Card
        className={cn(
          "h-full pr-0 transition-all hover:shadow-md",
          "hover:border-secondary hover:bg-secondary-2",
          className,
        )}
      >
        <CardContent className="flex items-center overflow-hidden pl-0 pr-2 group">
          <div className="flex-shrink-0 mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary-3 text-secondary">
            <div className="h-[21px] w-[21px]">{sizedIcon}</div>
          </div>
          <div className="flex-1 w-full">
            <h3 className="text-lg font-medium group-hover:text-secondary">{title}</h3>
            <p className="text-sm text-gray-500 group-hover:text-secondary">{description}</p>
          </div>
          {illustration && <div className="flex-shrink-0 w-[150px] sm:w-[200px] md:w-[250px]">{illustration}</div>}
          <ChevronRightIcon size={20} className="group-hover:text-secondary" />
        </CardContent>
      </Card>
    </Link>
  )
}
