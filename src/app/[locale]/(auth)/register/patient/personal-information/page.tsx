"use client"

import { useTranslations } from "next-intl"
import { useRouter } from "nextjs-toploader/app"

import { Asterisk, TermsAndConditions } from "@/components/common"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRoutes } from "@/hooks/use-localized-routes"
import { useFormValidation } from "@/hooks/use-validation-form"
import { cn } from "@/lib/utils"
import { AccountType, MaritalStatus } from "@/types"

export default function PatientPersonalInformationPage() {
  const router = useRouter()
  const routes = useRoutes()
  const tForm = useTranslations("form")
  const tCta = useTranslations("cta")

  const { formData, validate, handleChange, errors } = useFormValidation({
    initialData: {
      maritalStatus: "",
      birthPlace: "",
      profession: "",
      termsAccepted: false,
    },
    tForm,
  })

  const handleNext = () => {
    if (validate()) {
      router.push(routes.plans(AccountType.Patient))
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="maritalStatus" className="text-sm font-medium">
            {tForm("label.maritalStatus")} <Asterisk />
          </Label>
          <Select value={formData.maritalStatus} onValueChange={(value) => handleChange("maritalStatus", value)}>
            <SelectTrigger id="maritalStatus" className={cn("w-full", errors.maritalStatus ? "border-error-5" : "")}>
              <SelectValue placeholder={tForm("placeholder.maritalStatus")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={MaritalStatus.Single}>{tForm("category.maritalStatus.single")}</SelectItem>
              <SelectItem value={MaritalStatus.Married}>{tForm("category.maritalStatus.married")}</SelectItem>
              <SelectItem value={MaritalStatus.Divorced}>{tForm("category.maritalStatus.divorced")}</SelectItem>
              <SelectItem value={MaritalStatus.Widow}>{tForm("category.maritalStatus.widow")}</SelectItem>
              <SelectItem value={MaritalStatus.StableUnion}>{tForm("category.maritalStatus.stableUnion")}</SelectItem>
            </SelectContent>
          </Select>
          {errors.maritalStatus && <p className="text-xs text-error-5">{errors.maritalStatus}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="birthPlace" className="text-sm font-medium">
            {tForm("label.birthPlace")} <Asterisk />
          </Label>
          <Input
            id="birthPlace"
            value={formData.birthPlace}
            onChange={(e) => handleChange("birthPlace", e.target.value)}
            placeholder={tForm("placeholder.birthPlace")}
            className={errors.birthPlace ? "border-error-5" : ""}
          />
          {errors.birthPlace && <p className="text-xs text-error-5">{errors.birthPlace}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="profession" className="text-sm font-medium">
            {tForm("label.profession")} <Asterisk />
          </Label>
          <Input
            id="profession"
            value={formData.profession}
            onChange={(e) => handleChange("profession", e.target.value)}
            placeholder={tForm("placeholder.profession")}
            className={errors.profession ? "border-error-5" : ""}
          />
          {errors.profession && <p className="text-xs text-error-5">{errors.profession}</p>}
        </div>
      </div>

      <TermsAndConditions
        checked={formData.termsAccepted}
        onCheckedChange={(checked) => handleChange("termsAccepted", checked)}
        error={errors.termsAccepted}
      />

      <Button onClick={handleNext} className="w-full">
        {tCta("next")}
      </Button>
    </div>
  )
}
