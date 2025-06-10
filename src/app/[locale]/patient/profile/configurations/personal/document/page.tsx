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
import { useTranslations } from "next-intl"
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
  const t = useTranslations("pages.provider.profile.configurations")
  const tForm = useTranslations("form")
  const tCta = useTranslations("cta")
  const tModal = useTranslations("modal")

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
          <h3 className="text-lg font-medium text-secondary">{t("label.document.subTitle1")}</h3>
          <DocumentList documents={mockDocuments} />
        </div>
      </Card>
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-secondary">{t("label.document.subTitle2")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2 col-span-1 md:col-span-3">
              <Label htmlFor="street" className="text-xs">
                {tForm("label.street")} <Asterisk />
              </Label>
              <Input
                id="street"
                value={formData.street}
                onChange={(e) => handleChange("street", e.target.value)}
                placeholder={tForm("placeholder.street")}
                className={errors.street ? "border-error-5" : ""}
              />
              {errors.street && <p className="text-xs text-error-5">{errors.street}</p>}
            </div>

            <div className="space-y-2 col-span-1 md:col-span-1">
              <Label htmlFor="number" className="text-xs">
                {tForm("label.number")} <Asterisk />
              </Label>
              <Input
                id="number"
                value={formData.number}
                onChange={(e) => handleChange("number", e.target.value)}
                placeholder={tForm("placeholder.number")}
                className={errors.number ? "border-error-5" : ""}
              />
              {errors.number && <p className="text-xs text-error-5">{errors.number}</p>}
            </div>

            <div className="space-y-2 col-span-1 md:col-span-2">
              <Label htmlFor="neighborhood" className="text-xs">
                {tForm("label.neighborhood")} <Asterisk />
              </Label>
              <Input
                id="neighborhood"
                value={formData.neighborhood}
                onChange={(e) => handleChange("neighborhood", e.target.value)}
                placeholder={tForm("placeholder.neighborhood")}
                className={errors.neighborhood ? "border-error-5" : ""}
              />
              {errors.neighborhood && <p className="text-xs text-error-5">{errors.neighborhood}</p>}
            </div>

            <div className="space-y-2 col-span-1 md:col-span-2">
              <Label htmlFor="city" className="text-xs">
                {tForm("label.city")} <Asterisk />
              </Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
                placeholder={tForm("placeholder.city")}
                className={errors.city ? "border-error-5" : ""}
              />
              {errors.city && <p className="text-xs text-error-5">{errors.city}</p>}
            </div>

            <div className="space-y-2 col-span-1 md:col-span-4">
              <Label htmlFor="country" className="text-xs">
                {tForm("label.country")} <Asterisk />
              </Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => handleChange("country", e.target.value)}
                placeholder={tForm("placeholder.country")}
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
            {tCta("back")}
          </Button>
        </div>
        <Button variant="default" disabled={!isFormChanged} onClick={handleSaveChanges}>
          {tCta("saveChanges")}
        </Button>
      </div>
      <ConfirmationDialog
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={confirmSaveChanges}
        title={tModal("documentSaveChangesConfirm.title")}
        description={tModal("documentSaveChangesConfirm.description")}
        confirmText={tModal("documentSaveChangesConfirm.confirmText")}
        cancelText={tModal("documentSaveChangesConfirm.cancelText")}
      />
    </div>
  )
}
