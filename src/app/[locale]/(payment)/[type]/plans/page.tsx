"use client"

import { PatientPlans } from "@/components/plans/patient-plans"
import { ProviderPlans } from "@/components/plans/provider-plans"
import { AccountType } from "@/types"
import { useParams } from "next/navigation"
import { useMemo } from "react"

export default function PlansPage() {
  const params = useParams()

  const planPage = useMemo(() => {
    switch (params.type) {
      case AccountType.Patient:
        return <PatientPlans />
      case AccountType.Provider:
        return <ProviderPlans />
      default:
        return <PatientPlans />
    }
  }, [params.type])

  return planPage
}
