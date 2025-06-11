"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

export default function DadosPagamentoPage() {
  const params = useParams()
  const router = useRouter()
  const [cardType, setCardType] = useState<string>("credit")
  const [formData, setFormData] = useState({
    cardNumber: "0000 0000 0000 0000",
    expiryDate: "12/30",
    cvv: "123",
    email: "email@example.com",
  })
  const [termsAccepted, setTermsAccepted] = useState(true)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (formData.cardNumber && formData.expiryDate && formData.cvv && formData.email && termsAccepted) {
      router.push(`/exames/payment-revision/${params.id}`)
    }
  }

  const handleBack = () => {
    router.back()
  }

  const isFormValid = formData.cardNumber && formData.expiryDate && formData.cvv && formData.email && termsAccepted

  return (
    <div className="space-y-8">
      <div className="bg-white border border-system-6 rounded-lg p-8">
        <h2 className="text-lg font-medium mb-6 text-center text-system-10">Como deseja realizar o pagamento?</h2>

        {/* Card Type Selection */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              cardType === "credit"
                ? "border-haidoc-blue bg-haidoc-lightBlue"
                : "border-system-6 bg-white hover:bg-system-2"
            }`}
            onClick={() => setCardType("credit")}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="cardType"
                value="credit"
                checked={cardType === "credit"}
                onChange={() => setCardType("credit")}
                className="w-4 h-4 text-haidoc-blue border-system-6 focus:ring-haidoc-blue"
              />
              <label className="text-sm font-medium cursor-pointer">Cartão de crédito</label>
            </div>
          </div>

          <div
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              cardType === "debit"
                ? "border-haidoc-blue bg-haidoc-lightBlue"
                : "border-system-6 bg-white hover:bg-system-2"
            }`}
            onClick={() => setCardType("debit")}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="cardType"
                value="debit"
                checked={cardType === "debit"}
                onChange={() => setCardType("debit")}
                className="w-4 h-4 text-haidoc-blue border-system-6 focus:ring-haidoc-blue"
              />
              <label className="text-sm font-medium cursor-pointer">Cartão de débito</label>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <Label htmlFor="cardNumber" className="text-sm font-medium">
                Número do cartão<span className="text-haidoc-red">*</span>
              </Label>
              <Input
                id="cardNumber"
                value={formData.cardNumber}
                onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                placeholder="0000 0000 0000 0000"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="expiryDate" className="text-sm font-medium">
                Data de validade<span className="text-haidoc-red">*</span>
              </Label>
              <Input
                id="expiryDate"
                value={formData.expiryDate}
                onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                placeholder="12/30"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="cvv" className="text-sm font-medium">
                CVV<span className="text-haidoc-red">*</span>
              </Label>
              <Input
                id="cvv"
                value={formData.cvv}
                onChange={(e) => handleInputChange("cvv", e.target.value)}
                placeholder="123"
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium">
              E-mail<span className="text-haidoc-red">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="email@example.com"
              className="mt-1"
            />
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="bg-haidoc-lightBlue border border-haidoc-blue rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-haidoc-blue">
                <path
                  d="M14 3H2C1.44772 3 1 3.44772 1 4V12C1 12.5523 1.44772 13 2 13H14C14.5523 13 15 12.5523 15 12V4C15 3.44772 14.5523 3 14 3Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 6H15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm font-medium text-haidoc-blue">Termos e condições</span>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-haidoc-blue ml-auto">
              <path
                d="M6 12L10 8L6 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="w-4 h-4 text-haidoc-blue border-haidoc-blue rounded focus:ring-haidoc-blue"
            />
            <label htmlFor="terms" className="text-sm text-haidoc-blue">
              Li e concordo com os termos de uso
            </label>
          </div>
        </div>

        <div className="flex gap-4">
          <Button variant="ghost" onClick={handleBack} className="flex-1">
            Voltar
          </Button>
          <Button
            onClick={handleNext}
            disabled={!isFormValid}
            className="flex-1 bg-haidoc-red hover:bg-primary-11 text-white"
          >
            Revisar Pagamento
          </Button>
        </div>
      </div>
    </div>
  )
}
