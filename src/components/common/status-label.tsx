"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { statusColorMap } from "@/types/admin/status-color-map"

interface StatusLabelProps<T> {
  status: T
  icon?: React.ReactNode
  className?: string
}

export function StatusLabel<T>({
  status,
  icon,
  className,
}: StatusLabelProps<T>) {
  const statusSpecificClasses =
    statusColorMap[status as string] ?? "bg-system-2 text-system-11"

  return (
    <Badge
      className={cn(
        "w-fit transition-colors duration-150 flex items-center gap-2 mx-auto",
        statusSpecificClasses,
        className,
      )}
    >
      {icon && icon}
      {status as string}
    </Badge>
  )
}
