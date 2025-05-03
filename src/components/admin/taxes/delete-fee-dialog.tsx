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

interface DeleteFeeDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function DeleteFeeDialog({
  isOpen,
  onClose,
  onConfirm,
}: DeleteFeeDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Tem certeza que deseja excluir esta taxa?</DialogTitle>
          <DialogDescription>
            Essa ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Não excluir
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Sim, desejo excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
