"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ApplicationStatsProps {
  className?: string
}

export function ApplicationStats({ className }: ApplicationStatsProps) {
  // Mock data for application counts
  const stats = [
    { label: "Pendentes", count: 10, value: "pending", color: "info-4" },
    { label: "Aprovadas", count: 108, value: "approved", color: "success-4" },
    { label: "Reprovadas", count: 5, value: "rejected", color: "error-4" },
    { label: "Canceladas", count: 12, value: "canceled", color: "warning-4" },
  ]

  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 md:grid-cols-4", className)}>
      {stats.map((stat) => (
        <Card
          key={stat.value}
          className={cn("flex-1 border")}
          style={{ borderColor: `var(--${stat.color})` }}
        >
          <h3 className="text-sm font-medium text-system-11">{stat.label}</h3>
          <p className="text-3xl font-bold">{stat.count}</p>
        </Card>
      ))}
    </div>
  )
}
