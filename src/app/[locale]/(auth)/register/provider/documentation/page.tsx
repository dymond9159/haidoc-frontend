"use client"

import { useTranslations } from "next-intl"
import { useRouter } from "nextjs-toploader/app"
import { useRef, useState } from "react"

import { Asterisk } from "@/components/common"
import { FileUploadBox, UploadedFile } from "@/components/common/file-upload-box"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

enum DocumentationOptions {
  License = "license",
  Address = "address",
}

export default function ProviderDocumentationPage() {
  const router = useRouter()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [formData, setFormData] = useState({
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    country: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const t = useTranslations("pages.auth.register.provider.documentation")
  const tForm = useTranslations("form")
  const tCta = useTranslations("cta")

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })

    // Clear error when field is edited
    if (errors[field]) {
      const newErrors = { ...errors }
      delete newErrors[field]
      setErrors(newErrors)
    }
  }

  const handleFileUpload = (files: FileList) => {
    if (files.length > 0) {
      const newFiles: UploadedFile[] = []

      Array.from(files).forEach((file) => {
        if (uploadedFiles.length + newFiles.length < 5) {
          newFiles.push({
            id: Math.random().toString(36).substring(2, 9),
            name: file.name,
            size: file.size,
          })
        }
      })

      setUploadedFiles([...uploadedFiles, ...newFiles])

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
    setUploadedFiles(uploadedFiles.filter((file) => file.id !== id))
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Validate files
    if (uploadedFiles.length === 0) {
      newErrors.files = tForm("error.filesRequired")
    }

    // Validate street
    if (!formData.street.trim()) {
      newErrors.street = tForm("error.streetRequired")
    }

    // Validate number
    if (!formData.number.trim()) {
      newErrors.number = tForm("error.numberRequired")
    }

    // Validate neighborhood
    if (!formData.neighborhood.trim()) {
      newErrors.neighborhood = tForm("error.neighborhoodRequired")
    }

    // Validate city
    if (!formData.city.trim()) {
      newErrors.city = tForm("error.cityRequired")
    }

    // Validate country
    if (!formData.country.trim()) {
      newErrors.country = tForm("error.countryRequired")
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      // In a real app, you would submit the form data to your backend here
      toast({
        title: t("successTitle"),
        description: t("successDesc"),
        variant: "success",
      })

      setTimeout(() => {
        router.push("/plans")
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
                uploadedFiles={uploadedFiles}
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
