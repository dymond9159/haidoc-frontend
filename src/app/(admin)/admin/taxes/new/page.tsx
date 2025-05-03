"use client"

import { Asterisk, BackButton } from "@/components/common"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "nextjs-toploader/app"
import { useState } from "react"

// Service types
const serviceTypes = [
  { id: "consulta-normal", name: "Consulta normal" },
  { id: "consulta-urgente", name: "Consulta urgente" },
  { id: "consulta-seguimento", name: "Consulta de seguimento" },
  { id: "consulta-chat", name: "Consulta por chat rápido" },
  { id: "pre-avaliacao", name: "Pré avaliação" },
  { id: "entrega-medicamentos", name: "Serviço de entrega" },
]

export default function NovaFeeServiceSelection() {
  const router = useRouter()
  const [selectedService, setSelectedService] = useState("")

  const handleServiceChange = (value: string) => {
    setSelectedService(value)

    // Redirect to the appropriate form based on service selection
    switch (value) {
      case "consulta-normal":
      case "consulta-urgente":
      case "consulta-seguimento":
      case "consulta-chat":
        router.push(`/admin/taxes/new/consultation?service=${value}`)
        break
      case "pre-avaliacao":
      case "entrega-medicamentos":
        router.push(`/admin/taxes/new/flexible-service?service=${value}`)
        break
    }
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <BackButton text="Nova taxa" onClick={() => router.back()} />
      </div>

      <Card>
        <h2 className="text-lg font-medium text-secondary mb-6">Selecione o serviço</h2>

        <div className="mb-6">
          <label className="block text-sm mb-2">
            Serviço <Asterisk />
          </label>
          <Select onValueChange={handleServiceChange} value={selectedService}>
            <SelectTrigger className="w-full md:w-1/2">
              <SelectValue placeholder="Selecione o serviço" />
            </SelectTrigger>
            <SelectContent>
              {serviceTypes.map((service) => (
                <SelectItem key={service.id} value={service.id}>
                  {service.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>
    </div>
  )
}
