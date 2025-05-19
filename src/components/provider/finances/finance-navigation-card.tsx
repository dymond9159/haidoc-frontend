"use client"

import { DiagnosisIcon, DollarRightImageIcon, PlanRightImageIcon, ReceiptIcon } from "@/components/icons"
import { ThemeColor } from "@/lib/constants"
import { NavigationCard } from "../navigation-card"

interface FinanceNavigationCardProps {
  type: "plans" | "reports"
  className?: string
}

export function FinanceNavigationCard({ type, className }: FinanceNavigationCardProps) {
  const config = {
    plans: {
      title: "Planos",
      href: "/provider/finances/plans",
      icon: <DiagnosisIcon fill={ThemeColor.secondary[11]} />,
      illustration: <PlanRightImageIcon />,
    },
    reports: {
      title: "Relatórios contábeis",
      href: "/provider/finances/reports",
      icon: <ReceiptIcon fill={ThemeColor.secondary[11]} />,
      illustration: <DollarRightImageIcon />,
    },
  }

  const cardConfig = config[type]

  return (
    <NavigationCard
      title={cardConfig.title}
      icon={cardConfig.icon}
      illustration={cardConfig.illustration}
      href={cardConfig.href}
      className={className}
    />
  )
}
