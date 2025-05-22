"use client"

import { BackButton } from "@/components/common"
import { ConsultationHistoryTable, PatientProfile } from "@/components/provider/chat"
import { useParams } from "next/navigation"
import { useState } from "react"

export default function PatientProfilePage() {
  const params = useParams()
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false)

  return (
    <div className="h-full space-y-8">
      <div>
        <BackButton text="Perfil do Paciente" />
      </div>
      <div>
        <PatientProfile patientId={params.id as string} />
        <div className="mt-8">
          <h2 className="text-lg font-medium mb-4">Histórico de Consultas</h2>
          <ConsultationHistoryTable />
        </div>
      </div>
    </div>
  )
}
