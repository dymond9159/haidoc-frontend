"use client"

import { BackButton } from "@/components/common"
import { InvoiceTable } from "@/components/provider/finances/invoices-table"
import { useRouter } from "next/navigation"

export default function InvoicesPage() {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }
  return (
    <div className="space-y-6">
      <BackButton text="Faturas" onClick={handleBack} />
      <InvoiceTable />
    </div>
  )
}
