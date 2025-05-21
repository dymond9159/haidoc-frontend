"use client"

import { RegistrationSteps } from "@/components/auth/registration-step"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

export default function ProviderRegistrationLayout({ children }: { children: ReactNode }) {
  const registrationSteps = [
    { id: "basic", number: 1, title: "Dados básicos", path: "/register/provider/basic-data" },
    { id: "professional", number: 2, title: "Detalhes profissionais", path: "/register/provider/professional-details" },
    { id: "documentation", number: 3, title: "Documentação", path: "/register/provider/documentation" },
  ]

  const pathname = usePathname()
  const currentStep = registrationSteps.find((step) => pathname.includes(step.path))?.number || 1

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <RegistrationSteps steps={registrationSteps} currentStep={currentStep} />
      </div>
      {children}
    </div>
  )
}
