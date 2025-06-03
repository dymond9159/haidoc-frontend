"use client"

import { Button } from "@/components/ui/button"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

const paymentMethods = [
  { id: "cards", label: "Cartões Crédito e Débito" },
  { id: "mpesa", label: "M-Pesa" },
  { id: "emola", label: "E-Mola" },
  { id: "paypal", label: "Paypal" },
]

export default function MetodoPagamentoPage() {
  const params = useParams()
  const router = useRouter()
  const [selectedMethod, setSelectedMethod] = useState<string>("cards")

  const handleNext = () => {
    if (selectedMethod) {
      router.push(`/exames/dados-pagamento/${params.id}`)
    }
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="space-y-8">
      <div className="bg-white border border-system-6 rounded-lg p-8">
        <h2 className="text-lg font-medium mb-6 text-center text-system-10">Como deseja realizar o pagamento?</h2>

        <div className="space-y-4 mb-8">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                selectedMethod === method.id
                  ? "border-haidoc-blue bg-haidoc-lightBlue"
                  : "border-system-6 bg-white hover:bg-system-2"
              }`}
              onClick={() => setSelectedMethod(method.id)}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={selectedMethod === method.id}
                    onChange={() => setSelectedMethod(method.id)}
                    className="w-4 h-4 text-haidoc-blue border-system-6 focus:ring-haidoc-blue"
                  />
                </div>
                <label className="text-sm font-medium cursor-pointer">{method.label}</label>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <Button variant="ghost" onClick={handleBack} className="flex-1">
            Voltar
          </Button>
          <Button
            onClick={handleNext}
            disabled={!selectedMethod}
            className="flex-1 bg-haidoc-red hover:bg-primary-11 text-white"
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  )
}
