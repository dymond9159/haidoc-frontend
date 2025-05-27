"use client"

import { useTranslations } from "next-intl"
import { useRouter } from "nextjs-toploader/app"
import { useRef } from "react"

import { Asterisk } from "@/components/common"
import { FileUploadBox } from "@/components/common/file-upload-box"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useRoutes } from "@/hooks/use-localized-routes"
import { useToast } from "@/hooks/use-toast"
import { useFormValidation } from "@/hooks/use-validation-form"
import { UploadedFile } from "@/types"

enum DocumentationOptions {
  License = "license",
  Address = "address",
}

export default function ProviderDocumentationPage() {
  const router = useRouter()
  const routes = useRoutes()
  const t = useTranslations("pages.auth.register.documentation")
  const tForm = useTranslations("form")
  const tCta = useTranslations("cta")

  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { formData, setFormData, validate, handleChange, errors, setErrors } = useFormValidation({
    initialData: {
      files: [],
      street: "",
      number: "",
      neighborhood: "",
      city: "",
      country: "",
    },
    tForm,
  })

  const handleFileUpload = (files: FileList) => {
    if (files.length > 0) {
      const newFiles: UploadedFile[] = []

      Array.from(files).forEach((file) => {
        if (formData?.files?.length || 0 + newFiles.length < 5) {
          newFiles.push({
            id: Math.random().toString(36).substring(2, 9),
            name: file.name,
            size: file.size,
          })
        }
      })

      setFormData({ ...formData, files: [...(formData?.files || []), ...newFiles] })

      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

      // Clear error if files are uploaded
      if (errors.files && newFiles.length > 0) {
        const newErrors = { ...errors }
        delete newErrors.files
        setErrors(newErrors)
      }
    }
  }

  const handleRemoveFile = (id: string) => {
    setFormData({ ...formData, files: formData?.files?.filter((file) => file.id !== id) })
  }

  const handleSubmit = () => {
    if (validate()) {
      // In a real app, you would submit the form data to your backend here
      setTimeout(() => {
        router.push(routes.registerSuccess())
      }, 1000)
    }
  }

  return (
    <div className="space-y-6">
      <Accordion
        type="multiple"
        className="w-full space-y-4"
        defaultValue={[DocumentationOptions.License, DocumentationOptions.Address]}
      >
        {/* Documentos de Licença */}
        <AccordionItem value={DocumentationOptions.License}>
          <AccordionTrigger className="text-sm font-medium">{t("licenseDocs")}</AccordionTrigger>
          <AccordionContent className="cursor-default">
            <Separator className="mb-4" />
            <div className="space-y-2">
              <p className="text-sm">
                {t("licenseDesc")} <Asterisk />
              </p>
              <p className="text-xs text-system-9">{t("fileLimit")}</p>
              <FileUploadBox
                multiple={true}
                uploadedFiles={formData?.files || []}
                onUpload={handleFileUpload}
                onRemove={handleRemoveFile}
                error={errors?.files}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Endereço */}
        <AccordionItem value={DocumentationOptions.Address}>
          <AccordionTrigger>
            <Label className="text-sm font-medium">{t("address")}</Label>
          </AccordionTrigger>
          <AccordionContent className="cursor-default">
            <Separator className="mb-4" />
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button onClick={handleSubmit} className="w-full bg-primary-9 hover:bg-primary-10 text-white">
        {tCta("register")}
      </Button>
    </div>
  )
}
