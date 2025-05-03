"use client"

import { PatientPlanForm } from "./patient-plan-form"

interface BusinessPlanFormProps {
  initialData: any
  onSubmit: (data: any) => void
  onBack: () => void
}

export function BusinessPlanForm({
  initialData,
  onSubmit,
  onBack,
}: BusinessPlanFormProps) {
  return (
    <PatientPlanForm
      initialData={initialData}
      onSubmit={onSubmit}
      onBack={onBack}
    />
  )
}
