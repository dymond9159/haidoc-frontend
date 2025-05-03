"use client"

import { BusinessPlanForm } from "@/components/admin/finances/business-plan-form"
import { PatientPlanForm } from "@/components/admin/finances/patient-plan-form"
import { PlanTypeSelection } from "@/components/admin/finances/plan-type-selection"
import { ServicesSelectionForm } from "@/components/admin/finances/services-selection-form"
import { useRouter } from "nextjs-toploader/app"
import { useState } from "react"

type PlanType = "patient" | "business" | null

export default function NewPlanPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [planType, setPlanType] = useState<PlanType>(null)
  const [formData, setFormData] = useState({
    name: "",
    isFamily: false,
    dependents: 0,
    modality: "",
    monthlyValue: "",
    biannualValue: "",
    annualValue: "",
    benefits: "",
  })

  const handlePlanTypeSelect = (type: PlanType) => {
    setPlanType(type)
    setStep(1)
  }

  const handleInfoSubmit = (data: any) => {
    setFormData({ ...formData, ...data })
    if (planType === "patient") {
      setStep(2)
    } else {
      // For business plans, we skip the services step
      router.push("/finances/planos")
    }
  }

  const handleServicesSubmit = () => {
    // Save services data and redirect to finances page
    router.push("/finances/planos")
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
    } else {
      router.push("/finances/planos")
    }
  }
  return (
    <div className="mx-auto">
      {step === 0 && <PlanTypeSelection onSelect={handlePlanTypeSelect} onBack={handleBack} />}

      {step === 1 && planType === "patient" && (
        <PatientPlanForm initialData={formData} onSubmit={handleInfoSubmit} onBack={handleBack} stepped />
      )}

      {step === 1 && planType === "business" && (
        <BusinessPlanForm initialData={formData} onSubmit={handleInfoSubmit} onBack={handleBack} />
      )}

      {step === 2 && planType === "patient" && (
        <ServicesSelectionForm onSubmit={handleServicesSubmit} onBack={handleBack} />
      )}
    </div>
  )
}
