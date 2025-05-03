"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

interface SuspendApplicationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (reason: string, documentType: string) => void
  businessName: string
}

export function SuspendApplicationDialog({
  open,
  onOpenChange,
  onConfirm,
}: SuspendApplicationDialogProps) {
  const [reason, setReason] = useState("")
  const [documentType, setDocumentType] = useState("")
  const [errors, setErrors] = useState<{
    reason?: string
    documentType?: string
  }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const validateForm = () => {
    const newErrors: { reason?: string; documentType?: string } = {}
    let isValid = true

    if (!reason.trim()) {
      newErrors.reason = "O motivo da suspensão é obrigatório"
      isValid = false
    }

    if (!documentType.trim()) {
      newErrors.documentType = "O tipo de documento é obrigatório"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleConfirm = () => {
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)

      // After showing success message, close dialog and call onConfirm
      setTimeout(() => {
        onConfirm(reason, documentType)
        setReason("")
        setDocumentType("")
        setErrors({})
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
      <DialogContent className="p-0 border border-purple-200 max-w-md">
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
              Você realmente deseja suspender esta aplicação?
            </DialogTitle>
            <DialogDescription>
              Informe o motivo da suspensão e qual documento é necessário que o
              usuário envie.
            </DialogDescription>

            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="suspension-reason"
                  className="block text-sm font-medium"
                >
                  Motivo da suspensão<span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="suspension-reason"
                  placeholder="Digite aqui"
                  value={reason}
                  onChange={(e) => {
                    setReason(e.target.value)
                    if (errors.reason)
                      setErrors({ ...errors, reason: undefined })
                  }}
                  className={`min-h-[120px] border ${
                    errors.reason ? "border-red-500" : "border-purple-200"
                  } rounded-md`}
                  maxLength={5000}
                />
                {errors.reason && (
                  <p className="text-xs text-red-500">{errors.reason}</p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="document-type"
                  className="block text-sm font-medium"
                >
                  Tipo de documento<span className="text-red-500">*</span>
                </label>
                <Input
                  id="document-type"
                  placeholder="Digite aqui"
                  value={documentType}
                  onChange={(e) => {
                    setDocumentType(e.target.value)
                    if (errors.documentType)
                      setErrors({ ...errors, documentType: undefined })
                  }}
                  className={`border ${errors.documentType ? "border-red-500" : "border-purple-200"} rounded-md`}
                  maxLength={255}
                />
                {errors.documentType && (
                  <p className="text-xs text-red-500">{errors.documentType}</p>
                )}
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
                {isSubmitting ? "Processando..." : "Suspender aplicação"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
