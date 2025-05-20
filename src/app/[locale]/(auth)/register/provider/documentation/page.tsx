"use client"

import { useTranslations } from "next-intl"
import { useRouter } from "nextjs-toploader/app"
import type React from "react"
import { useState } from "react"

import { Asterisk } from "@/components/common"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function ProviderDocumentationPage() {
  const router = useRouter()
  const t = useTranslations("provider.registration")
  const [formData, setFormData] = useState({
    documentType: "",
    documentNumber: "",
    documentFile: null as File | null,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value })

    // Clear error when field is edited
    if (errors[field]) {
      const newErrors = { ...errors }
      delete newErrors[field]
      setErrors(newErrors)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleChange("documentFile", file)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Validate document type
    if (!formData.documentType) {
      newErrors.documentType = t("documentation.documentType.error")
    }

    // Validate document number
    if (!formData.documentNumber) {
      newErrors.documentNumber = t("documentation.documentNumber.error")
    }

    // Validate document file
    if (!formData.documentFile) {
      newErrors.documentFile = t("documentation.documentFile.error")
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      // Handle form submission
      router.push("/register/success")
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="documentType" className="text-sm font-medium">
          {t("documentation.documentType.label")} <Asterisk />
        </Label>
        <select
          id="documentType"
          value={formData.documentType}
          onChange={(e) => handleChange("documentType", e.target.value)}
          className={cn(
            "w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
            errors.documentType ? "border-error-5" : "",
          )}
        >
          <option value="">{t("documentation.documentType.placeholder")}</option>
          <option value="id">{t("documentation.documentType.options.id")}</option>
          <option value="passport">{t("documentation.documentType.options.passport")}</option>
          <option value="drivers_license">{t("documentation.documentType.options.driversLicense")}</option>
        </select>
        {errors.documentType && <p className="text-xs text-error-5">{errors.documentType}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="documentNumber" className="text-sm font-medium">
          {t("documentation.documentNumber.label")} <Asterisk />
        </Label>
        <Input
          id="documentNumber"
          value={formData.documentNumber}
          onChange={(e) => handleChange("documentNumber", e.target.value)}
          placeholder={t("documentation.documentNumber.placeholder")}
          className={errors.documentNumber ? "border-error-5" : ""}
        />
        {errors.documentNumber && <p className="text-xs text-error-5">{errors.documentNumber}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="documentFile" className="text-sm font-medium">
          {t("documentation.documentFile.label")} <Asterisk />
        </Label>
        <Input
          id="documentFile"
          type="file"
          onChange={handleFileChange}
          accept=".pdf,.jpg,.jpeg,.png"
          className={cn("w-full", errors.documentFile ? "border-error-5" : "")}
        />
        {errors.documentFile && <p className="text-xs text-error-5">{errors.documentFile}</p>}
        <p className="text-xs text-muted-foreground">{t("documentation.documentFile.help")}</p>
      </div>

      <div className="bg-warning-2 border border-warning-3 rounded-md p-4 text-sm font-medium text-warning-5">
        <p>{t("documentation.warning")}</p>
      </div>

      <Button onClick={handleSubmit} className="w-full">
        {t("submit")}
      </Button>
    </div>
  )
}
