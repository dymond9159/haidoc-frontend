import { RegistrationSteps } from "@/components/auth/registration-step"
import { useTranslations } from "next-intl"
import { ReactNode } from "react"

export default function ProviderRegistrationLayout({ children }: { children: ReactNode }) {
  const t = useTranslations("auth.register")

  const steps = [
    { id: "basic", number: 1, title: "Dados básicos" },
    { id: "professional", number: 2, title: "Detalhes profissionais" },
    { id: "documentation", number: 3, title: "Documentação" },
  ]

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <RegistrationSteps steps={steps} currentStep={1} />
      </div>
      {children}
    </div>
  )
}
