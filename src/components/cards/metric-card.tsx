import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type React from "react"

interface MetricCardProps {
  title: string
  value: number
  icon?: React.ReactNode
  action?: React.ReactNode
  className?: string
  reverse?: boolean
}

export function MetricCard({ title, value, icon, action, className, reverse = false }: MetricCardProps) {
  return (
    <Card className={cn("p-3 sm:p-4 md:p-6", className)}>
      <CardContent className={cn("flex items-center gap-6", reverse && "flex-row-reverse")}>
        {icon && <div className="rounded-full bg-cyan-100 p-2 text-secondary">{icon}</div>}
        <div className="space-y-2 sm:space-y-3 md:space-y-4">
          <p className="text-2xl font-bold text-secondary">{value}</p>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">{title}</p>
            {action && action}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
