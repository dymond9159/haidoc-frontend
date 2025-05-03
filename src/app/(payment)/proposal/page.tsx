"use client"

import type React from "react"

import { BackButton } from "@/components/common"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Upload } from "lucide-react"
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
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
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
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">
                  Nome da empresa<span className="text-red-500">*</span>
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

              <div className="space-y-2">
                <Label htmlFor="email">
                  E-mail<span className="text-red-500">*</span>
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

              <div className="space-y-2">
                <Label htmlFor="phone">
                  Número de telefone<span className="text-red-500">*</span>
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

              <div className="space-y-2">
                <Label htmlFor="description">
                  Descrição<span className="text-red-500">*</span>
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

              <div className="space-y-2">
                <Label>Documento</Label>
                <p className="text-xs text-gray-500">Apenas 1 arquivo permitido</p>
                <div className="mt-2 flex flex-col items-center rounded-md border border-dashed border-gray-300 p-6">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="rounded-full bg-gray-100 p-2">
                      <Upload className="h-4 w-4 text-gray-500" />
                    </div>
                    <p className="text-sm text-gray-600">Arraste e solte os arquivos aqui!</p>
                    <p className="text-xs text-gray-500">Ou, se preferir...</p>
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm text-gray-600 hover:bg-gray-50">
                        Adicionar arquivo (máximo 5 MB)
                      </div>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                    {file && <p className="text-sm text-gray-600">{file.name}</p>}
                  </div>
                </div>
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
