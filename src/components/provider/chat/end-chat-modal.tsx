"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface EndChatModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function EndChatModal({ isOpen, onClose, onConfirm }: EndChatModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Realmente deseja finalizar a consulta?</DialogTitle>
        </DialogHeader>
        <DialogDescription>Essa ação não poderá ser desfeita.</DialogDescription>
        <DialogFooter className="flex justify-between sm:justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={onConfirm}>Finalizar consulta</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
