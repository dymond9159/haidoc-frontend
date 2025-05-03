// app/admin/dashboard/details/page.tsx
"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { useMemo } from "react"

import { BackButton } from "@/components/common"

import { HarvestsTable } from "@/components/admin/dashboard/harvests-table"
import { OnlineConsultTable } from "@/components/admin/dashboard/online-consult-table"
import { PersonConsultTable } from "@/components/admin/dashboard/person-consult-table"
import { PharmacyDeliveriesTable } from "@/components/admin/dashboard/pharmacy-deliveries-table"
import { ProjectionTabs } from "@/components/admin/dashboard/projection-section"

export default function DashboardDetailsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mode = searchParams.get("mode") as ProjectionTabs | null // Safely get the 'mode' and type it

  const handleBack = () => {
    router.back()
  }

  const renderTable = useMemo(() => {
    switch (mode) {
      case ProjectionTabs.OnlineConsultation:
        return <OnlineConsultTable />
      case ProjectionTabs.PrecenseConsultation:
        return <PersonConsultTable />
      case ProjectionTabs.PharmacyDeliveries:
        return <PharmacyDeliveriesTable />
      case ProjectionTabs.Harvests:
        return <HarvestsTable />
      default:
        return <p className="text-sm text-muted-foreground">Página inválida</p>
    }
  }, [mode])

  return (
    <div className="space-y-6">
      <BackButton text={`${mode} Realizadas`} onClick={handleBack} />
      {renderTable}
    </div>
  )
}
