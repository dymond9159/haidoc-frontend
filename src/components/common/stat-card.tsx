"use client"

import { PerformanceIndicator } from "@/components/common/performance-indicator"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"
import { useState } from "react"

interface StatCardProps {
  title: string
  value: string | number
  icon?: ReactNode
  trend?: number
  chart?: ReactNode
  className?: string
  onClick?: () => void
  toggle?: boolean // <- optional prop to enable toggle mode
  selected?: boolean
  action?: ReactNode
}

export function StatCard({
  title,
  value,
  icon,
  trend,
  chart,
  className,
  onClick,
  toggle = false,
  selected = false,
  action,
}: StatCardProps) {
  const [showChart, setShowChart] = useState(true)

  const handleClick = () => {
    if (toggle) setShowChart((prev) => !prev)
    if (onClick) onClick()
  }

  return (
    <Card
      className={cn(
        "overflow-hidden",
        className,
        (onClick || toggle) && "cursor-pointer hover:border hover:border-secondary hover:bg-secondary-2",
        selected && "border border-secondary bg-secondary-2",
      )}
      onClick={handleClick}
    >
      <div className="flex flex-wrap gap-1 sm:gap-5 md:gap-10">
        <div className="w-full md:max-w-sm">
          <div className="w-full flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              {icon && <div className="w-4 h-4 text-system-11 flex items-center justify-center">{icon}</div>}
              <h3 className="text-sm font-medium text-system-11">{title}</h3>
            </div>
            {action && <div className="ml-auto">{action}</div>}
          </div>
          <div className="mt-2">
            <p className="text-3xl font-bold">{value}</p>
            {trend !== undefined && <PerformanceIndicator value={trend} className="mt-2" />}
          </div>
        </div>
        {chart && showChart && <div className="w-full flex-1">{chart}</div>}
      </div>
    </Card>
  )
}
