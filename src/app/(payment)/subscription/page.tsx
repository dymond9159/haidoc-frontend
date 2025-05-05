"use client"

import { BackButton } from "@/components/common"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation"
import { useState } from "react"

type RecurrenceOption = "monthly" | "semiannual" | "annual"

interface PriceOption {
  label: string
  value: RecurrenceOption
  price: number
  displayPrice: string
}

export default function SubscriptionPage() {
  const router = useRouter()
  const [selectedOption, setSelectedOption] = useState<RecurrenceOption>("monthly")

  const priceOptions: PriceOption[] = [
    { label: "Mensal", value: "monthly", price: 1499, displayPrice: "1.499 MZN/Mês" },
    { label: "Semestral", value: "semiannual", price: 8000, displayPrice: "8.000 MZN/Semestre" },
    { label: "Anual", value: "annual", price: 15200, displayPrice: "15.200 MZN/Ano" },
  ]

  const selectedPrice = priceOptions.find((option) => option.value === selectedOption)

  const handleNext = () => {
    router.push("/subscription/payment-method")
  }

  return (
    <div>
      <BackButton text="Escolha a recorrência do seu plano" />

      <Card className="mt-4">
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-medium text-gray-500">Plano escolhido</h2>
              <p className="text-lg font-medium text-secondary">HaiDoc Business Plus</p>
            </div>

            <div>
              <h2 className="text-sm font-medium text-gray-500">Valor total</h2>
              <p className="text-xl font-bold">{selectedPrice?.displayPrice}</p>
            </div>

            <div>
              <h2 className="mb-3 text-sm font-medium text-gray-500">Selecione a recorrência</h2>
              <RadioGroup
                value={selectedOption}
                onValueChange={(value) => setSelectedOption(value as RecurrenceOption)}
                className="space-y-3"
              >
                {priceOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center rounded-md border border-gray-200 bg-gray-50 px-4 py-3"
                  >
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="flex-1 cursor-pointer pl-2">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
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
