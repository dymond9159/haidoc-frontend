"use client"

import { Asterisk } from "@/components/common"
import { ConfirmationDialog } from "@/components/common/confirm-dialog"
import { Document, DocumentList } from "@/components/common/document-list"
import { Button } from "@/components/ui"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "nextjs-toploader/app"
import { useState } from "react"

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Cartão-ordem-dos-médicos.jpeg",
    type: "image",
    uploadedAt: "09/07/2024",
    url: "",
  },
  {
    id: "2",
    name: "Cartão-ordem-dos-médicos.pdf",
    type: "pdf",
    uploadedAt: "09/07/2024",
    url: "",
  },
]

export default function PersonalDocument() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    country: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [isFormChanged, setIsFormChanged] = useState(false)

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })

    // Clear error when field is edited
    if (errors[field]) {
      const newErrors = { ...errors }
      delete newErrors[field]
      setErrors(newErrors)
    }
  }

  const confirmSaveChanges = () => {
    // In a real implementation, this would save the changes to the backend
    setShowConfirmationModal(false)
    setIsFormChanged(false)

    toast({
      title: "Sucesso",
      description: "Sua ação foi realizada com sucesso!",
    })
  }

  const handleSaveChanges = () => {
    setShowConfirmationModal(true)
  }

  return (
    <div className="space-y-6">
      <Card>
        <div>
          <h3 className="text-lg font-medium text-secondary">Documentação</h3>
          <DocumentList documents={mockDocuments} />
        </div>
      </Card>
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-secondary">Endereço</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2 col-span-1 md:col-span-3">
              <Label htmlFor="street" className="text-xs">
                Rua ou avenida <Asterisk />
              </Label>
              <Input
                id="street"
                value={formData.street}
                onChange={(e) => handleChange("street", e.target.value)}
                placeholder="123 456 789"
                className={errors.street ? "border-error-5" : ""}
              />
              {errors.street && <p className="text-xs text-error-5">{errors.street}</p>}
            </div>

            <div className="space-y-2 col-span-1 md:col-span-1">
              <Label htmlFor="number" className="text-xs">
                Número <Asterisk />
              </Label>
              <Input
                id="number"
                value={formData.number}
                onChange={(e) => handleChange("number", e.target.value)}
                placeholder="123"
                className={errors.number ? "border-error-5" : ""}
              />
              {errors.number && <p className="text-xs text-error-5">{errors.number}</p>}
            </div>

            <div className="space-y-2 col-span-1 md:col-span-2">
              <Label htmlFor="neighborhood" className="text-xs">
                Bairro <Asterisk />
              </Label>
              <Input
                id="neighborhood"
                value={formData.neighborhood}
                onChange={(e) => handleChange("neighborhood", e.target.value)}
                placeholder="Polana"
                className={errors.neighborhood ? "border-error-5" : ""}
              />
              {errors.neighborhood && <p className="text-xs text-error-5">{errors.neighborhood}</p>}
            </div>

            <div className="space-y-2 col-span-1 md:col-span-2">
              <Label htmlFor="city" className="text-xs">
                Cidade <Asterisk />
              </Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
                placeholder="Maputo"
                className={errors.city ? "border-error-5" : ""}
              />
              {errors.city && <p className="text-xs text-error-5">{errors.city}</p>}
            </div>

            <div className="space-y-2 col-span-1 md:col-span-4">
              <Label htmlFor="country" className="text-xs">
                País <Asterisk />
              </Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => handleChange("country", e.target.value)}
                placeholder="Moçambique"
                className={errors.country ? "border-error-5" : ""}
              />
              {errors.country && <p className="text-xs text-error-5">{errors.country}</p>}
            </div>
          </div>
        </div>
      </Card>
      <div className="mt-6 flex justify-end gap-4">
        <div className="w-full flex items-center gap-4 justify-between">
          <Button variant="outline" className="gap-2" onClick={() => router.back()}>
            <ChevronLeft />
            Voltar
          </Button>
        </div>
        <Button variant="default" disabled={!isFormChanged} onClick={handleSaveChanges}>
          Salvar Alterações
        </Button>
      </div>
      <ConfirmationDialog
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={confirmSaveChanges}
        title="Tem certeza que deseja salvar alterações?"
        description="Garanta que todas as informações estejam corretas."
        confirmText="Sim, salvar alterações"
        cancelText="Cancelar"
      />
    </div>
  )
}
