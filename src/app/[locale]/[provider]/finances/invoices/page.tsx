"use client"

import { BackButton } from "@/components/common"
import { InvoiceTable } from "@/components/provider/finances/invoices-table"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"

export default function InvoicesPage() {
  const router = useRouter()
  const t = useTranslations("pages.provider.finances.invoices")

  const handleBack = () => {
    router.back()
  }
  return (
    <div className="space-y-6">
      <BackButton text={t("cta.backButton")} onClick={handleBack} />
      <InvoiceTable />
    </div>
  )
}
