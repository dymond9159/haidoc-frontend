"use client"

import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { BackButton } from "@/components/common"
import { useRouter } from "next/navigation"

enum PlanType {
  Patient = "patient",
  Business = "business",
}

interface PlanTypeSelectionProps {
  onSelect: (type: PlanType | null) => void
  onBack: () => void
}

export function PlanTypeSelection({
  onSelect,
  onBack,
}: PlanTypeSelectionProps) {
  const router = useRouter()

  const [selectedType, setSelectedType] = useState<PlanType>(PlanType.Patient)

  const handleSelect = () => {
    if (selectedType) {
      onSelect(selectedType)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <BackButton text="Planos" onClick={() => router.back()} />
      </div>

      <Card className="border-system-5">
        <CardContent className="pt-6">
          <h2 className="text-lg font-medium mb-4">Tipo do plano</h2>
          <p className="text-sm text-system-9 mb-6">
            Selecione o tipo de plano que deseja criar
          </p>

          <RadioGroup
            defaultValue={PlanType.Patient}
            value={selectedType || ""}
            onValueChange={(value) => setSelectedType(value as PlanType)}
            className="space-y-4 mb-6"
          >
            <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-system-1 transition-colors">
              <RadioGroupItem value={PlanType.Patient} id="patient" />
              <Label htmlFor="patient" className="cursor-pointer flex-1">
                Paciente
              </Label>
            </div>
            <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-system-1 transition-colors">
              <RadioGroupItem value={PlanType.Business} id="business" />
              <Label htmlFor="business" className="cursor-pointer flex-1">
                Business
              </Label>
            </div>
          </RadioGroup>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={onBack}>
              Cancelar
            </Button>
            <Button
              onClick={handleSelect}
              disabled={!selectedType}
              className="bg-primary-9 hover:bg-primary-10 text-white"
            >
              Próximo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
