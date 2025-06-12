"use client"

import { Asterisk } from "@/components/common"
import { ConfirmationDialog } from "@/components/common/confirm-dialog"
import { Button } from "@/components/ui"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { Gender, GenderLabel } from "@/types"
import { ChevronLeft, ChevronRight, Eye, EyeOff } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRouter } from "nextjs-toploader/app"
import { useState } from "react"

export default function PersonalBasicData() {
  const { toast } = useToast()
  const t = useTranslations("pages.provider.profile.configurations")
  const tForm = useTranslations("form")
  const tCta = useTranslations("cta")
  const tModal = useTranslations("modal")

  const router = useRouter()
  const [isFormChanged, setIsFormChanged] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)

  const [currentPassword, setCurrentPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)

  const [newPassword, setNewPassword] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)

  const [confirmPassword, setConfirmPassword] = useState("")
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

  const isPasswordValid = currentPassword.length > 0
  const areNewPasswordsValid = newPassword.length > 0 && newPassword === confirmPassword
  const canSavePassword = isPasswordValid && areNewPasswordsValid

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-secondary">{t("label.basicData.subTitle1")}</h3>
        </div>
        <div className="space-y-4 grid md:grid-cols-2 gap-4">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="fullName" className="text-sm font-medium">
              {tForm("label.fullName")} <Asterisk />
            </Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder={tForm("placeholder.fullName")}
              className={errors.fullName ? "border-error-5" : ""}
            />
            {errors.fullName && <p className="text-xs text-error-5">{errors.fullName}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              {tForm("label.email")} <Asterisk />
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder={tForm("placeholder.email")}
              className={errors.email ? "border-error-5" : ""}
            />
            {errors.email && <p className="text-xs text-error-5">{errors.email}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">
              {tForm("label.phone")} <Asterisk />
            </Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder={tForm("placeholder.phone")}
              className={errors.phone ? "border-error-5" : ""}
            />
            {errors.phone && <p className="text-xs text-error-5">{errors.phone}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="birthDate" className="text-sm font-medium">
              {tForm("label.birthDate")} <Asterisk />
            </Label>
            <Input
              id="birthDate"
              value={formData.birthDate}
              onChange={(e) => handleChange("birthDate", e.target.value)}
              placeholder={tForm("placeholder.birthDate")}
              className={errors.birthDate ? "border-error-5" : ""}
            />
            {errors.birthDate && <p className="text-xs text-error-5">{errors.birthDate}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender" className="text-sm font-medium">
              {tForm("label.gender")} <Asterisk />
            </Label>
            <Select value={formData.gender} onValueChange={(value) => handleChange("gender", value)}>
              <SelectTrigger id="gender" className={cn("w-full", errors.gender ? "border-error-5" : "")}>
                <SelectValue placeholder={tForm("placeholder.gender")} />
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
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-secondary">{t("label.basicData.subTitle2")}</h3>
        </div>
        <div className="space-y-4 grid md:grid-cols-2 gap-4">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="current-password">
              {tForm("label.currentPassword")} <Asterisk />
            </Label>
            <div className="relative">
              <Input
                id="current-password"
                type={showCurrentPassword ? "text" : "password"}
                placeholder={tForm("placeholder.password")}
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value)
                  setIsFormChanged(true)
                }}
                className={!isPasswordValid && currentPassword ? "border-red-500" : ""}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <div className="text-sm text-cyan-600 hover:underline cursor-pointer">{tCta("forgotPassword")}</div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">
              {tForm("label.newPassword")} <Asterisk />
            </Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                placeholder={tForm("placeholder.password")}
                disabled={!isPasswordValid}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value)
                  setIsFormChanged(true)
                }}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400"
                onClick={() => setShowNewPassword(!showNewPassword)}
                disabled={!isPasswordValid}
              >
                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span className="sr-only">{showNewPassword ? "Hide password" : "Show password"}</span>
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">
              {tForm("label.repeatNewPassword")} <Asterisk />
            </Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder={tForm("placeholder.password")}
                disabled={!isPasswordValid}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  setIsFormChanged(true)
                }}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={!isPasswordValid}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <div className="w-full flex items-center gap-4 justify-between">
            <Button variant="outline" className="gap-2" onClick={() => router.back()} disabled>
              <ChevronLeft />
              {tCta("back")}
            </Button>

            <Button
              variant="outline"
              className="gap-2"
              onClick={() => router.push("/professional/profile/configurations/personal/details")}
            >
              {tCta("next")}
              <ChevronRight />
            </Button>
          </div>
          <Button variant="default" disabled={!canSavePassword || !isFormChanged} onClick={handleSaveChanges}>
            {tCta("saveChanges")}
          </Button>
        </div>
      </div>
      <ConfirmationDialog
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={confirmSaveChanges}
        title={tModal("basicDataSaveChangesConfirm.title")}
        description={tModal("basicDataSaveChangesConfirm.description")}
        confirmText={tModal("basicDataSaveChangesConfirm.confirmText")}
        cancelText={tModal("basicDataSaveChangesConfirm.cancelText")}
      />
    </div>
  )
}
