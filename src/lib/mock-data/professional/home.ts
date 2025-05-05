import { RequestConsultationColumns } from "@/types/provider/professional/interface-columns"
import { RequestConsultationCategory } from "@/types/provider/professional/types"

export const mockMessages = [
  {
    sender: "Elisângelo Magalhães",
    message: "Olá, gostaria de tirar uma dúvida...",
    time: "14:32",
    unreadCount: 2,
  },
  {
    sender: "Elisângelo Magalhães",
    message: "Olá, gostaria de tirar uma dúvida...",
    time: "14:32",
    unreadCount: 1,
  },
  {
    sender: "Elisângelo Magalhães",
    message: "Olá, gostaria de tirar uma dúvida...",
    time: "14:32",
    unreadCount: 2,
  },
  {
    sender: "Elisângelo Magalhães",
    message: "Olá, gostaria de tirar uma dúvida...",
    time: "14:32",
    unreadCount: 2,
  },
]

export const mockAppointments = [
  {
    id: "1",
    patientName: "Nome do paciente",
    doctorName: "Dr. João Silva",
    startTime: "8:00",
    endTime: "9:00",
  },
  {
    id: "2",
    patientName: "Nome do paciente",
    doctorName: "Dr. João Silva",
    startTime: "8:00",
    endTime: "9:00",
  },
  {
    id: "3",
    patientName: "Nome do paciente",
    doctorName: "Dr. João Silva",
    startTime: "8:00",
    endTime: "9:00",
  },
]

export const mockConsultationRequests: RequestConsultationColumns[] = [
  {
    id: "1",
    name: "Nome da clínica, do médico, ou do paciente",
    category: RequestConsultationCategory.Teleconsultation,
    date: "08/07/24",
    time: "18:45",
  },
  {
    id: "2",
    name: "Nome da clínica, do médico, ou do paciente",
    category: RequestConsultationCategory.Chat,
    date: "08/07/24",
    time: "18:45",
  },
  {
    id: "3",
    name: "Nome da clínica, do médico, ou do paciente",
    category: RequestConsultationCategory.Home,
    date: "08/07/24",
    time: "18:45",
    isAccepted: true,
  },
  {
    id: "4",
    name: "Nome da clínica, do médico, ou do paciente",
    category: RequestConsultationCategory.Teleconsultation,
    date: "08/07/24",
    time: "18:45",
  },
  {
    id: "5",
    name: "Nome da clínica, do médico, ou do paciente",
    category: RequestConsultationCategory.Teleconsultation,
    date: "08/07/24",
    time: "18:45",
  },
]
