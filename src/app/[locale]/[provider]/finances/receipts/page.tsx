"use client"

import { useRouter } from "next/navigation"

import { BackButton } from "@/components/common"
import { ReceiptsTable } from "@/components/provider/finances/receipts-table"
import { useTranslations } from "next-intl"

export default function ReceiptsPage() {
  const router = useRouter()
  const t = useTranslations("pages.provider.finances.receipts")

  const handleBack = () => {
    router.back()
  }
  return (
    <div className="space-y-6">
      <BackButton text={t("cta.backButton")} onClick={handleBack} />
      <ReceiptsTable />
    </div>
  )
}
