"use client"

import { cn } from "@/lib/utils"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { PlanRegistrationSteps } from "./plan-registration-steps"
import { BackButton } from "@/components/common"
import { useRouter } from "next/navigation"

interface PatientPlanFormProps {
  initialData: any
  onSubmit: (data: any) => void
  onBack: () => void
  stepped?: boolean
}

export function PatientPlanForm({
  initialData,
  onSubmit,
  onBack,
  stepped = false,
}: PatientPlanFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    isFamily: initialData.isFamily || false,
    dependents: initialData.dependents || "",
    modality: initialData.modality || "paid",
    monthlyValue: initialData.monthlyValue || "",
    biannualValue: initialData.biannualValue || "",
    annualValue: initialData.annualValue || "",
    benefits: initialData.benefits || "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isFormValid, setIsFormValid] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const steps = [
    { id: "info", number: 1, title: "Informações cadastrais" },
    { id: "services", number: 2, title: "Serviços grátis inclusos" },
  ]

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value })
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Validate plan name
    if (!formData.name.trim()) {
      newErrors.name = "Nome do plano é obrigatório"
    } else if (formData.name.length > 255) {
      newErrors.name = "Nome do plano deve ter no máximo 255 caracteres"
    } else {
      const nameRegex = /^[A-Za-z0-9_\-\s.,'":;!@#$%^&*()+=<>?]+$/
      if (!nameRegex.test(formData.name)) {
        newErrors.name = "Nome contém caracteres não permitidos"
      }
    }

    // Validate dependents if family plan
    if (formData.isFamily && !formData.dependents) {
      newErrors.dependents = "Número de dependentes é obrigatório"
    } else if (
      formData.isFamily &&
      !/^\d+$/.test(formData.dependents.toString())
    ) {
      newErrors.dependents = "Apenas números são permitidos"
    } else if (
      formData.isFamily &&
      formData.dependents.toString().length > 13
    ) {
      newErrors.dependents = "Máximo de 13 caracteres"
    }

    // Validate modality
    if (!formData.modality) {
      newErrors.modality = "Modalidade é obrigatória"
    }

    // Validate values if paid modality
    if (formData.modality === "paid") {
      if (
        !formData.monthlyValue &&
        !formData.biannualValue &&
        !formData.annualValue
      ) {
        newErrors.values = "Pelo menos um valor de recorrência é obrigatório"
      }
    }

    // Validate benefits
    if (!formData.benefits.trim()) {
      newErrors.benefits = "Benefícios são obrigatórios"
    } else if (formData.benefits.length > 5000) {
      newErrors.benefits = "Benefícios devem ter no máximo 5000 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  useEffect(() => {
    const isValid = validateForm()
    setIsFormValid(isValid)
  }, [formData])

  const handleSubmit = () => {
    setSubmitted(true)
    const isValid = validateForm()

    if (isValid) {
      onSubmit(formData)
    }
  }

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <BackButton
          onClick={() => router.back()}
          text="Cadastro de novo plano"
        />
      </div>

      {stepped && <PlanRegistrationSteps steps={steps} currentStep={1} />}

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="plan-name" className="text-sm font-medium">
            Nome do plano<span className="text-error-5">*</span>
          </Label>
          <Input
            id="plan-name"
            placeholder="Digite aqui"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className={submitted && errors.name ? "border-error-5" : ""}
          />
          {submitted && errors.name && (
            <p className="text-xs text-error-5">{errors.name}</p>
          )}
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-2 col-span-3 sm:col-span-1">
            <Label htmlFor="family" className="text-sm font-medium">
              É familiar?<span className="text-error-5">*</span>
            </Label>
            <Select
              value={formData.isFamily ? "yes" : "no"}
              onValueChange={(value) =>
                handleChange("isFamily", value === "yes")
              }
            >
              <SelectTrigger
                id="family"
                className={cn(
                  "w-full",
                  errors.isFamily ? "border-error-5" : "",
                )}
              >
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Sim</SelectItem>
                <SelectItem value="no">Não</SelectItem>
              </SelectContent>
            </Select>
            {submitted && errors.isFamily && (
              <p className="text-xs text-error-5">{errors.isFamily}</p>
            )}
          </div>

          <div className="space-y-2 col-span-3 sm:col-span-1">
            <Label htmlFor="dependents" className="text-sm font-medium">
              Número de dependentes<span className="text-error-5">*</span>
            </Label>
            <Input
              id="dependents"
              type="number"
              placeholder="Digite aqui"
              value={formData.dependents}
              onChange={(e) => handleChange("dependents", e.target.value)}
              disabled={!formData.isFamily}
              className={errors.dependents ? "border-error-5" : ""}
            />
            {submitted && errors.dependents && (
              <p className="text-xs text-error-5">{errors.dependents}</p>
            )}
          </div>

          <div className="space-y-2 col-span-3 sm:col-span-1">
            <Label htmlFor="modality" className="text-sm font-medium">
              Modalidade<span className="text-error-5">*</span>
            </Label>
            <Select
              value={formData.modality}
              onValueChange={(value) => handleChange("modality", value)}
            >
              <SelectTrigger
                id="modality"
                className={cn(
                  "w-full",
                  errors.modality ? "border-error-5" : "",
                )}
              >
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paid">Pago</SelectItem>
                <SelectItem value="free">Gratuito</SelectItem>
              </SelectContent>
            </Select>
            {submitted && errors.modality && (
              <p className="text-xs text-error-5">{errors.modality}</p>
            )}
          </div>
        </div>

        <div>
          <p className="font-medium mb-2">Recorrência</p>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-secondary-11">Mensal</p>
              <Label htmlFor="monthly-value" className="text-xs">
                Valor
              </Label>
              <Input
                id="monthly-value"
                placeholder="Digite aqui"
                value={formData.monthlyValue}
                onChange={(e) => handleChange("monthlyValue", e.target.value)}
                disabled={formData.modality === "free"}
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-secondary-11">Semestral</p>
              <Label htmlFor="biannual-value" className="text-xs">
                Valor
              </Label>
              <Input
                id="biannual-value"
                placeholder="Digite aqui"
                value={formData.biannualValue}
                onChange={(e) => handleChange("biannualValue", e.target.value)}
                disabled={formData.modality === "free"}
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-secondary-11">Anual</p>
              <Label htmlFor="annual-value" className="text-xs">
                Valor
              </Label>
              <Input
                id="annual-value"
                placeholder="Digite aqui"
                value={formData.annualValue}
                onChange={(e) => handleChange("annualValue", e.target.value)}
                disabled={formData.modality === "free"}
              />
            </div>
          </div>
          {submitted && errors.values && (
            <p className="text-xs text-error-5 mt-1">{errors.values}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="benefits" className="text-sm font-medium">
            Benefícios<span className="text-error-5">*</span>
          </Label>
          <Textarea
            id="benefits"
            placeholder="Digite aqui"
            value={formData.benefits}
            onChange={(e) => handleChange("benefits", e.target.value)}
            className={cn(
              "min-h-[100px] resize-y",
              submitted && errors.benefits ? "border-error-5" : "",
            )}
          />
          {submitted && errors.benefits && (
            <p className="text-xs text-error-5">{errors.benefits}</p>
          )}
        </div>

        <div className="flex justify-end gap-5 pt-4">
          <Button variant="outline" onClick={onBack}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={!isFormValid}>
            Próximo
          </Button>
        </div>
      </div>
    </div>
  )
}
