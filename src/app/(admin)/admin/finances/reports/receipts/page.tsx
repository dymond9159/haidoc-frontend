"use client"

import { useRouter } from "nextjs-toploader/app"

import { ReceiptsTable } from "@/components/admin/finances/receipts-table"
import { BackButton } from "@/components/common"

export default function ReceiptsPage() {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }
  return (
    <div className="space-y-6">
      <BackButton text="Recibos" onClick={handleBack} />
      <ReceiptsTable />
    </div>
  )
}
