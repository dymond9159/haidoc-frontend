"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import React from "react"

export type AuthorizationRequestType = "medical" | "documents"

interface AuthorizationRequestDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  requestType: AuthorizationRequestType
  patientName: string
  onConfirm: (type: AuthorizationRequestType) => void
  currentDate: string
}

export const AuthorizationRequestDialog: React.FC<
  AuthorizationRequestDialogProps
> = ({ open, onOpenChange, requestType, onConfirm, currentDate }) => {
  const titleText = "Nome da Operação:"
  const descriptionText =
    requestType === "medical"
      ? `Solicitação de Autorização para Acesso de Histórico Médico do Paciente`
      : `Solicitação de Autorização para Acesso de Documentos Anexados do Paciente`

  const handleConfirm = () => {
    onConfirm(requestType)
    // Note: Closing the dialog is handled by the onConfirm function
    // in the parent component (which calls handleSendRequest -> setShow...Modal(false))
    // Alternatively, you could call onOpenChange(false) here as well,
    // but letting the parent handle it after the action (like showing a toast) is common.
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{titleText}</DialogTitle>
          {/* <DialogDescription className="text-md font-medium text-foreground">
            {patientName}
          </DialogDescription> */}
        </DialogHeader>

        <div className="space-y-4 pb-4">
          {/* Add patient name for better context */}
          <p className="font-medium">{descriptionText}</p>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Data:</p>
            <p>{currentDate}</p>
          </div>
          {/* Optional: Add a section explaining why access is needed */}
          {/* <div>
             <Label htmlFor="reason">Motivo (Opcional):</Label>
             <Textarea id="reason" placeholder="Explique brevemente o motivo da solicitação..." />
           </div> */}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleConfirm}>Enviar Solicitação</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
