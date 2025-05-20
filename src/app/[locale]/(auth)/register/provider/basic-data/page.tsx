"use client"
import { Eye, EyeOff } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRouter } from "nextjs-toploader/app"
import { useState } from "react"

import { Asterisk } from "@/components/common"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Gender, GenderLabel } from "@/types/provider/profile/types"

export default function ProviderBasicInfoPage() {
  const router = useRouter()
  const t = useTranslations("auth.register")
  const formT = useTranslations("form")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    birthDate: "",
    gender: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })

    // Clear error when field is edited
    if (errors[field]) {
      const newErrors = { ...errors }
      delete newErrors[field]
      setErrors(newErrors)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Validate full name
    if (!formData.fullName.trim()) {
      newErrors.fullName = formT("errors.required", { field: formT("labels.fullName") })
    } else if (!/^[A-Za-z\s]+$/.test(formData.fullName)) {
      newErrors.fullName = formT("errors.invalidName")
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = formT("errors.required", { field: formT("labels.email") })
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = formT("errors.invalidEmail")
    }

    // Validate phone
    if (!formData.phone.trim()) {
      newErrors.phone = formT("errors.required", { field: formT("labels.phone") })
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = formT("errors.invalidPhone")
    }

    // Validate birth date
    if (!formData.birthDate.trim()) {
      newErrors.birthDate = formT("errors.required", { field: formT("labels.birthDate") })
    }

    // Validate gender
    if (!formData.gender) {
      newErrors.gender = formT("errors.required", { field: formT("labels.gender") })
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = formT("errors.required", { field: formT("labels.password") })
    } else if (formData.password.length < 8) {
      newErrors.password = formT("errors.minPasswordLength")
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = formT("errors.required", { field: formT("labels.confirmPassword") })
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = formT("errors.passwordMismatch")
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      router.push("/register/provider/professional-details")
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="fullName" className="text-sm font-medium">
            {formT("labels.fullName")} <Asterisk />
          </Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            placeholder={formT("placeholders.fullName")}
            className={errors.fullName ? "border-error-5" : ""}
          />
          {errors.fullName && <p className="text-xs text-error-5">{errors.fullName}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            {formT("labels.email")} <Asterisk />
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder={formT("placeholders.email")}
            className={errors.email ? "border-error-5" : ""}
          />
          {errors.email && <p className="text-xs text-error-5">{errors.email}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium">
            {formT("labels.phone")} <Asterisk />
          </Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder={formT("placeholders.phone")}
            className={errors.phone ? "border-error-5" : ""}
          />
          {errors.phone && <p className="text-xs text-error-5">{errors.phone}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="birthDate" className="text-sm font-medium">
            {formT("labels.birthDate")} <Asterisk />
          </Label>
          <Input
            id="birthDate"
            value={formData.birthDate}
            onChange={(e) => handleChange("birthDate", e.target.value)}
            placeholder={formT("placeholders.birthDate")}
            className={errors.birthDate ? "border-error-5" : ""}
          />
          {errors.birthDate && <p className="text-xs text-error-5">{errors.birthDate}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender" className="text-sm font-medium">
            {formT("labels.gender")} <Asterisk />
          </Label>
          <Select value={formData.gender} onValueChange={(value) => handleChange("gender", value)}>
            <SelectTrigger id="gender" className={cn("w-full", errors.gender ? "border-error-5" : "")}>
              <SelectValue placeholder={GenderLabel.Female} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={Gender.Female}>{GenderLabel.Female}</SelectItem>
              <SelectItem value={Gender.Male}>{GenderLabel.Male}</SelectItem>
              <SelectItem value={Gender.NoIdendification}>{GenderLabel.NoIdendification}</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && <p className="text-xs text-error-5">{errors.gender}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">
            {formT("labels.password")} <Asterisk />
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              placeholder={formT("placeholders.password")}
              className={errors.password ? "border-error-5 pr-10" : "pr-10"}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-system-9"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-error-5">{errors.password}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-medium">
            {formT("labels.confirmPassword")} <Asterisk />
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              placeholder={formT("placeholders.password")}
              className={errors.confirmPassword ? "border-error-5 pr-10" : "pr-10"}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-system-9"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-xs text-error-5">{errors.confirmPassword}</p>}
        </div>
      </div>
      <div>
        <Button onClick={handleNext} className="w-full bg-primary-9 hover:bg-primary-10 text-white">
          {t("next")}
        </Button>
      </div>
    </div>
  )
}
