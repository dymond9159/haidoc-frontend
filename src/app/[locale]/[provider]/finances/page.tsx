"use client"

import { NavigationCard } from "@/components/cards"
import { DollarDocIcon, InvoiceDocIcon, InvoiceLeftImageIcon, InvoiceRightImageIcon } from "@/components/icons"
import { ReceiptsTable } from "@/components/provider/finances/receipts-table"
import { useMobile } from "@/hooks/use-mobile"
import { ThemeColor } from "@/lib/constants"
import { useTranslations } from "next-intl"

export default function FinancesPage() {
  const t = useTranslations("pages.provider.finances")
  const isMobile = useMobile()

  const config = [
    {
      title: t("invoices.title"),
      href: "/professional/finances/invoices",
      icon: <DollarDocIcon fill={ThemeColor.secondary[11]} />,
      illustration: <InvoiceLeftImageIcon size={isMobile ? "80" : "140"} />,
    },
    {
      title: t("receipts.title"),
      href: "/professional/finances/receipts",
      icon: <InvoiceDocIcon fill={ThemeColor.secondary[11]} />,
      illustration: <InvoiceRightImageIcon size={isMobile ? "80" : "140"} />,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {config?.map((item, index) => (
          <NavigationCard
            key={index}
            title={item.title}
            icon={item.icon}
            illustration={item.illustration}
            href={item.href}
            className="!pb-0 !pt-0"
          />
        ))}
      </div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">{t("lastReceipts")}</h3>
      </div>
      <ReceiptsTable filterable={false} maxRecords={5} viewMore />
    </div>
  )
}
