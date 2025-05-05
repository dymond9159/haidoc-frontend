import { MetricCard } from "@/components/cards"
import { Avatar } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"

interface PatientProfileProps {
  patientId: string
}

export function PatientProfile({ patientId }: PatientProfileProps) {
  // In a real app, you would fetch patient data from an API
  const patient = {
    id: patientId,
    name: "Nome do Paciente",
    avatar: "/images/placeholder.svg?height=80&width=80",
    metrics: {
      consultationsCompleted: 10,
      chatsFinalized: 0,
      consultationsCanceled: 5,
    },
  }

  return (
    <Card className="flex flex-col md:flex-row items-start md:items-center gap-4">
      <Avatar className="h-16 w-16 md:h-20 md:w-20 border border-secondary">
        <img src={patient.avatar || "/images/placeholder.svg"} alt={patient.name} />
      </Avatar>
      <div>
        <h1 className="text-xl font-semibold">{patient.name}</h1>
        <p className="text-gray-500 text-sm">ID: {patient.id}</p>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard className="w-full" title="Consultas Realizadas" value={patient.metrics.consultationsCompleted} />
        <MetricCard className="w-full" title="Chats Finalizados" value={patient.metrics.chatsFinalized} />
        <MetricCard className="w-full" title="Consultas Canceladas" value={patient.metrics.consultationsCanceled} />
      </div>
    </Card>
  )
}
