"use client"

import { Asterisk } from "@/components/common"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { LucideCheckCircle2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"

interface PrescriptionFormProps {
  onClose?: () => void
}

export function PrescriptionForm({ onClose }: PrescriptionFormProps) {
  const t = useTranslations("pages.provider.consultation.featureBar.prescription")
  const tCategory = useTranslations("form.category")
  const [medications, setMedications] = useState<any[]>([])
  const [currentMedication, setCurrentMedication] = useState({
    medicationName: "",
    quantity: "2",
    dosageUnit: "mg",
    treatmentDuration: "2",
    durationUnit: "dias",
    administrationRoute: "oral",
    pharmaceuticalForm: "Comprimidos",
    instructions: "",
    signatureAdded: true,
  })

  const handleChange = (field: string, value: any) => {
    setCurrentMedication({
      ...currentMedication,
      [field]: value,
    })
  }

  const handleAddMedication = () => {
    setMedications([...medications, { ...currentMedication, id: Date.now() }])
    setCurrentMedication({
      medicationName: "",
      quantity: "2",
      dosageUnit: "mg",
      treatmentDuration: "2",
      durationUnit: "dias",
      administrationRoute: "oral",
      pharmaceuticalForm: "Comprimidos",
      instructions: "",
      signatureAdded: true,
    })
  }

  const handleSubmit = () => {
    const allMedications = [...medications]
    if (currentMedication.medicationName) {
      allMedications.push({ ...currentMedication, id: Date.now() })
    }

    console.log("Prescription submitted:", allMedications)
    // In a real app, you would send this data to your backend
    if (onClose) onClose()
  }

  return (
    <div className="w-full h-full overflow-y-auto p-4 space-y-4">
      <div>
        <label className="text-sm font-medium mb-1 block">
          {t("medicationName")} <Asterisk />
        </label>
        <Input
          value={currentMedication.medicationName}
          onChange={(e) => handleChange("medicationName", e.target.value)}
          placeholder={t("medicationNamePlaceholder")}
        />
        <p className="text-xs text-gray-500 mt-1 ml-1">{t("medicationNameGenericName")}</p>
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">{t("dosage")}</label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">{t("quantity")}</label>
            <Select value={currentMedication.quantity} onValueChange={(value) => handleChange("quantity", value)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">{t("dosageUnit")}</label>
            <Select value={currentMedication.dosageUnit} onValueChange={(value) => handleChange("dosageUnit", value)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mg">mg</SelectItem>
                <SelectItem value="ml">ml</SelectItem>
                <SelectItem value="g">g</SelectItem>
                <SelectItem value="mcg">mcg</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">{t("treatmentDuration")}</label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">{t("quantity")}</label>
            <Select
              value={currentMedication.treatmentDuration}
              onValueChange={(value) => handleChange("treatmentDuration", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="7">7</SelectItem>
                <SelectItem value="14">14</SelectItem>
                <SelectItem value="30">30</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">{t("durationUnit")}</label>
            <Select
              value={currentMedication.durationUnit}
              onValueChange={(value) => handleChange("durationUnit", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dias">{tCategory("durationUnit.days")}</SelectItem>
                <SelectItem value="semanas">{tCategory("durationUnit.weeks")}</SelectItem>
                <SelectItem value="meses">{tCategory("durationUnit.months")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">{t("administrationRoute")}</label>
        <Select
          value={currentMedication.administrationRoute}
          onValueChange={(value) => handleChange("administrationRoute", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="oral">{tCategory("administrationRoute.oral")}</SelectItem>
            <SelectItem value="intravenosa">{tCategory("administrationRoute.intravenosa")}</SelectItem>
            <SelectItem value="intramuscular">{tCategory("administrationRoute.intramuscular")}</SelectItem>
            <SelectItem value="subcutanea">{tCategory("administrationRoute.subcutanea")}</SelectItem>
            <SelectItem value="topica">{tCategory("administrationRoute.topica")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">{t("pharmaceuticalForm")}</label>
        <Select
          value={currentMedication.pharmaceuticalForm}
          onValueChange={(value) => handleChange("pharmaceuticalForm", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Comprimidos">{tCategory("pharmaceuticalForm.tablets")}</SelectItem>
            <SelectItem value="Cápsulas">{tCategory("pharmaceuticalForm.capsules")}</SelectItem>
            <SelectItem value="Solução">{tCategory("pharmaceuticalForm.solution")}</SelectItem>
            <SelectItem value="Suspensão">{tCategory("pharmaceuticalForm.suspension")}</SelectItem>
            <SelectItem value="Pomada">{tCategory("pharmaceuticalForm.ointment")}</SelectItem>
            <SelectItem value="Creme">{tCategory("pharmaceuticalForm.cream")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">
          {t("instructions")} <Asterisk />
        </label>
        <Textarea
          value={currentMedication.instructions}
          onChange={(e) => handleChange("instructions", e.target.value)}
          placeholder="Default"
          rows={4}
        />
        <p className="text-xs text-gray-500 mt-1">{t("instructionsMaxCharacters", { chars: 1000 })}</p>
      </div>

      <Alert variant="info">
        <div>
          <AlertTitle className="flex items-center gap-2">
            <LucideCheckCircle2 className="h-6 w-6" fill="var(--info-5)" color="white" />
            {t("signatureAndStampAdded")}
          </AlertTitle>
          <AlertDescription>{t("signatureAndStampAddedDescription")}</AlertDescription>
        </div>
      </Alert>

      <div className="space-y-2 pt-4">
        <Button onClick={handleSubmit} className="w-full">
          {t("send")}
        </Button>
        <Button variant="outline" className="w-full" onClick={handleAddMedication}>
          {t("addAnotherMedication")}
        </Button>
      </div>
    </div>
  )
}
