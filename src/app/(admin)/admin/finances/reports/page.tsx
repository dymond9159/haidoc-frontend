"use client"

import { NavigationCard } from "@/components/admin"
import { BackButton } from "@/components/common"
import { DollarDocIcon, InvoiceDocIcon, InvoiceLeftImageIcon, InvoiceRightImageIcon } from "@/components/icons"
import { ThemeColor } from "@/lib/constants"
import { useRouter } from "nextjs-toploader/app"

const config = [
  {
    title: "Faturas",
    href: "/admin/finances/reports/invoices",
    icon: <DollarDocIcon fill={ThemeColor.secondary[11]} />,
    illustration: <InvoiceLeftImageIcon />,
  },
  {
    title: "Recibos",
    href: "/admin/finances/reports/receipts",
    icon: <InvoiceDocIcon fill={ThemeColor.secondary[11]} />,
    illustration: <InvoiceRightImageIcon />,
  },
]

export default function ReportsPage() {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }
  return (
    <div className="space-y-6">
      <BackButton text="Relatórios contábeis" onClick={handleBack} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {config?.map((item, index) => (
          <NavigationCard
            key={index}
            title={item.title}
            icon={item.icon}
            illustration={item.illustration}
            href={item.href}
            className="pb-0 pt-0"
          />
        ))}
      </div>
    </div>
  )
}
