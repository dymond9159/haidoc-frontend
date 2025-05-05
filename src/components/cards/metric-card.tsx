import { Card, CardContent } from "@/components/ui/card"
import type React from "react"

interface MetricCardProps {
  title: string
  value: number
  icon?: React.ReactNode
  action?: React.ReactNode
}

export function MetricCard({ title, value, icon, action }: MetricCardProps) {
  return (
    <Card className="p-3 sm:p-4 md:p-6">
      <CardContent className="flex items-center">
        {icon && <div className="mr-4 rounded-full bg-cyan-100 p-2 text-secondary">{icon}</div>}
        <div className="space-y-3 sm:space-y-4 md:space-y-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">{title}</p>
            {action && action}
          </div>
          <p className="text-2xl font-bold text-secondary">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}
