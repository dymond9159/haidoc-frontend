import { HistoryIcon } from "lucide-react"

import { MessageSquareTextIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { RequestConsultationColumns } from "@/types/provider/professional/interface-columns"
import { CheckIcon, X } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRouter } from "nextjs-toploader/app"
import { useState } from "react"
import { CancelConfirmModal } from "./cancel-confirm-modal"

interface RequestConsultationActionsProps {
  consultation?: RequestConsultationColumns
}

export const RequestConsultationActions = ({ consultation }: RequestConsultationActionsProps) => {
  const router = useRouter()
  const t = useTranslations("pages.provider.consultation.consultationHome")
  const { toast } = useToast()
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)

  const handleAcceptConsultation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    toast({
      title: "Sucesso",
      description: "A consulta foi aceita com sucesso",
    })
  }

  const handleRejectConsultation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setShowCancelConfirm(true)
  }

  const handleMoveChatting = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    router.push(`/professional/chat?id=${consultation?.id}`)
  }

  const handleReschedule = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    router.push(`/professional/consultations/details/reschedule/${consultation?.id}`)
  }

  const handleCancelDialog = () => {
    setShowCancelConfirm(false)
  }

  const handleConfirmCancel = () => {
    toast({
      title: "Sucesso",
      description: "A consulta foi recusada com sucesso",
    })
    setShowCancelConfirm(false)
  }

  return (
    <div className="flex items-center gap-1 justify-center">
      <Button
        variant="outline"
        colorVariant="success"
        size="icon"
        className="size-8 rounded-full"
        title="Aceitar"
        onClick={handleAcceptConsultation}
      >
        <CheckIcon />
        <span className="sr-only">Aceitar</span>
      </Button>
      <Button
        variant="outline"
        colorVariant="error"
        size="icon"
        className="size-8 rounded-full"
        title="Recusar"
        onClick={handleRejectConsultation}
      >
        <X />
        <span className="sr-only">Recusar</span>
      </Button>
      <Button
        variant="outline"
        colorVariant="default"
        size="icon"
        className="size-8 rounded-full"
        title="Chat"
        onClick={handleMoveChatting}
      >
        <MessageSquareTextIcon />
        <span className="sr-only">Chat</span>
      </Button>
      <Button
        variant="outline"
        colorVariant="info"
        size="icon"
        className="size-8 rounded-full"
        title="Reagendar"
        onClick={handleReschedule}
      >
        <HistoryIcon />
        <span className="sr-only">Reagendar</span>
      </Button>
      <CancelConfirmModal
        isOpen={showCancelConfirm}
        onOpenChange={setShowCancelConfirm}
        onCancel={handleCancelDialog}
        onConfirm={handleConfirmCancel}
        title={t("cancelConfirm.title")}
        description={t("cancelConfirm.description")}
      />
    </div>
  )
}
