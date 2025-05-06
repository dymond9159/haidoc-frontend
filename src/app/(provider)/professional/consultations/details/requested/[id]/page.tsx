"use client"

import { StatusLabel } from "@/components/common"
import { RequestConsultationActions } from "@/components/provider/consultation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import LinkButton from "@/components/ui/link"
import { ConsultationCategory, ConsultationType } from "@/types/provider/professional/types"
import { useParams, useRouter } from "next/navigation"

export default function RequestedConsultationPage() {
  const router = useRouter()
  const params = useParams()

  const handleReschedule = () => {
    router.push(`/professional/consultas/reagendar/${params.id}`)
  }

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <LinkButton href="" direction="left" variant="default" onClick={() => router.back()}>
          Consulta Solicitada
        </LinkButton>
      </div>

      <Card className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border">
              <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Nome do paciente" />
              <AvatarFallback>NP</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-medium">Nome do paciente</h2>
              <p className="text-sm text-gray-500">ID do paciente: #44825</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm text-gray-500 mb-2">Tipo de Consulta:</h3>
            <StatusLabel status={ConsultationType.Urgent} className="m-0" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div>
            <h3 className="text-sm text-gray-500 mb-2">Hora de início</h3>
            <p className="text-base font-medium">11:00</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500 mb-2">Hora final</h3>
            <p className="text-base font-medium">12:00</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500 mb-2">Data da Consulta</h3>
            <p className="text-base font-medium">22/09/2023</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500 mb-2">Especialidade</h3>
            <p className="text-base font-medium">Cardiologia</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500 mb-2">Médico</h3>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/images/placeholder.svg?height=24&width=24" alt="Nome do Médico" />
                <AvatarFallback>NM</AvatarFallback>
              </Avatar>
              <p className="text-base font-medium">Nome do Médico</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm text-gray-500 mb-2">Valor</h3>
            <p className="text-base font-medium">250,00 MZN</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500 mb-2">Categoria</h3>
            <StatusLabel status={ConsultationCategory.Teleconsultation} className="m-0" />
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-sm text-gray-500 mb-2">Motivo da Consulta</h3>
          <p className="text-base font-medium">Motivo da consulta do paciente</p>
        </div>

        <div className="flex flex-wrap gap-3 justify-end">
          <RequestConsultationActions />
        </div>
      </Card>
    </div>
  )
}
