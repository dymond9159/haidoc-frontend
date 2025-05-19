"use client"

import { FeatureItem } from "@/components/cards"
import { ConfirmationModal } from "@/components/provider/payments/confirmation-modal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { PlanType } from "@/types"
import { useRouter } from "nextjs-toploader/app"
import { useState } from "react"

const currentPlan = {
  type: PlanType.Business,
  title: "HaiDoc Business",
  price: "GRATUITO",
  features: [
    "Conta gratuita",
    "Saque de fundos mensal após dedução de taxas",
    "Acesso a serviços de business na plataforma",
    "Ferramentas básicas de gerenciamento de agendamentos (consultas, marcações, etc.)",
  ],
}

export default function MySignatureConfigurationsPage() {
  const { toast } = useToast()
  const router = useRouter()

  const [isCancelSignatureModalOpen, setIsCancelSignatureModalOpen] = useState(false)
  const [isCancelSignatureWithPasswordModalOpen, setIsCancelSignatureWithPasswordModalOpen] = useState(false)

  const [isRemoveRecurrenceModalOpen, setIsRemoveRecurrenceModalOpen] = useState(false)
  const [isRemoveRecurrenceWithPasswordModalOpen, setIsRemoveRecurrenceWithPasswordModalOpen] = useState(false)

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
      <h3 className="text-lg font-semibold text-secondary">Minha assinatura</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Card className="flex flex-col bg-white rounded-lg max-w-[320px] md:w-full md:h-fit border-secondary">
            <CardHeader className="px-0 relative">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-secondary">{currentPlan.title}</h3>
                <Badge variant="secondary" className="w-fit text-xs">
                  {"PLANO ATUAL"}
                </Badge>
              </div>
              {currentPlan.price == "GRATUITO" && (
                <div className={cn("mt-2 text-xl font-bold text-primary")}>{"GRATUITO"}</div>
              )}
              {currentPlan.price !== "GRATUITO" && (
                <div className={cn("mt-2 text-xl font-bold")}>{currentPlan.price}</div>
              )}
            </CardHeader>
            <CardContent className="space-y-3 px-0">
              <div className="space-y-3">
                {currentPlan.features.map((feature, index) => (
                  <FeatureItem key={index} text={feature} />
                ))}
              </div>

              <div className="mt-auto pt-6 space-y-4">
                <Button variant="outline-destructive" onClick={handleCancelSignature} className="w-full">
                  Cancelar assinatura
                </Button>
                <Button variant="ghost-destructive" onClick={handleRemoveRecurrence} className="w-full">
                  Remover recorrência
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="max-w-md space-y-4 bg-muted/50 border border-muted">
            <h4 className="text-xl font-semibold text-secondary">Faça um upgrade</h4>
            <p className="text-sm text-muted-foreground">
              Eleve seu negócio a um novo patamar! Faça um upgrade e acesse ferramentas avançadas para otimizar seus
              serviços e alcançar mais clientes.
            </p>
            <Button onClick={() => router.push("/plans")}>Conhecer os planos</Button>
          </Card>
        </div>
      </div>
      <div>
        <ConfirmationModal
          isOpen={isCancelSignatureModalOpen}
          onClose={closeModals}
          onConfirm={handleCancelSignatureInitiate}
          title="Cancelar assinatura?"
          description="Seu plano continuará ativo até 20/08. Após essa data, você não terá mais acesso ao serviço."
          confirmText="Remover recorrência"
        />

        <ConfirmationModal
          isOpen={isCancelSignatureWithPasswordModalOpen}
          onClose={closeModals}
          onConfirm={handleConfirmCancelSignature}
          title="Confirmação de cancelamento"
          description="Digite sua senha para confirmar o cancelamento do seu plano."
          confirmText="Enviar"
          showPasswordConfirmation={true}
        />

        <ConfirmationModal
          isOpen={isRemoveRecurrenceModalOpen}
          onClose={closeModals}
          onConfirm={handleCancelRecurrenceInitiate}
          title="Remover recorrência?"
          description="Seu plano continuará ativo até 20/08. Não haverá cobranças futuras a menos que você renove manualmente."
          confirmText="Remover recorrência"
        />

        <ConfirmationModal
          isOpen={isRemoveRecurrenceWithPasswordModalOpen}
          onClose={closeModals}
          onConfirm={handleConfirmRemoveRecurrence}
          title="Confirmar remoção de recorrência"
          description="Digite sua senha para confirmar a remoção de recorrência do seu plano."
          confirmText="Enviar"
          showPasswordConfirmation={true}
        />
      </div>
    </div>
  )
}
