import { HistoryIcon } from "lucide-react"

import { MessageSquareTextIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { RequestConsultationColumns } from "@/types/provider/professional/interface-columns"
import { CheckIcon, X } from "lucide-react"

interface RequestConsultationActionsProps {
  consultation?: RequestConsultationColumns
}

export const RequestConsultationActions = ({ consultation }: RequestConsultationActionsProps) => {
  return (
    <div className="flex items-center gap-1 justify-center">
      <Button variant="outline" colorVariant="success" size="icon" className="size-8 rounded-full" title="Aceitar">
        <CheckIcon />
        <span className="sr-only">Aceitar</span>
      </Button>
      <Button variant="outline" colorVariant="error" size="icon" className="size-8 rounded-full" title="Recusar">
        <X />
        <span className="sr-only">Recusar</span>
      </Button>
      <Button variant="outline" colorVariant="default" size="icon" className="size-8 rounded-full" title="Chat">
        <MessageSquareTextIcon />
        <span className="sr-only">Chat</span>
      </Button>
      <Button variant="outline" colorVariant="info" size="icon" className="size-8 rounded-full" title="Reagendar">
        <HistoryIcon />
        <span className="sr-only">Reagendar</span>
      </Button>
    </div>
  )
}
