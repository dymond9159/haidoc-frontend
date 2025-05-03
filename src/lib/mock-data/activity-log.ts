import { User } from "@/types"

// Mock data
export const totalUsers = 120
export const totalPatients = 120
export const totalBusinessUsers = 120

export const patients: User[] = [
  {
    id: "123456781",
    name: "Carla Antoniera de Carvalho",
    createdAt: "09/07/2024",
  },
  {
    id: "123456782",
    name: "Carla Antoniera de Carvalho",
    createdAt: "09/07/2024",
  },
  {
    id: "123456783",
    name: "Carla Antoniera de Carvalho",
    email: "",
    createdAt: "09/07/2024",
  },
  {
    id: "123456785",
    name: "Carla Antoniera de Carvalho",
    createdAt: "09/07/2024",
  },
  {
    id: "123456786",
    name: "Carla Antoniera de Carvalho",
    createdAt: "09/07/2024",
  },
]

export const businessUsers: User[] = [
  { id: "987654321", name: "Empresa ABC Ltda", createdAt: "15/06/2024" },
  { id: "987654322", name: "Clínica XYZ", createdAt: "20/05/2024" },
  {
    id: "987654323",
    name: "Hospital Bem Estar",
    createdAt: "10/04/2024",
  },
  {
    id: "987654324",
    name: "Farmácia Saúde Total",
    createdAt: "05/03/2024",
  },
  {
    id: "987654325",
    name: "Laboratório Análises",
    createdAt: "25/02/2024",
  },
]

// Mock data
export const activities = [
  {
    id: 1,
    name: "Redefinição de Dados Cadastrais",
    date: "22/09/2023",
    time: "11:49",
    type: 2, // Type 2 modal (before/after)
    beforeDocument: "Documento01",
    afterDocument: "Documento02",
  },
  {
    id: 2,
    name: "Agendamento de Colheita",
    date: "22/09/2023",
    time: "11:49",
    type: 1, // Type 1 modal (description)
    description: "Agendamento de colheita para exames de rotina.",
  },
  {
    id: 3,
    name: "Pedido de Suporte a Plataforma",
    date: "22/09/2023",
    time: "11:49",
    type: 1,
    description:
      "Tenho tido dificuldades para anexar uma nova forma de pagamento a plataforma HaiDoc.",
  },
  {
    id: 4,
    name: "Redefinição de Dados Cadastrais",
    date: "22/09/2023",
    time: "11:49",
    type: 2,
    beforeDocument: "Documento01",
    afterDocument: "Documento02",
  },
  {
    id: 5,
    name: "Pedido de Suporte a Plataforma",
    date: "22/09/2023",
    time: "11:49",
    type: 1,
    description: "Dificuldade em acessar o histórico de consultas.",
  },
  {
    id: 6,
    name: "Redefinição de Dados Cadastrais",
    date: "22/09/2023",
    time: "11:49",
    type: 2,
    beforeDocument: "Documento01",
    afterDocument: "Documento02",
  },
  {
    id: 7,
    name: "Pedido de Suporte a Plataforma",
    date: "22/09/2023",
    time: "11:49",
    type: 1,
    description: "Problemas com o agendamento de consultas.",
  },
]

// Mock data for activities
export const myActivities = [
  {
    id: 1,
    name: "Suspensão de Usuário Business",
    date: "22/09/2023",
    time: "11:49",
    type: "type1",
    description:
      "Foi solicitado ao usuário João Paulo Machado da Cruz, ID 123456789, médico cardiologista, o envio de sua licença médica atualizada. O prazo para a operação, de 5 dias úteis, não foi cumprido.",
  },
  {
    id: 2,
    name: "Suspensão de Usuário Business",
    date: "22/09/2023",
    time: "11:49",
    type: "type1",
    description:
      "Foi solicitado ao usuário João Paulo Machado da Cruz, ID 123456789, médico cardiologista, o envio de sua licença médica atualizada. O prazo para a operação, de 5 dias úteis, não foi cumprido.",
  },
  {
    id: 3,
    name: "Redefinição de Dados Cadastrais",
    date: "22/09/2023",
    time: "11:49",
    type: "type2",
    beforeDocument: {
      name: "Documento01",
      url: "#",
    },
    afterDocument: {
      name: "Documento02",
      url: "#",
    },
  },
  {
    id: 4,
    name: "Redefinição de Dados Cadastrais",
    date: "22/09/2023",
    time: "11:49",
    type: "type2",
    beforeDocument: {
      name: "Documento01",
      url: "#",
    },
    afterDocument: {
      name: "Documento02",
      url: "#",
    },
  },
  {
    id: 5,
    name: "Suspensão de Usuário Business",
    date: "22/09/2023",
    time: "11:49",
    type: "type1",
    description:
      "Foi solicitado ao usuário João Paulo Machado da Cruz, ID 123456789, médico cardiologista, o envio de sua licença médica atualizada. O prazo para a operação, de 5 dias úteis, não foi cumprido.",
  },
  {
    id: 6,
    name: "Suspensão de Usuário Business",
    date: "22/09/2023",
    time: "11:49",
    type: "type1",
    description:
      "Foi solicitado ao usuário João Paulo Machado da Cruz, ID 123456789, médico cardiologista, o envio de sua licença médica atualizada. O prazo para a operação, de 5 dias úteis, não foi cumprido.",
  },
  {
    id: 7,
    name: "Redefinição de Dados Cadastrais",
    date: "22/09/2023",
    time: "11:49",
    type: "type2",
    beforeDocument: {
      name: "Documento01",
      url: "#",
    },
    afterDocument: {
      name: "Documento02",
      url: "#",
    },
  },
]
