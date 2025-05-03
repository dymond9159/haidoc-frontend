"use client"

import type { IconName } from "@/components/icons/icons"
import { Icon } from "@/components/icons/icons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  description?: string
  icon?: IconName
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export function StatCard({ title, value, description, icon, trend, className }: StatCardProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && (
          <div className="rounded-md bg-primary-2 p-2 text-primary-9">
            <Icon name={icon} className="h-4 w-4" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-system-10">{description}</p>}
        {trend && (
          <div className="mt-2 flex items-center text-xs">
            <Icon
              name={trend.isPositive ? "chevron-up" : "chevron-down"}
              className={cn("mr-1 h-3 w-3", {
                "text-success-6": trend.isPositive,
                "text-error-5": !trend.isPositive,
              })}
            />
            <span
              className={cn({
                "text-success-6": trend.isPositive,
                "text-error-5": !trend.isPositive,
              })}
            >
              {trend.value}%
            </span>
            <span className="ml-1 text-system-10">from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
