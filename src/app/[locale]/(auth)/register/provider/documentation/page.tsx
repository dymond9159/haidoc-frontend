"use client"

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
      newErrors.files = "Pelo menos um documento é obrigatório"
    }

    // Validate street
    if (!formData.street.trim()) {
      newErrors.street = "Rua ou avenida é obrigatória"
    }

    // Validate number
    if (!formData.number.trim()) {
      newErrors.number = "Número é obrigatório"
    }

    // Validate neighborhood
    if (!formData.neighborhood.trim()) {
      newErrors.neighborhood = "Bairro é obrigatório"
    }

    // Validate city
    if (!formData.city.trim()) {
      newErrors.city = "Cidade é obrigatória"
    }

    // Validate country
    if (!formData.country.trim()) {
      newErrors.country = "País é obrigatório"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      // In a real app, you would submit the form data to your backend here
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Agora você pode acessar todas as funcionalidades da plataforma.",
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
          <AccordionTrigger className="text-sm font-medium">Documentos de licença</AccordionTrigger>
          <AccordionContent className="cursor-default">
            <Separator className="mb-4" />
            <div className="space-y-2">
              <p className="text-sm">
                Licença (Cartão da Ordem dos Médicos ou Alvará da Instituição) <Asterisk />
              </p>
              <p className="text-xs text-system-9">Apenas 5 documentos são permitidos</p>
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
            <Label className="text-sm font-medium">Endereço</Label>
          </AccordionTrigger>
          <AccordionContent className="cursor-default">
            <Separator className="mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2 col-span-1 md:col-span-3">
                <Label htmlFor="street" className="text-xs">
                  Rua ou avenida <Asterisk />
                </Label>
                <Input
                  id="street"
                  value={formData.street}
                  onChange={(e) => handleChange("street", e.target.value)}
                  placeholder="123 456 789"
                  className={errors.street ? "border-error-5" : ""}
                />
                {errors.street && <p className="text-xs text-error-5">{errors.street}</p>}
              </div>

              <div className="space-y-2 col-span-1 md:col-span-1">
                <Label htmlFor="number" className="text-xs">
                  Número <Asterisk />
                </Label>
                <Input
                  id="number"
                  value={formData.number}
                  onChange={(e) => handleChange("number", e.target.value)}
                  placeholder="123"
                  className={errors.number ? "border-error-5" : ""}
                />
                {errors.number && <p className="text-xs text-error-5">{errors.number}</p>}
              </div>

              <div className="space-y-2 col-span-1 md:col-span-2">
                <Label htmlFor="neighborhood" className="text-xs">
                  Bairro <Asterisk />
                </Label>
                <Input
                  id="neighborhood"
                  value={formData.neighborhood}
                  onChange={(e) => handleChange("neighborhood", e.target.value)}
                  placeholder="Polana"
                  className={errors.neighborhood ? "border-error-5" : ""}
                />
                {errors.neighborhood && <p className="text-xs text-error-5">{errors.neighborhood}</p>}
              </div>

              <div className="space-y-2 col-span-1 md:col-span-2">
                <Label htmlFor="city" className="text-xs">
                  Cidade <Asterisk />
                </Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  placeholder="Maputo"
                  className={errors.city ? "border-error-5" : ""}
                />
                {errors.city && <p className="text-xs text-error-5">{errors.city}</p>}
              </div>

              <div className="space-y-2 col-span-1 md:col-span-4">
                <Label htmlFor="country" className="text-xs">
                  País <Asterisk />
                </Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                  placeholder="Moçambique"
                  className={errors.country ? "border-error-5" : ""}
                />
                {errors.country && <p className="text-xs text-error-5">{errors.country}</p>}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button onClick={handleSubmit} className="w-full bg-primary-9 hover:bg-primary-10 text-white">
        Cadastrar-me
      </Button>
    </div>
  )
}
