import { ConsultationColumns, RequestConsultationColumns } from "@/types/provider/professional/interface-columns"
import { ConsultationCategory, ConsultationType } from "@/types/provider/professional/types"

import { faker } from "@faker-js/faker"

function generateMockConsultationRequests(count: number = 10): RequestConsultationColumns[] {
  return Array.from({ length: count }).map((_, i) => ({
    id: (i + 1).toString(),
    name: faker.company.name() + ", " + faker.person.fullName(),
    category: faker.helpers.arrayElement([
      ConsultationCategory.Teleconsultation,
      ConsultationCategory.Chat,
      ConsultationCategory.Home,
    ]),
    date: faker.date.soon().toLocaleDateString("pt-BR"),
    time: faker.date.soon().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    isAccepted: faker.datatype.boolean(),
  }))
}

export const mockConsultationRequests = generateMockConsultationRequests(20)

function generateMockConsultations(count: number = 10): ConsultationColumns[] {
  return Array.from({ length: count }).map((_, i) => ({
    id: (i + 1).toString(),
    name: `${faker.company.name()}, ${faker.person.fullName()}`,
    category: faker.helpers.arrayElement([
      ConsultationCategory.Teleconsultation,
      ConsultationCategory.Chat,
      ConsultationCategory.Home,
    ]),
    consultationType: faker.helpers.arrayElement([
      ConsultationType.Normal,
      ConsultationType.Urgent,
      ConsultationType.FollowUp,
    ]),
    date: faker.date.future().toLocaleDateString("pt-BR"),
    time: faker.date.soon().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
  }))
}

export const mockConsultations = generateMockConsultations(20)

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
