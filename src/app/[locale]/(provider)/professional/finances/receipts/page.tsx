"use client"

import { useRouter } from "next/navigation"

import { BackButton } from "@/components/common"
import { ReceiptsTable } from "@/components/provider/finances/receipts-table"

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
