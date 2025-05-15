import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react"

interface CancelConfirmModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onCancel: () => void
  onConfirm: (reason: string) => void
}

export function CancelConfirmModal({ isOpen, onOpenChange, onCancel, onConfirm }: CancelConfirmModalProps) {
  const [reason, setReason] = useState("")
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Você realmente deseja Cancelar essa Consulta?</DialogTitle>
          <DialogDescription>Escreva o motivo da recusa do cancelamento para o paciente</DialogDescription>
        </DialogHeader>
        <div>
          <textarea
            className="w-full border border-system-5 rounded-md p-2 text-sm resize-none"
            rows={4}
            placeholder="Digite aqui"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={() => onConfirm(reason)}>
            Enviar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
