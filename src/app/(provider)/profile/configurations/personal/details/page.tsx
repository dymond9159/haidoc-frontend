"use client"

import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { ProviderOptions } from "@/app/(auth)/register/provider/professional-details/page"
import { Asterisk } from "@/components/common"
import { Button } from "@/components/ui"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { cn, formatNUIT } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "nextjs-toploader/app"
import { useState } from "react"

export default function PersonalDetails() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    providerType: ProviderOptions.Professional,
    specialty: "",
    institutionName: "",
    nuit: "",
    termsAccepted: false,
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

  const handleNUITChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNUIT(e.target.value)
    handleChange("nuit", formatted)
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="providerType" className="text-sm font-medium">
            Tipo de provedor de saúde <Asterisk />
          </Label>
          <Select value={formData.providerType} onValueChange={(value) => handleChange("providerType", value)} disabled>
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
        <div className="space-y-2">
          <Label htmlFor="specialty" className="text-sm font-medium">
            Especialidade <Asterisk />
          </Label>
          <Select value={formData.specialty} onValueChange={(value) => handleChange("specialty", value)} disabled>
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
            disabled
          />
          {errors.nuit && <p className="text-xs text-error-5">{errors.nuit}</p>}
        </div>
      </div>
      <div className="w-full flex items-center gap-4 justify-between">
        <Button variant="outline" className="gap-2" onClick={() => router.back()}>
          <ChevronLeft />
          Voltar
        </Button>

        <Button
          variant="outline"
          className="gap-2"
          onClick={() => router.push("/profile/configurations/personal/document")}
        >
          Próxima
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}
