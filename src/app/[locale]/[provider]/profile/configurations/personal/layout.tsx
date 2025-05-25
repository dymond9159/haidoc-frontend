"use client"

import { FlowSteps } from "@/components/common/flow-steps"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

export const registrationSteps = [
  { id: "basic", number: 1, title: "Dados básicos", path: "/professional/profile/configurations/personal/basic-data" },
  {
    id: "professional",
    number: 2,
    title: "Detalhes profissionais",
    path: "/professional/profile/configurations/personal/details",
  },
  {
    id: "documentation",
    number: 3,
    title: "Documentação",
    path: "/professional/profile/configurations/personal/document",
  },
]

interface ConfigrationPersonalLayoutProps {
  children: ReactNode
}

export default function ConfigrationPersonalLayout({ children }: ConfigrationPersonalLayoutProps) {
  const t = useTranslations("pages.provider.profile.configurations")
  const pathname = usePathname()
  const currentStep = registrationSteps.find((step) => pathname.includes(step.path))?.number || 1

  return (
    <div className="space-y-6">
      {currentStep === 2 && (
        <Alert variant="warning">
          <AlertDescription className="text-warning-5">
            <div>
              {t.rich("alert.personalDetails.description", {
                bold: (chunk) => <span className="font-semibold">{chunk}</span>,
              })}
            </div>
          </AlertDescription>
        </Alert>
      )}
      <FlowSteps steps={registrationSteps} currentStep={currentStep} />
      {children}
    </div>
  )
}
