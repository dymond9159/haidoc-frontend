import { PatientColumns, PatientStatus } from "@/types/admin"

export const mockPatient: PatientColumns = {
  id: "123556",
  patientId: "123456",
  patientName: "Ana Maria Santos",
  patientPhone: "82 123 4567",
  patientEmail: "ana.maria@example.com",
  patientAddress:
    "Rua do Dão, nº49, 2º Andar, Bairro Central, Cidade de Maputo, Moçambique",
  date: "09/07/2024",
  plan: "",
  status: PatientStatus.Completed,
}

export const mockPatients: PatientColumns[] = [
  {
    id: "123556",
    patientId: "123456",
    patientName: "Ana Maria Santos",
    patientPhone: "82 123 4567",
    patientEmail: "ana.maria@example.com",
    patientAddress:
      "Rua do Dão, nº49, 2º Andar, Bairro Central, Cidade de Maputo, Moçambique",
    date: "09/07/2024",
    plan: "",
    status: PatientStatus.Pending,
  },
  {
    id: "123557",
    patientId: "123457",
    patientName: "João Silva",
    patientPhone: "82 234 5678",
    patientEmail: "joao.silva@example.com",
    patientAddress:
      "Av. Eduardo Mondlane, nº123, Bairro Polana, Cidade de Maputo, Moçambique",
    date: "09/07/2024",
    plan: "",
    status: PatientStatus.Waiting,
  },
  {
    id: "123558",
    patientId: "123458",
    patientName: "Maria Fernanda",
    patientPhone: "82 345 6789",
    patientEmail: "maria.fernanda@example.com",
    patientAddress:
      "Rua Joaquim Chissano, nº78, Bairro Sommerschield, Cidade de Maputo, Moçambique",
    date: "09/07/2024",
    plan: "",
    status: PatientStatus.Rejected,
  },
  {
    id: "123563",
    patientId: "123463",
    patientName: "Pedro Oliveira",
    patientPhone: "82 890 1234",
    patientEmail: "pedro.oliveira@example.com",
    patientAddress:
      "Av. Karl Marx, nº345, Bairro Alto Maé, Cidade de Maputo, Moçambique",
    date: "08/07/2024",
    plan: "",
    status: PatientStatus.Completed,
  },
  {
    id: "123564",
    patientId: "123464",
    patientName: "Beatriz Matos",
    patientPhone: "82 111 2233",
    patientEmail: "beatriz.matos@example.com",
    patientAddress:
      "Rua da Liberdade, nº90, Bairro Malhangalene, Cidade de Maputo, Moçambique",
    date: "08/07/2024",
    plan: "",
    status: PatientStatus.Pending,
  },
  {
    id: "123565",
    patientId: "123465",
    patientName: "Ricardo Silva",
    patientPhone: "82 012 3456",
    patientEmail: "ricardo.silva@example.com",
    patientAddress:
      "Av. Ahmed Sekou Touré, nº78, Bairro Polana Caniço, Cidade de Maputo, Moçambique",
    date: "08/07/2024",
    plan: "",
    status: PatientStatus.Waiting,
  },
]

export const mockCompletedPatients: PatientColumns[] = [
  {
    id: "123556",
    patientId: "123456",
    patientName: "Ana Maria Santos",
    patientPhone: "82 123 4567",
    patientEmail: "ana.maria@example.com",
    patientAddress:
      "Rua do Dão, nº49, 2º Andar, Bairro Central, Cidade de Maputo, Moçambique",
    date: "09/07/2024",
    plan: "",
    status: PatientStatus.Completed,
  },
  {
    id: "123557",
    patientId: "123457",
    patientName: "João Silva",
    patientPhone: "82 234 5678",
    patientEmail: "joao.silva@example.com",
    patientAddress:
      "Av. Eduardo Mondlane, nº123, Bairro Polana, Cidade de Maputo, Moçambique",
    date: "09/07/2024",
    plan: "",
    status: PatientStatus.Completed,
  },
  {
    id: "123558",
    patientId: "123458",
    patientName: "Maria Fernanda",
    patientPhone: "82 345 6789",
    patientEmail: "maria.fernanda@example.com",
    patientAddress:
      "Rua Joaquim Chissano, nº78, Bairro Sommerschield, Cidade de Maputo, Moçambique",
    date: "09/07/2024",
    plan: "",
    status: PatientStatus.Completed,
  },
  {
    id: "123563",
    patientId: "123463",
    patientName: "Pedro Oliveira",
    patientPhone: "82 890 1234",
    patientEmail: "pedro.oliveira@example.com",
    patientAddress:
      "Av. Karl Marx, nº345, Bairro Alto Maé, Cidade de Maputo, Moçambique",
    date: "08/07/2024",
    plan: "",
    status: PatientStatus.Completed,
  },
  {
    id: "123564",
    patientId: "123464",
    patientName: "Beatriz Matos",
    patientPhone: "82 111 2233",
    patientEmail: "beatriz.matos@example.com",
    patientAddress:
      "Rua da Liberdade, nº90, Bairro Malhangalene, Cidade de Maputo, Moçambique",
    date: "08/07/2024",
    plan: "",
    status: PatientStatus.Completed,
  },
  {
    id: "123565",
    patientId: "123465",
    patientName: "Ricardo Silva",
    patientPhone: "82 012 3456",
    patientEmail: "ricardo.silva@example.com",
    patientAddress:
      "Av. Ahmed Sekou Touré, nº78, Bairro Polana Caniço, Cidade de Maputo, Moçambique",
    date: "08/07/2024",
    plan: "",
    status: PatientStatus.Completed,
  },
]
