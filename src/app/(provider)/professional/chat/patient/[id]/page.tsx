"use client"

import { ConsultationHistoryTable, PatientProfile } from "@/components/provider/chat"
import LinkButton from "@/components/ui/link"
import { useParams } from "next/navigation"
import { useState } from "react"

export default function PatientProfilePage() {
  const params = useParams()
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false)

  return (
    <div className="h-full">
      <div className="py-4 border-b">
        <LinkButton href="/professional/chat" variant="default" direction="left">
          Perfil do Paciente
        </LinkButton>
      </div>
      <div className="py-6">
        <PatientProfile patientId={params.id as string} />
        <div className="mt-8">
          <h2 className="text-lg font-medium mb-4">Histórico de Consultas</h2>
          <ConsultationHistoryTable />
        </div>
      </div>
    </div>
  )
}
