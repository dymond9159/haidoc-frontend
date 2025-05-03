"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { CheckCircle, Plus } from "lucide-react"

interface DocumentRequest {
  type: string
  description: string
}

interface RequestDocumentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (documents: DocumentRequest[]) => void
  businessName: string
}

export function RequestDocumentDialog({
  open,
  onOpenChange,
  onSubmit,
}: RequestDocumentDialogProps) {
  const [documents, setDocuments] = useState<DocumentRequest[]>([
    { type: "", description: "" },
  ])
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const addDocument = () => {
    setDocuments([...documents, { type: "", description: "" }])
  }

  const updateDocument = (
    index: number,
    field: keyof DocumentRequest,
    value: string,
  ) => {
    const updatedDocuments = [...documents]
    updatedDocuments[index] = { ...updatedDocuments[index], [field]: value }
    setDocuments(updatedDocuments)

    // Clear error for this field if it exists
    if (errors[`${index}-${field}`]) {
      const newErrors = { ...errors }
      delete newErrors[`${index}-${field}`]
      setErrors(newErrors)
    }
  }

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {}
    let isValid = true

    documents.forEach((doc, index) => {
      if (!doc.type.trim()) {
        newErrors[`${index}-type`] = "Tipo de documento é obrigatório"
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = () => {
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)

      // After showing success message, close dialog and call onSubmit
      setTimeout(() => {
        onSubmit(documents)
        setDocuments([{ type: "", description: "" }])
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
            <DialogTitle>Documento adicional</DialogTitle>

            <div className="space-y-6">
              {documents.map((doc, index) => (
                <div key={index} className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor={`doc-type-${index}`}
                      className="block text-sm font-medium"
                    >
                      Tipo de documento<span className="text-red-500">*</span>
                    </label>
                    <Input
                      id={`doc-type-${index}`}
                      placeholder="Digite aqui"
                      value={doc.type}
                      onChange={(e) =>
                        updateDocument(index, "type", e.target.value)
                      }
                      className={`border ${errors[`${index}-type`] ? "border-red-500" : "border-gray-200"} rounded-md`}
                      maxLength={255}
                    />
                    {errors[`${index}-type`] && (
                      <p className="text-xs text-red-500">
                        {errors[`${index}-type`]}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor={`doc-desc-${index}`}
                      className="block text-sm font-medium"
                    >
                      Descrição
                    </label>
                    <Textarea
                      id={`doc-desc-${index}`}
                      placeholder="Digite aqui"
                      value={doc.description}
                      onChange={(e) =>
                        updateDocument(index, "description", e.target.value)
                      }
                      className="min-h-[80px] border border-gray-200 rounded-md"
                    />
                  </div>
                </div>
              ))}

              {documents.length < 5 && (
                <Button type="button" variant="link" onClick={addDocument}>
                  <Plus className="h-4 w-4" />
                  <span>Adicionar documento</span>
                </Button>
              )}
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Processando..." : "Enviar solicitação"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
