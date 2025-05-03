"use client"

import type React from "react"

import { Asterisk, BackButton } from "@/components/common"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useState } from "react"

// Service types mapping
const serviceTypesMap: Record<string, string> = {
  "consulta-normal": "Consulta normal",
  "consulta-urgente": "Consulta urgente",
  "consulta-seguimento": "Consulta de seguimento",
  "consulta-chat": "Consulta por chat rápido",
}

// Category options
const categoryOptions = [
  { id: "clinica", name: "Na clínica" },
  { id: "domicilio", name: "Á domicílio" },
  { id: "teleconsulta", name: "Teleconsulta" },
]

// Plan options
const planOptions = [
  { value: "haidoc-individual", label: "HaiDoc individual" },
  { value: "haipatient", label: "HaiPatient" },
  { value: "haifamily", label: "HaiFamily" },
]

export interface ParameterItem {
  id: number
  minValue: string
  maxValue: string
  percentage: string
}

export default function ConsultaFeeForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const serviceType = searchParams.get("service") || "consulta-normal"
  const [selectedService, setSelectedService] = useState(serviceType)

  const [feeName, setFeeName] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedPlans, setSelectedPlans] = useState<string[]>([])
  const [parameters, setParameters] = useState<ParameterItem[]>([
    { id: 1, minValue: "", maxValue: "", percentage: "" },
  ])

  const addParameter = () => {
    const newId =
      parameters.length > 0 ? Math.max(...parameters.map((p) => p.id)) + 1 : 1

    setParameters([
      ...parameters,
      { id: newId, minValue: "", maxValue: "", percentage: "" },
    ])
  }

  const updateParameter = (
    id: number,
    field: keyof ParameterItem,
    value: string,
  ) => {
    setParameters(
      parameters.map((param) =>
        param.id === id ? { ...param, [field]: value } : param,
      ),
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log({
      serviceType,
      category: selectedCategory,
      feeName,
      plans: selectedPlans,
      parameters,
    })

    // Redirect back to the fees list
    router.push("/admin/taxes")
  }

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <div className="space-y-6">
        <div className="mb-6">
          <BackButton text="Nova taxa" onClick={() => router.back()} />
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <h3 className="text-lg font-medium text-secondary mb-4">Serviço</h3>
            <div className="grid grid-cols-2 gap-6 mb-6">
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

              {selectedService !== "consulta-chat" && (
                <div>
                  <label className="block text-sm mb-2">
                    Categoria <Asterisk />
                  </label>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                <MultiSelect
                  options={planOptions}
                  value={selectedPlans}
                  onChange={setSelectedPlans}
                >
                  <MultiSelectTrigger>
                    <MultiSelectValue />
                  </MultiSelectTrigger>
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

            <h3 className="text-lg font-medium text-secondary mb-4">
              Parametrização
            </h3>

            {parameters.map((param, index) => (
              <div key={param.id} className="mb-6">
                <h4 className="text-sm font-medium mb-3">
                  Parâmetro {index + 1}
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm mb-2">
                      Valor mínimo <Asterisk />
                    </label>
                    <Input
                      value={param.minValue}
                      onChange={(e) =>
                        updateParameter(param.id, "minValue", e.target.value)
                      }
                      placeholder="Digite aqui"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2">
                      Valor máximo <Asterisk />
                    </label>
                    <Input
                      value={param.maxValue}
                      onChange={(e) =>
                        updateParameter(param.id, "maxValue", e.target.value)
                      }
                      placeholder="Digite aqui"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2">
                      Porcentagem da taxa <Asterisk />
                    </label>
                    <Input
                      value={param.percentage}
                      onChange={(e) =>
                        updateParameter(param.id, "percentage", e.target.value)
                      }
                      placeholder="%"
                    />
                  </div>
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="ghost"
              className="text-primary mb-6"
              onClick={addParameter}
            >
              <Plus size={16} className="mr-2" />
              Novo parâmetro
            </Button>

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
