"use client"

import { ChevronRight, ReceiptTextIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "nextjs-toploader/app"
import type React from "react"
import { useState } from "react"

import { RegistrationSteps } from "@/components/auth/registration-step"
import { Asterisk } from "@/components/common"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

enum ProviderOptions {
  Professional = "professional",
  Laboratory = "laboratory",
  Clinic = "clinic",
  Pharmacy = "pharmacy",
}

export default function ProviderProfessionalDetailsPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    providerType: ProviderOptions.Professional,
    specialty: "",
    institutionName: "",
    nuit: "",
    termsAccepted: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const steps = [
    { id: "basic", number: 1, title: "Dados básicos" },
    { id: "professional", number: 2, title: "Detalhes profissionais" },
    { id: "documentation", number: 3, title: "Documentação" },
  ]

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value })

    // Clear error when field is edited
    if (errors[field]) {
      const newErrors = { ...errors }
      delete newErrors[field]
      setErrors(newErrors)
    }
  }

  const formatNUIT = (value: string) => {
    // Remove non-digits
    const digits = value.replace(/\D/g, "")

    // Format with dots
    if (digits.length <= 3) {
      return digits
    } else if (digits.length <= 6) {
      return `${digits.slice(0, 3)}.${digits.slice(3)}`
    } else {
      return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}`
    }
  }

  const handleNUITChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNUIT(e.target.value)
    handleChange("nuit", formatted)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Validate provider type
    if (!formData.providerType) {
      newErrors.providerType = "Tipo de provedor é obrigatório"
    }

    // Validate specialty
    if (formData.providerType === ProviderOptions.Professional && !formData.specialty) {
      newErrors.specialty = "Especialidade é obrigatória"
    }

    // Validate institution name
    if (formData.providerType !== ProviderOptions.Professional && !formData.institutionName) {
      newErrors.institutionName = "Nome da instituição é obrigatório"
    }

    // Validate NUIT
    if (!formData.nuit) {
      newErrors.nuit = "NUIT é obrigatório"
    } else if (formData.nuit.replace(/\D/g, "").length !== 9) {
      newErrors.nuit = "NUIT deve ter 9 dígitos"
    }

    // Validate terms
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "Você deve concordar com os termos e condições"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      router.push("/register/provider/documentation")
    }
  }

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <RegistrationSteps steps={steps} currentStep={2} />
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="providerType" className="text-sm font-medium">
            Tipo de provedor de saúde <Asterisk />
          </Label>
          <Select value={formData.providerType} onValueChange={(value) => handleChange("providerType", value)}>
            <SelectTrigger id="providerType" className={cn("w-full", errors.providerType ? "border-error-5" : "")}>
              <SelectValue placeholder="Profissional de saúde" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ProviderOptions.Professional}>Profissional de Saúde</SelectItem>
              <SelectItem value={ProviderOptions.Laboratory}>Laboratório</SelectItem>
              <SelectItem value={ProviderOptions.Clinic}>Clínica</SelectItem>
              <SelectItem value={ProviderOptions.Pharmacy}>Farmácia</SelectItem>
            </SelectContent>
          </Select>
          {errors.providerType && <p className="text-xs text-error-5">{errors.providerType}</p>}
        </div>

        {formData?.providerType === ProviderOptions.Professional && (
          <div className="space-y-2">
            <Label htmlFor="specialty" className="text-sm font-medium">
              Especialidade <Asterisk />
            </Label>
            <Select value={formData.specialty} onValueChange={(value) => handleChange("specialty", value)}>
              <SelectTrigger id="specialty" className={cn("w-full", errors.specialty ? "border-error-5" : "")}>
                <SelectValue placeholder="Ginecologia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gynecology">Ginecologia</SelectItem>
                <SelectItem value="cardiology">Cardiologia</SelectItem>
                <SelectItem value="dermatology">Dermatologia</SelectItem>
                <SelectItem value="pediatrics">Pediatria</SelectItem>
                <SelectItem value="orthopedics">Ortopedia</SelectItem>
              </SelectContent>
            </Select>
            {errors.specialty && <p className="text-xs text-error-5">{errors.specialty}</p>}
          </div>
        )}

        {formData?.providerType !== ProviderOptions.Professional && (
          <div className="space-y-2">
            <Label htmlFor="institutionName" className="text-sm font-medium">
              Nome da instituição <Asterisk />
            </Label>
            <Input
              id="institutionName"
              value={formData.institutionName}
              onChange={(e) => handleChange("institutionName", e.target.value)}
              placeholder="Hospital de Santo António"
              className={errors.institutionName ? "border-error-5" : ""}
            />
            {errors.institutionName && <p className="text-xs text-error-5">{errors.institutionName}</p>}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="nuit" className="text-sm font-medium">
            NUIT <Asterisk />
          </Label>
          <Input
            id="nuit"
            value={formData.nuit}
            onChange={handleNUITChange}
            placeholder="123.456.789"
            maxLength={11}
            className={errors.nuit ? "border-error-5" : ""}
          />
          {errors.nuit && <p className="text-xs text-error-5">{errors.nuit}</p>}
        </div>

        <div className="bg-warning-2 border border-warning-3 rounded-md p-4 text-sm font-medium text-warning-5">
          <p>
            As informações de tipo de provedor de saúde, especialidade e o seu NUIT serão permanentes. Caso necessite de
            alterações futuras, entre em contato com o suporte.
          </p>
        </div>

        <div className="bg-secondary-3 border border-secondary-3 rounded-md p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2 text-secondary -ml-0.5">
              <ReceiptTextIcon size={20} />
              <h3 className="text-sm font-medium">Termos e condições</h3>
            </div>
            <Link href={""}>
              <ChevronRight size={20} className="text-secondary-11" />
            </Link>
          </div>
          <div className="flex items-start space-x-2 mt-2">
            <Checkbox
              id="terms"
              checked={formData.termsAccepted}
              onCheckedChange={(checked) => handleChange("termsAccepted", checked)}
              className={errors.termsAccepted ? "border-error-5" : ""}
            />
            <Label htmlFor="terms" className="text-xs font-normal leading-tight">
              Li e concordo com os termos de uso
            </Label>
          </div>
          {errors.termsAccepted && <p className="text-xs text-error-5 mt-1">{errors.termsAccepted}</p>}
        </div>

        <Button onClick={handleNext} className="w-full">
          Próximo
        </Button>
      </div>
    </div>
  )
}
