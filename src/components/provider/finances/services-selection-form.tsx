"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { PlanRegistrationSteps } from "./plan-registration-steps"
import { Asterisk, BackButton } from "@/components/common"
import { useRouter } from "next/navigation"

interface ServicesSelectionFormProps {
  onSubmit: (data: any) => void
  onBack: () => void
}

interface formProps {
  clinicConsults: {
    normal: string
    urgent: string
    followup: string
  }
  homeConsults: string
  teleconsults: string
  chatConsults: string
  preEvaluations: string
  medicineDelivery: string
}

export function ServicesSelectionForm({
  onSubmit,
  onBack,
}: ServicesSelectionFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<formProps>({
    clinicConsults: {
      normal: "1",
      urgent: "1",
      followup: "1",
    },
    homeConsults: "1",
    teleconsults: "1",
    chatConsults: "1",
    preEvaluations: "1",
    medicineDelivery: "1",
  })

  const [isFormValid, setIsFormValid] = useState(false)

  const steps = [
    { id: "info", number: 1, title: "Informações cadastrais" },
    { id: "services", number: 2, title: "Serviços grátis inclusos" },
  ]

  const handleChange = (category: string, field: string, value: string) => {
    if (category) {
      setFormData({
        ...formData,
        [category]: {
          ...(formData[category as keyof typeof formData] as Record<
            string,
            any
          >),
          [field]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [field]: value,
      })
    }
  }
  const validateForm = () => {
    // Add validation logic if needed
    return true
  }

  useEffect(() => {
    const isValid = validateForm()
    setIsFormValid(isValid)
  }, [formData])

  const handleSubmit = () => {
    if (isFormValid) {
      onSubmit(formData)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <BackButton
          onClick={() => router.back()}
          text="Cadastro de novo plano"
        />
      </div>

      <PlanRegistrationSteps steps={steps} currentStep={2} />

      <div className="space-y-6">
        <h3 className="text-sm font-semibold">
          Selecione o número de serviços grátis disponíveis em cada modalidade
        </h3>
        <Accordion
          type="single"
          collapsible
          defaultValue="clinic"
          className="w-full"
        >
          <AccordionItem value="clinic">
            <AccordionTrigger className="text-secondary-11 font-medium">
              Presencialmente na clínica
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="normal-consult" className="text-xs">
                    Consulta normal
                    <Asterisk />
                  </Label>
                  <div className="flex">
                    <Input
                      id="normal-consult"
                      type="number"
                      placeholder="Digite aqui"
                      value={formData.clinicConsults.normal}
                      onChange={(e) =>
                        handleChange("clinicConsults", "normal", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2 mt-2">
                    <Label htmlFor="normal-max" className="text-xs">
                      Valor máximo
                      <Asterisk />
                    </Label>
                    <Input id="normal-max" placeholder="Digite aqui" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="urgent-consult" className="text-xs">
                    Consulta urgente
                    <Asterisk />
                  </Label>
                  <div className="flex">
                    <Input
                      id="urgent-consult"
                      type="number"
                      placeholder="Digite aqui"
                      value={formData.clinicConsults.urgent}
                      onChange={(e) =>
                        handleChange("clinicConsults", "urgent", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2 mt-2">
                    <Label htmlFor="urgent-max" className="text-xs">
                      Valor máximo
                      <Asterisk />
                    </Label>
                    <Input id="urgent-max" placeholder="Digite aqui" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="followup-consult" className="text-xs">
                    Consulta de seguimento
                    <Asterisk />
                  </Label>
                  <div className="flex">
                    <Input
                      id="followup-consult"
                      type="number"
                      placeholder="Digite aqui"
                      value={formData.clinicConsults.followup}
                      onChange={(e) =>
                        handleChange(
                          "clinicConsults",
                          "followup",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2 mt-2">
                    <Label htmlFor="followup-max" className="text-xs">
                      Valor máximo
                      <Asterisk />
                    </Label>
                    <Input id="followup-max" placeholder="Digite aqui" />
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="home">
            <AccordionTrigger className="text-secondary-11 font-medium">
              A domicílio
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 gap-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="home-consult" className="text-xs">
                    Consulta a domicílio
                    <Asterisk />
                  </Label>
                  <div className="flex">
                    <Input
                      id="home-consult"
                      type="number"
                      placeholder="Digite aqui"
                      value={formData.homeConsults}
                      onChange={(e) =>
                        handleChange("", "homeConsults", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2 mt-2">
                    <Label htmlFor="home-max" className="text-xs">
                      Valor máximo
                      <Asterisk />
                    </Label>
                    <Input id="home-max" placeholder="Digite aqui" />
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="teleconsult">
            <AccordionTrigger className="text-secondary-11 font-medium">
              Teleconsulta
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 gap-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="teleconsult" className="text-xs">
                    Teleconsulta
                    <Asterisk />
                  </Label>
                  <div className="flex">
                    <Input
                      id="teleconsult"
                      type="number"
                      placeholder="Digite aqui"
                      value={formData.teleconsults}
                      onChange={(e) =>
                        handleChange("", "teleconsults", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2 mt-2">
                    <Label htmlFor="teleconsult-max" className="text-xs">
                      Valor máximo
                      <Asterisk />
                    </Label>
                    <Input id="teleconsult-max" placeholder="Digite aqui" />
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">
              Selecione o número de consultas por Chat Rápido:
            </Label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="space-y-2">
                <Label htmlFor="chat-consult" className="text-xs">
                  Consultas por Chat Rápido
                  <Asterisk />
                </Label>
                <div className="flex">
                  <Input
                    id="chat-consult"
                    type="number"
                    placeholder="Digite aqui"
                    value={formData.chatConsults}
                    onChange={(e) =>
                      handleChange("", "chatConsults", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="chat-max" className="text-xs">
                  Valor máximo
                  <Asterisk />
                </Label>
                <Input id="chat-max" placeholder="Digite aqui" />
              </div>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">
              Selecione os serviços disponíveis apenas para Maputo:
            </Label>
            <div className="grid grid-cols-3 gap-4 mt-2">
              <div className="space-y-2">
                <Label htmlFor="pre-evaluation" className="text-xs">
                  Pré-avaliação
                  <Asterisk />
                </Label>
                <div className="flex">
                  <Input
                    id="pre-evaluation"
                    type="number"
                    placeholder="Digite aqui"
                    value={formData.preEvaluations}
                    onChange={(e) =>
                      handleChange("", "preEvaluations", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="medicine-delivery" className="text-xs">
                  Entrega de medicamento
                  <Asterisk />
                </Label>
                <div className="flex">
                  <Input
                    id="medicine-delivery"
                    type="number"
                    placeholder="Digite aqui"
                    value={formData.medicineDelivery}
                    onChange={(e) =>
                      handleChange("", "medicineDelivery", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="home-consult-maputo" className="text-xs">
                  Consulta a domicílio
                  <Asterisk />
                </Label>
                <div className="flex">
                  <Input
                    id="home-consult-maputo"
                    type="number"
                    placeholder="Digite aqui"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button variant="outline" onClick={onBack}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={!isFormValid}>
            Cadastrar
          </Button>
        </div>
      </div>
    </div>
  )
}
