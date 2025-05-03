"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

interface CancelApplicationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (reason: string) => void
  businessName: string
}

export function CancelApplicationDialog({
  open,
  onOpenChange,
  onConfirm,
}: CancelApplicationDialogProps) {
  const [reason, setReason] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleConfirm = () => {
    if (!reason.trim()) {
      setError("O motivo do cancelamento é obrigatório")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)

      // After showing success message, close dialog and call onConfirm
      setTimeout(() => {
        onConfirm(reason)
        setReason("")
        setError("")
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
              Você realmente deseja cancelar esta aplicação?
            </DialogTitle>
            <DialogDescription>
              A aplicação será movida para a aba Canceladas.
            </DialogDescription>

            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="cancellation-reason"
                  className="block text-sm font-medium"
                >
                  Motivo do cancelamento<span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="cancellation-reason"
                  placeholder="Digite aqui"
                  value={reason}
                  onChange={(e) => {
                    setReason(e.target.value)
                    if (error) setError("")
                  }}
                  className={`min-h-[120px] border ${error ? "border-red-500" : "border-gray-200"} rounded-md`}
                  maxLength={5000}
                />
                {error && <p className="text-xs text-red-500">{error}</p>}
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button onClick={handleConfirm} disabled={isSubmitting}>
                {isSubmitting ? "Processando..." : "Cancelar aplicação"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
