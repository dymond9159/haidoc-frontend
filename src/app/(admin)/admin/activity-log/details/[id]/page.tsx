"use client"

import { MetricCard } from "@/components/cards/metric-card"
import { ProfileCard } from "@/components/cards/profile-card"
import { BackButton } from "@/components/common"
import { BloodPressureIcon, FileCopyIcon, HistoryIcon, UserSettingsIcon } from "@/components/icons"
import { useToast } from "@/hooks/use-toast"
import { ThemeColor } from "@/lib/constants"
import Image from "next/image"
import { useRouter } from "nextjs-toploader/app"
import { useState } from "react"

import {
  AuthorizationRequestDialog,
  AuthorizationRequestType,
} from "@/components/admin/activity-log/authorization-request-dialog"
import { formatDate } from "@/lib/utils"

interface ActivityProfileDetailPageProps {
  activityId: string
}

export default function ActivityProfileDetailPage({ activityId }: ActivityProfileDetailPageProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [showMedicalHistoryModal, setShowMedicalHistoryModal] = useState(false)
  const [showDocumentsModal, setShowDocumentsModal] = useState(false)

  const patient = {
    id: activityId,
    name: "Nome do Paciente",
    image: "/images/placeholder.svg?height=200&width=200",
    consultations: 10,
    collections: 0,
    purchases: 5,
  }

  const currentDate = formatDate(new Date())

  const handleSendRequest = (type: AuthorizationRequestType) => {
    toast({
      title: "Solicitação enviada",
      description: `Solicitação de acesso ${
        type === "medical" ? "ao histórico médico" : "aos documentos anexados"
      } enviada com sucesso para ${patient.name}.`,
      duration: 5000,
    })

    // Close the corresponding modal after sending the request
    if (type === "medical") {
      setShowMedicalHistoryModal(false)
    } else {
      setShowDocumentsModal(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <BackButton text="Perfil do paciente" onClick={() => router.back()} />
      </div>
      {/* Profile Header and Metric Cards (remain the same) */}
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="col-span-1 flex flex-col md:flex-row gap-6 mb-8 items-center">
          <div className="flex-shrink-0">
            <div className="relative w-24 h-24 border rounded-full overflow-hidden">
              <Image
                src={patient.image || "/images/placeholder.svg"}
                alt={patient.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-semibold">{patient.name}</h1>
            <p className="text-gray-500">ID: {patient.id}</p>
          </div>
        </div>
        <div className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard title="Consultas Realizadas" value={patient.consultations} />
          <MetricCard title="Colheitas Realizadas" value={patient.collections} />
          <MetricCard title="Compras Realizadas" value={patient.purchases} />
        </div>
      </div>

      {/* Profile Cards (remain the same, triggering modal state changes) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileCard
          title="Informações Cadastrais"
          icon={<UserSettingsIcon size={"24"} fill={ThemeColor.secondary[11]} />}
          href={`/admin/activity-log/details/${activityId}/activity`}
        />
        <ProfileCard
          title="Histórico Médico"
          icon={<BloodPressureIcon size={"24"} fill={ThemeColor.secondary[11]} />}
          onClick={() => setShowMedicalHistoryModal(true)} // Trigger state change
        />
        <ProfileCard
          title="Documentos Anexados"
          icon={<FileCopyIcon size={"24"} fill={ThemeColor.secondary[11]} />}
          onClick={() => setShowDocumentsModal(true)}
        />
        <ProfileCard
          title="Atividade do Usuário"
          icon={<HistoryIcon size={"24"} fill={ThemeColor.secondary[11]} />}
          href={`/admin/activity-log/details/${activityId}/activity`}
        />
      </div>

      {/* Render the reusable dialog for Medical History */}
      <AuthorizationRequestDialog
        open={showMedicalHistoryModal}
        onOpenChange={setShowMedicalHistoryModal}
        requestType="medical"
        patientName={patient.name}
        onConfirm={handleSendRequest}
        currentDate={currentDate}
      />

      {/* Render the reusable dialog for Documents */}
      <AuthorizationRequestDialog
        open={showDocumentsModal}
        onOpenChange={setShowDocumentsModal}
        requestType="documents"
        patientName={patient.name}
        onConfirm={handleSendRequest}
        currentDate={currentDate}
      />
    </div>
  )
}
