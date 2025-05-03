"use client"

import type React from "react"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectItem,
} from "@/components/ui/multi-select"
import { Asterisk, BackButton } from "@/components/common"
import { Card } from "@/components/ui/card"

// Service types mapping
const serviceTypesMap: Record<string, string> = {
  "pre-avaliacao": "Pré-avaliação",
  "entrega-medicamentos": "Serviço de entrega",
}

// Service values mapping (pre-defined values)
const serviceValuesMap: Record<string, string> = {
  "pre-avaliacao": "1500 MZN",
  "entrega-medicamentos": "2355 MZN",
}

// Plan options - updated to use value and label properties
const planOptions = [
  { value: "haidoc-individual", label: "HaiDoc individual" },
  { value: "haipatient", label: "HaiPatient" },
  { value: "haifamily", label: "HaiFamily" },
]

export default function ServicoFixoFeeForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const serviceType = searchParams.get("service") || "pre-avaliacao"
  const [selectedService, setSelectedService] = useState(serviceType)

  const [feeName, setFeeName] = useState("")
  const [selectedPlans, setSelectedPlans] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log({
      serviceType,
      feeName,
      plans: selectedPlans,
      value: serviceValuesMap[serviceType],
    })

    // Redirect back to the fees list
    router.push("/admin/taxes")
  }

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <div className="space-y-6">
        <div className="mb-6">
          <div className="mb-6">
            <BackButton text="Nova taxa" onClick={() => router.back()} />
          </div>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <h2 className="text-lg font-medium text-secondary mb-6">
              Selecione o serviço
            </h2>

            <div className="grid grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm mb-2">
                  Serviço <Asterisk />
                </label>
                <Select
                  value={selectedService}
                  onValueChange={setSelectedService}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue>
                      {serviceTypesMap[selectedService]}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(serviceTypesMap).map(([id, name]) => (
                      <SelectItem key={id} value={id}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Valor <Asterisk />
                </label>
                <Input
                  value={serviceValuesMap[serviceType]}
                  disabled
                  className="bg-gray-50"
                />
              </div>

              {selectedService === "entrega-medicamentos" && (
                <div>
                  <label className="block text-sm mb-2">
                    Porcentagem da taxa <Asterisk />
                  </label>
                  <Input placeholder="%" />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm mb-2">
                  Nome da taxa <Asterisk />
                </label>
                <Input
                  value={feeName}
                  onChange={(e) => setFeeName(e.target.value)}
                  placeholder="Digite aqui"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Plano <Asterisk />
                </label>
                {/* Pass the options prop to MultiSelect */}
                <MultiSelect
                  value={selectedPlans}
                  onChange={setSelectedPlans}
                  options={planOptions}
                  placeholder="Selecione o plano"
                >
                  <MultiSelectContent>
                    {planOptions.map((plan) => (
                      <MultiSelectItem key={plan.value} value={plan.value}>
                        {plan.label}
                      </MultiSelectItem>
                    ))}
                  </MultiSelectContent>
                </MultiSelect>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancelar
              </Button>
              <Button type="submit">Salvar</Button>
            </div>
          </form>
        </Card>
      </div>
    </Suspense>
  )
}
