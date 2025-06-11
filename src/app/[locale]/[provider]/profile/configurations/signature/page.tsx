"use client"

import { FeatureItem } from "@/components/cards"
import { ConfirmationModal } from "@/components/provider/payments/confirmation-modal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { PlanListForProvider } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { PlanTypeForProvider } from "@/types"
import { useTranslations } from "next-intl"
import { useRouter } from "nextjs-toploader/app"
import { useState } from "react"

// const currentPlan = {
//   type: PlanTypeForProvider.Business,
//   title: "HaiDoc Business",
//   price: "GRATUITO",
//   features: [
//     "Conta gratuita",
//     "Saque de fundos mensal após dedução de taxas",
//     "Acesso a serviços de business na plataforma",
//     "Ferramentas básicas de gerenciamento de agendamentos (consultas, marcações, etc.)",
//   ],
// }

export default function MySignatureConfigurationsPage() {
  const { toast } = useToast()
  const router = useRouter()
  const t = useTranslations("pages.provider.profile.configurations")
  const tPlans = useTranslations()
  const tModal = useTranslations("modal")

  const [isCancelSignatureModalOpen, setIsCancelSignatureModalOpen] = useState(false)
  const [isCancelSignatureWithPasswordModalOpen, setIsCancelSignatureWithPasswordModalOpen] = useState(false)

  const [isRemoveRecurrenceModalOpen, setIsRemoveRecurrenceModalOpen] = useState(false)
  const [isRemoveRecurrenceWithPasswordModalOpen, setIsRemoveRecurrenceWithPasswordModalOpen] = useState(false)

  const currentPlanTypeForProvider = PlanTypeForProvider.Business
  const currentPlan = PlanListForProvider.find((plan) => plan.type === currentPlanTypeForProvider)

  // Cancel signature
  const handleCancelSignature = () => {
    setIsCancelSignatureModalOpen(true)
  }

  const handleCancelSignatureInitiate = () => {
    setIsCancelSignatureModalOpen(false)
    setIsCancelSignatureWithPasswordModalOpen(true)
  }

  const handleConfirmCancelSignature = () => {
    toast({
      title: "Assinatura cancelada com sucesso",
      description: "Sua assinatura foi cancelada com sucesso. Você não terá mais acesso ao serviço.",
    })
    closeModals()
  }

  // Remove recurrence

  const handleRemoveRecurrence = () => {
    setIsRemoveRecurrenceModalOpen(true)
  }

  const handleCancelRecurrenceInitiate = () => {
    setIsRemoveRecurrenceModalOpen(false)
    setIsRemoveRecurrenceWithPasswordModalOpen(true)
  }

  const handleConfirmRemoveRecurrence = () => {
    toast({
      title: "Recorrência removida com sucesso",
      description: "Sua recorrência foi removida com sucesso. Você não terá mais acesso ao serviço.",
    })
    closeModals()
  }

  const closeModals = () => {
    setIsCancelSignatureModalOpen(false)
    setIsCancelSignatureWithPasswordModalOpen(false)

    setIsRemoveRecurrenceModalOpen(false)
    setIsRemoveRecurrenceWithPasswordModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-secondary">{t("label.signature.title")}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentPlan && (
          <div>
            <Card className="flex flex-col bg-white rounded-lg max-w-[320px] md:w-full md:h-fit border-secondary">
              <CardHeader className="px-0 relative">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-secondary">{tPlans(currentPlan.titleKey)}</h3>
                  <Badge variant="secondary" className="w-fit text-xs">
                    {"PLANO ATUAL"}
                  </Badge>
                </div>
                {tPlans(currentPlan?.priceKey) == tPlans("pages.plans.free") && (
                  <div className={cn("mt-2 text-xl font-bold text-primary")}>{tPlans("pages.plans.free")}</div>
                )}
                {tPlans(currentPlan?.priceKey) !== tPlans("pages.plans.free") && (
                  <div className={cn("mt-2 text-xl font-bold")}>{tPlans(currentPlan.priceKey)}</div>
                )}
              </CardHeader>
              <CardContent className="space-y-3 px-0">
                <div className="space-y-3">
                  {currentPlan?.featuresKeys.map((feature, index) => (
                    <FeatureItem key={index} text={tPlans(feature)} type={currentPlan.type} />
                  ))}
                </div>

                <div className="mt-auto pt-6 space-y-4">
                  <Button variant="outline-destructive" onClick={handleCancelSignature} className="w-full">
                    {t("cta.cancelSignature")}
                  </Button>
                  <Button variant="ghost-destructive" onClick={handleRemoveRecurrence} className="w-full">
                    {t("cta.removeSignature")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        <div>
          <Card className="max-w-md space-y-4 bg-muted/50 border border-muted">
            <h4 className="text-xl font-semibold text-secondary">{t("label.signature.upgradeTitle")}</h4>
            <p className="text-sm text-muted-foreground">{t("label.signature.upgradeDescription")}</p>
            <Button onClick={() => router.push("/plans")}>{t("cta.knowMore")}</Button>
          </Card>
        </div>
      </div>
      <div>
        <ConfirmationModal
          isOpen={isCancelSignatureModalOpen}
          onClose={closeModals}
          onConfirm={handleCancelSignatureInitiate}
          title={tModal("signatureCancel.title")}
          description={tModal("signatureCancel.description")}
          confirmText={tModal("signatureCancel.cta.confirm")}
        />

        <ConfirmationModal
          isOpen={isCancelSignatureWithPasswordModalOpen}
          onClose={closeModals}
          onConfirm={handleConfirmCancelSignature}
          title={tModal("signatureCancelConfirm.title")}
          description={tModal("signatureCancelConfirm.description")}
          confirmText={tModal("signatureCancelConfirm.cta.confirm")}
          showPasswordConfirmation={true}
        />

        <ConfirmationModal
          isOpen={isRemoveRecurrenceModalOpen}
          onClose={closeModals}
          onConfirm={handleCancelRecurrenceInitiate}
          title={tModal("signatureRemove.title")}
          description={tModal("signatureRemove.description")}
          confirmText={tModal("signatureRemove.cta.confirm")}
        />

        <ConfirmationModal
          isOpen={isRemoveRecurrenceWithPasswordModalOpen}
          onClose={closeModals}
          onConfirm={handleConfirmRemoveRecurrence}
          title={tModal("signatureRemoveConfirm.title")}
          description={tModal("signatureRemoveConfirm.description")}
          confirmText={tModal("signatureRemoveConfirm.cta.confirm")}
          showPasswordConfirmation={true}
        />
      </div>
    </div>
  )
}
