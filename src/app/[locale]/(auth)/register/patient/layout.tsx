"use client"

import { RegistrationSteps } from "@/components/auth/registration-step"
import { useRoutes } from "@/hooks/use-localized-routes"
import { AccountType } from "@/types"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

export default function PatientRegistrationLayout({ children }: { children: ReactNode }) {
  const t = useTranslations("pages.auth.register.steps")
  const routes = useRoutes()

  const registrationSteps = [
    { id: "basic", number: 1, title: t("basic"), path: routes.basicData(AccountType.Patient) },
    { id: "personal", number: 2, title: t("personal"), path: routes.personalInformation(AccountType.Patient) },
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
