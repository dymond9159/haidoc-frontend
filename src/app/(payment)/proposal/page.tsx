"use client"

import { Asterisk, BackButton } from "@/components/common"
import { FileUploadBox } from "@/components/common/file-upload-box"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { z } from "zod"

const proposalSchema = z.object({
  companyName: z
    .string()
    .min(3, "O nome deve ter no mínimo 3 caracteres")
    .max(255, "O nome deve ter no máximo 255 caracteres")
    .regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/, "O nome deve conter apenas letras e espaços"),
  email: z.string().email("Insira um e-mail válido").max(255, "O e-mail deve ter no máximo 255 caracteres"),
  phone: z.string().regex(/^\+?[0-9]{9,14}$/, "Insira um número de telefone válido"),
  description: z
    .string()
    .min(10, "A descrição deve ter no mínimo 10 caracteres")
    .max(500, "A descrição deve ter no máximo 500 caracteres"),
  file: z.instanceof(File).optional(),
})

type ProposalFormData = z.infer<typeof proposalSchema>

export default function ProposalPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState<Partial<ProposalFormData>>({
    companyName: "",
    email: "",
    phone: "",
    description: "",
    file: undefined,
  })
  const [errors, setErrors] = useState<Partial<Record<keyof ProposalFormData, string>>>({})
  const [file, setFile] = useState<File | null>(null)
  const [characterCount, setCharacterCount] = useState(0)

  const handleInputChange = (field: keyof ProposalFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }

    // Update character count for description
    if (field === "description") {
      setCharacterCount(value.length)
    }

    if (field === "file") {
      setFile(null)
    }
  }

  const handleFileChange = (files: FileList) => {
    if (files[0]) {
      setFile(files[0])
    }
  }

  const validateForm = (): boolean => {
    try {
      proposalSchema.parse(formData)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof ProposalFormData, string>> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof ProposalFormData] = err.message
          }
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  const handleSubmit = () => {
    if (validateForm()) {
      toast({
        title: "Proposta enviada",
        description: "Sua proposta foi enviada com sucesso! Entraremos em contato em breve.",
        variant: "default",
      })

      // Redirect to home page after successful submission
      setTimeout(() => {
        router.push("/professional/home")
      }, 1500)
    }
  }

  return (
    <div>
      <BackButton text="Fazer proposta" />

      <Card className="mt-4">
        <CardContent className="px-0">
          <div className="space-y-6">
            <div className="space-y-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="space-y-2 col-span-1 md:col-span-1">
                <Label htmlFor="companyName">
                  Nome da empresa <Asterisk />
                </Label>
                <Input
                  id="companyName"
                  placeholder="Digite aqui"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  className={errors.companyName ? "border-red-500" : ""}
                />
                {errors.companyName && <p className="text-xs text-red-500">{errors.companyName}</p>}
              </div>

              <div className="space-y-2 col-span-1 md:col-span-1">
                <Label htmlFor="email">
                  E-mail <Asterisk />
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
              </div>

              <div className="space-y-2 col-span-1 md:col-span-1">
                <Label htmlFor="phone">
                  Número de telefone <Asterisk />
                </Label>
                <Input
                  id="phone"
                  placeholder="82 123 4567"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
              </div>

              <div className="space-y-2 col-span-1 md:col-span-3">
                <Label htmlFor="description">
                  Descrição <Asterisk />
                </Label>
                <Textarea
                  id="description"
                  placeholder="Digite aqui"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className={errors.description ? "border-red-500" : ""}
                  rows={5}
                  maxLength={500}
                />
                <div className="flex justify-end">
                  <span className="text-xs text-gray-500">{characterCount} caracteres</span>
                </div>
                {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
              </div>

              <div className="space-y-2 col-span-1 md:col-span-3">
                <Label>Documento</Label>
                <p className="text-xs text-gray-500">Apenas 1 arquivo permitido</p>
                <FileUploadBox
                  maxFiles={1}
                  accept=".pdf"
                  uploadedFiles={file ? [{ id: "1", name: file.name, size: file.size }] : []}
                  onUpload={handleFileChange}
                  onRemove={() => setFile(null)}
                  error={errors.file}
                />
              </div>
            </div>

            <Button onClick={handleSubmit} className="w-full">
              Enviar proposta
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
