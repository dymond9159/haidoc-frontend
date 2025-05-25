"use client"

import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { Asterisk } from "@/components/common"
import { Button } from "@/components/ui"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { cn, formatCardNumber } from "@/lib/utils"
import { ProviderOptions } from "@/types/enum-tab-options"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRouter } from "nextjs-toploader/app"
import { useState } from "react"

export default function PersonalDetails() {
  const router = useRouter()
  const t = useTranslations("pages.provider.profile.configurations")
  const tForm = useTranslations("form")
  const tCta = useTranslations("cta")

  const [formData, setFormData] = useState({
    providerType: ProviderOptions.Professional,
    specialty: "",
    institutionName: "",
    cardNumber: "",
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

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    handleChange("cardNumber", formatted)
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="providerType" className="text-sm font-medium">
            {tForm("label.providerType")} <Asterisk />
          </Label>
          <Select value={formData.providerType} onValueChange={(value) => handleChange("providerType", value)} disabled>
            <SelectTrigger id="providerType" className={cn("w-full", errors.providerType ? "border-error-5" : "")}>
              <SelectValue placeholder={tForm("placeholder.providerType")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ProviderOptions.Professional}>{tForm("category.provider.professional")}</SelectItem>
              <SelectItem value={ProviderOptions.Laboratory}>{tForm("category.provider.laboratory")}</SelectItem>
              <SelectItem value={ProviderOptions.Clinic}>{tForm("category.provider.clinic")}</SelectItem>
              <SelectItem value={ProviderOptions.Pharmacy}>{tForm("category.provider.pharmacy")}</SelectItem>
            </SelectContent>
          </Select>
          {errors.providerType && <p className="text-xs text-error-5">{errors.providerType}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="specialty" className="text-sm font-medium">
            {tForm("label.specialty")} <Asterisk />
          </Label>
          <Select value={formData.specialty} onValueChange={(value) => handleChange("specialty", value)} disabled>
            <SelectTrigger id="specialty" className={cn("w-full", errors.specialty ? "border-error-5" : "")}>
              <SelectValue placeholder={tForm("placeholder.specialty")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gynecology">{tForm("category.specialty.gynecology")}</SelectItem>
              <SelectItem value="cardiology">{tForm("category.specialty.cardiology")}</SelectItem>
              <SelectItem value="dermatology">{tForm("category.specialty.dermatology")}</SelectItem>
              <SelectItem value="pediatrics">{tForm("category.specialty.pediatrics")}</SelectItem>
              <SelectItem value="orthopedics">{tForm("category.specialty.orthopedics")}</SelectItem>
            </SelectContent>
          </Select>
          {errors.specialty && <p className="text-xs text-error-5">{errors.specialty}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="cardNumber" className="text-sm font-medium">
            {formData.providerType === ProviderOptions.Professional
              ? tForm("label.professionalNumber")
              : tForm("label.nuit")}{" "}
            <Asterisk />
          </Label>
          <Input
            id="cardNumber"
            value={formData.cardNumber}
            onChange={handleCardNumberChange}
            placeholder={
              formData.providerType === ProviderOptions.Professional
                ? tForm("placeholder.professionalNumber")
                : tForm("placeholder.nuit")
            }
            maxLength={9}
            className={errors.cardNumber ? "border-error-5" : ""}
            disabled
          />
          {errors.cardNumber && <p className="text-xs text-error-5">{errors.cardNumber}</p>}
        </div>
      </div>
      <div className="w-full flex items-center gap-4 justify-between">
        <Button variant="outline" className="gap-2" onClick={() => router.back()}>
          <ChevronLeft />
          {tCta("back")}
        </Button>

        <Button
          variant="outline"
          className="gap-2"
          onClick={() => router.push("/professional/profile/configurations/personal/document")}
        >
          {tCta("next")}
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}
