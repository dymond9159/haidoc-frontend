"use client"

import { TaxesTable } from "@/components/admin/taxes/taxes-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useRouter } from "nextjs-toploader/app"

export default function TaxasPage() {
  const router = useRouter()

  return (
    <div className="space-y-1">
      <div className="flex justify-between">
        <div></div>
        <Button onClick={() => router.push("/admin/taxes/new")}>
          <Plus size={18} />
          Nova taxa
        </Button>
      </div>
      <TaxesTable />
    </div>
  )
}
