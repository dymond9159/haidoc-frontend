"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
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
import { useToast } from "@/hooks/use-toast"
import { Asterisk, BackButton, Loading } from "@/components/common"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Service types mapping
const serviceTypesMap: Record<string, string> = {
  "consulta-normal": "Consulta normal",
  "consulta-urgente": "Consulta urgente",
  "consulta-seguimento": "Consulta de seguimento",
  "consulta-chat": "Consulta por chat rápido",
  "pre-avaliacao": "Pré avaliação",
  "entrega-medicamentos": "Entrega de medicamentos",
}

// Category options
const categoryOptions = [
  { value: "clinica", label: "Na clínica" },
  { value: "domicilio", label: "Á domicílio" },
  { value: "teleconsulta", label: "Teleconsulta" },
]

// Plan options
const planOptions = [
  { value: "haidoc-individual", label: "HaiDoc individual" },
  { value: "haipatient", label: "HaiPatient" },
  { value: "haifamily", label: "HaiFamily" },
]

interface ParameterItem {
  id: number
  minValue: string
  maxValue: string
  percentage: string
}

// Mock data for demonstration
const mockFeeData = {
  id: "1",
  name: "Taxa de Consulta Normal",
  service: "consulta-normal",
  category: "clinica",
  plans: ["haidoc-individual", "haifamily"],
  parameters: [
    { id: 1, minValue: "100", maxValue: "500", percentage: "25" },
    { id: 2, minValue: "501", maxValue: "1000", percentage: "20" },
  ],
  isActive: true,
}

export default function EditTaxPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const id = params.id as string

  const [isLoading, setIsLoading] = useState(true)
  const [isActive, setIsActive] = useState(true)
  const [feeName, setFeeName] = useState("")
  const [selectedService, setSelectedService] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedPlans, setSelectedPlans] = useState<string[]>([])
  const [parameters, setParameters] = useState<ParameterItem[]>([])

  // Fetch fee data
  useEffect(() => {
    // In a real app, you would fetch the data from an API
    // For now, we'll use mock data
    setIsLoading(false)
    setIsActive(mockFeeData.isActive)
    setFeeName(mockFeeData.name)
    setSelectedService(mockFeeData.service)
    setSelectedCategory(mockFeeData.category)
    setSelectedPlans(mockFeeData.plans)
    setParameters(mockFeeData.parameters)
  }, [id])

  const addParameter = () => {
    if (!isActive) return

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
    if (!isActive) return

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
      id,
      isActive,
      service: selectedService,
      category: selectedCategory,
      feeName,
      plans: selectedPlans,
      parameters,
    })

    toast({
      title: "Taxa atualizada",
      description: "A taxa foi atualizada com sucesso.",
    })

    // Redirect back to the fees list
    router.push("/admin/taxes")
  }

  const handleToggleActive = (checked: boolean) => {
    setIsActive(checked)
  }

  if (isLoading) {
    return <Loading />
  }

  const showCategory = [
    "consulta-normal",
    "consulta-urgente",
    "consulta-seguimento",
  ].includes(selectedService)
  const isFixedService = ["pre-avaliacao", "entrega-medicamentos"].includes(
    selectedService,
  )

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <BackButton text="Editar taxa" onClick={() => router.back()} />
      </div>

      <Card>
        <div className="mb-6 flex items-center">
          <Switch
            id="taxa-ativa"
            checked={isActive}
            onCheckedChange={handleToggleActive}
          />
          <Label htmlFor="taxa-ativa" className="ml-2">
            Taxa {isActive ? "ativa" : "inativa"}
          </Label>
        </div>
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-medium text-cyan-600 mb-6">
            Selecione o serviço
          </h2>

          <div
            className={`grid ${
              showCategory
                ? "grid-cols-2"
                : isFixedService
                  ? "grid-cols-2"
                  : "grid-cols-1"
            } gap-6 mb-6`}
          >
            <div>
              <label className="block text-sm mb-2">
                Serviço <Asterisk />
              </label>
              <Select
                value={selectedService}
                onValueChange={setSelectedService}
                disabled={!isActive}
              >
                <SelectTrigger
                  className={cn("w-full", !isActive ? "bg-gray-100" : "")}
                >
                  <SelectValue>{serviceTypesMap[selectedService]}</SelectValue>
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

            {showCategory && (
              <div>
                <label className="block text-sm mb-2">
                  Categoria <Asterisk />
                </label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                  disabled={!isActive}
                >
                  <SelectTrigger
                    className={cn("w-full", !isActive ? "bg-gray-100" : "")}
                  >
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {isFixedService && (
              <div>
                <label className="block text-sm mb-2">
                  Valor <Asterisk />
                </label>
                <Input
                  value={
                    selectedService === "pre-avaliacao"
                      ? "1500 MZN"
                      : "2355 MZN"
                  }
                  disabled
                  className="bg-gray-100"
                />
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
                disabled={!isActive}
                className={!isActive ? "bg-gray-100" : ""}
              />
            </div>

            <div>
              <label className="block text-sm mb-2">
                Plano <Asterisk />
              </label>
              <MultiSelect
                value={selectedPlans}
                onChange={setSelectedPlans}
                options={planOptions}
                placeholder="Selecione o plano"
                className={!isActive ? "bg-gray-100" : ""}
                disabled={!isActive}
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

          {!isFixedService && (
            <>
              <h3 className="text-lg font-medium text-cyan-600 mb-4">
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
                        disabled={!isActive}
                        className={!isActive ? "bg-gray-100" : ""}
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
                        disabled={!isActive}
                        className={!isActive ? "bg-gray-100" : ""}
                      />
                    </div>

                    <div>
                      <label className="block text-sm mb-2">
                        Porcentagem da taxa
                        <Asterisk />
                      </label>
                      <Input
                        value={param.percentage}
                        onChange={(e) =>
                          updateParameter(
                            param.id,
                            "percentage",
                            e.target.value,
                          )
                        }
                        placeholder="Digite aqui"
                        disabled={!isActive}
                        className={!isActive ? "bg-gray-100" : ""}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="ghost"
                className="text-primary-9 mb-6"
                onClick={addParameter}
                disabled={!isActive}
              >
                <Plus size={16} className="mr-2" />
                Novo parâmetro
              </Button>
            </>
          )}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={!isActive}>
              Salvar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
