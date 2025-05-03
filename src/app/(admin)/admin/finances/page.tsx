"use client"

import { NavigationCard } from "@/components/admin"
import { InvoiceTable } from "@/components/admin/finances/invoices-table"
import { StatCard } from "@/components/common"
import {
  DiagnosisIcon,
  DollarRightImageIcon,
  PlanRightImageIcon,
  ReceiptIcon,
} from "@/components/icons"
import { ThemeColor } from "@/lib/constants"
import { UserRoundPlusIcon } from "lucide-react"

const config = [
  {
    title: "Planos",
    href: "/admin/finances/plans",
    icon: <DiagnosisIcon fill={ThemeColor.secondary[11]} />,
    illustration: <PlanRightImageIcon />,
  },
  {
    title: "Relatórios contábeis",
    href: "/admin/finances/reports",
    icon: <ReceiptIcon fill={ThemeColor.secondary[11]} />,
    illustration: <DollarRightImageIcon />,
  },
]

export default function FinancesPage() {
  return (
    <div className="space-y-8">
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
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Usuários por plano</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard
            title="Individual"
            icon={<UserRoundPlusIcon />}
            value={475}
            trend={20}
          />
          <StatCard
            title="HaiPatient"
            icon={<UserRoundPlusIcon />}
            value={127}
            trend={20}
          />
          <StatCard
            title="HaiCompany"
            icon={<UserRoundPlusIcon />}
            value={75}
            trend={0}
          />
          <StatCard
            title="HaiFamily"
            icon={<UserRoundPlusIcon />}
            value={108}
            trend={-6}
          />
        </div>
      </div>

      {/* <DeliveryTable /> */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Últimas faturas</h3>
        </div>
        <InvoiceTable filterable={false} maxRecords={3} viewMore />
      </div>
    </div>
  )
}
