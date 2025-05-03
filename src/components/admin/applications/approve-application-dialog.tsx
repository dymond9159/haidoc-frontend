"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

interface ApproveApplicationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  businessName: string
}

export function ApproveApplicationDialog({
  open,
  onOpenChange,
  onConfirm,
}: ApproveApplicationDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleConfirm = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)

      // After showing success message, close dialog and call onConfirm
      setTimeout(() => {
        onConfirm()
        setShowSuccess(false)
        onOpenChange(false)
      }, 1500)
    }, 500)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!isSubmitting && !showSuccess) {
          onOpenChange(open)
        }
      }}
    >
      <DialogContent className="p-0 border border-gray-200 max-w-md">
        {showSuccess ? (
          <div className="p-6 flex flex-col items-center justify-center">
            <div className="bg-green-50 rounded-full p-2 mb-2">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            <h3 className="text-base font-medium text-center">Sucesso</h3>
            <p className="text-sm text-center text-gray-600">
              Sua ação foi realizada com sucesso!
            </p>
          </div>
        ) : (
          <div className="p-6">
            <DialogTitle>
              Você realmente deseja aprovar esta aplicação?{" "}
            </DialogTitle>
            <DialogDescription>
              A aplicação será movida para a aba Aprovados.
            </DialogDescription>
            <div className="flex justify-end gap-4 mt-6">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button onClick={handleConfirm} disabled={isSubmitting}>
                {isSubmitting ? "Processando..." : "Aprovar"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
