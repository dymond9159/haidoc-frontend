"use client"

import { ThemeColor } from "@/lib/constants"
import { NavigationCard } from "../navigation-card"
import {
  DiagnosisIcon,
  DollarRightImageIcon,
  PlanRightImageIcon,
  ReceiptIcon,
} from "@/components/icons"

interface FinanceNavigationCardProps {
  type: "plans" | "reports"
  className?: string
}

export function FinanceNavigationCard({
  type,
  className,
}: FinanceNavigationCardProps) {
  const config = {
    plans: {
      title: "Planos",
      href: "/admin/finances/plans",
      icon: <DiagnosisIcon fill={ThemeColor.secondary[11]} />,
      illustration: <PlanRightImageIcon />,
    },
    reports: {
      title: "Relatórios contábeis",
      href: "/admin/finances/reports",
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
