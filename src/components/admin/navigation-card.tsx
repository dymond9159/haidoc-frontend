import { cloneElement, isValidElement, type ReactNode } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "../ui/card"
import { ChevronRightIcon } from "lucide-react"

interface NavigationCardProps {
  title: string
  description?: string
  icon?: ReactNode
  illustration?: ReactNode
  href: string
  className?: string
}

export function NavigationCard({
  title,
  description,
  icon,
  illustration,
  href,
  className,
}: NavigationCardProps) {
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
        <CardContent className="flex items-center overflow-hidden pl-0 md:px-3">
          <div className="flex-shrink-0 mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary-3 text-secondary">
            <div className="h-[21px] w-[21px]">{sizedIcon}</div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
          <div className="flex-shrink-0 w-[150px] sm:w-[200px] md:w-[250px]">
            {illustration}
          </div>
          <ChevronRightIcon size={20} color="var(--system-9)" />
        </CardContent>
      </Card>
    </Link>
  )
}
