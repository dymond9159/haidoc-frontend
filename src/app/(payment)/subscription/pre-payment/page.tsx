"use client"

import { BackButton } from "@/components/common"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { z } from "zod"

type CardType = "credit" | "debit"

const cardSchema = z.object({
  cardNumber: z
    .string()
    .min(13, "O número do cartão deve ter entre 13 e 19 dígitos")
    .max(19, "O número do cartão deve ter entre 13 e 19 dígitos")
    .regex(/^\d+$/, "O número do cartão deve conter apenas números"),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Insira uma data de validade no formato MM/AA"),
  cvv: z
    .string()
    .min(3, "O CVV deve conter 3 ou 4 dígitos")
    .max(4, "O CVV deve conter 3 ou 4 dígitos")
    .regex(/^\d+$/, "O CVV deve conter apenas números"),
  email: z.string().email("Insira um e-mail válido").max(255, "O e-mail deve ter no máximo 255 caracteres"),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "Você deve aceitar os termos e condições",
  }),
})

type CardFormData = z.infer<typeof cardSchema>

export default function PrePaymentPage() {
  const router = useRouter()
  const [cardType, setCardType] = useState<CardType>("credit")
  const [formData, setFormData] = useState<Partial<CardFormData>>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    email: "",
    termsAccepted: false,
  })
  const [errors, setErrors] = useState<Partial<Record<keyof CardFormData, string>>>({})

  const handleInputChange = (field: keyof CardFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    try {
      cardSchema.parse(formData)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof CardFormData, string>> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof CardFormData] = err.message
          }
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  const handleNext = () => {
    if (validateForm()) {
      router.push("/subscription/payment-summary")
    }
  }

  return (
    <div>
      <BackButton text="Método de pagamento" />

      <Card className="mt-4">
        <CardContent className="pt-6">
          <div className="space-y-6">
            <RadioGroup
              value={cardType}
              onValueChange={(value) => setCardType(value as CardType)}
              className="flex gap-4"
            >
              <div className="flex flex-1 items-center rounded-md border border-gray-200 bg-gray-50 px-4 py-3">
                <RadioGroupItem value="credit" id="credit" />
                <Label htmlFor="credit" className="flex-1 cursor-pointer pl-2">
                  Cartão de crédito
                </Label>
              </div>
              <div className="flex flex-1 items-center rounded-md border border-gray-200 bg-gray-50 px-4 py-3">
                <RadioGroupItem value="debit" id="debit" />
                <Label htmlFor="debit" className="flex-1 cursor-pointer pl-2">
                  Cartão de débito
                </Label>
              </div>
            </RadioGroup>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">
                  Número do cartão<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="cardNumber"
                  placeholder="**** **** **** ****"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                  className={errors.cardNumber ? "border-red-500" : ""}
                />
                {errors.cardNumber && <p className="text-xs text-red-500">{errors.cardNumber}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">
                    Data de validade<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/AA"
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                    className={errors.expiryDate ? "border-red-500" : ""}
                  />
                  {errors.expiryDate && <p className="text-xs text-red-500">{errors.expiryDate}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cvv">
                    CVV<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange("cvv", e.target.value)}
                    className={errors.cvv ? "border-red-500" : ""}
                  />
                  {errors.cvv && <p className="text-xs text-red-500">{errors.cvv}</p>}
                </div>
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

              <p className="text-sm text-gray-600">
                Sua assinatura será renovada automaticamente, você tem este método de pagamento recorrente.
              </p>

              <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Termos e condições</span>
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) => handleInputChange("termsAccepted", checked === true)}
                />
                <label
                  htmlFor="terms"
                  className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                    errors.termsAccepted ? "text-red-500" : ""
                  }`}
                >
                  Li e concordo com os termos de uso
                </label>
              </div>
              {errors.termsAccepted && <p className="text-xs text-red-500">{errors.termsAccepted}</p>}
            </div>

            <Button onClick={handleNext} className="w-full">
              Próximo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
