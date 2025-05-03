import { TimeframeOptions } from "@/types"

// Helper to get random integer between min and max
const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

const weekDays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"]
const months = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
]

export const generateUserData = (timeframe: TimeframeOptions) => {
  let labels: string[] = []
  let minValue = 0,
    maxValue = 0

  switch (timeframe) {
    case TimeframeOptions.SevenDays:
      labels = weekDays
      minValue = 0
      maxValue = 10
      break

    case TimeframeOptions.OneMonth:
      const daysInMonth = new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0,
      ).getDate()
      labels = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString())
      minValue = 0
      maxValue = 10
      break

    case TimeframeOptions.SixMonths:
      const currentMonth = new Date().getMonth() // 0 = Jan, 11 = Dec
      labels = Array.from({ length: 6 }, (_, i) => {
        const monthIndex = (currentMonth - 5 + i + 12) % 12
        return months[monthIndex]
      })
      minValue = 100
      maxValue = 300
      break

    case TimeframeOptions.Annual:
      labels = months // Full year
      minValue = 100
      maxValue = 300
      break

    case TimeframeOptions.AllTime:
      labels = ["2020", "2021", "2022", "2023", "2024"]
      minValue = 500
      maxValue = 1000
      break

    default:
      labels = []
  }

  const newUsersData = labels.map((label) => ({
    timeframe: label,
    value: getRandomInt(minValue, maxValue),
  }))

  const activeUsersData = labels.map((label) => ({
    timeframe: label,
    value: getRandomInt(minValue / 2, maxValue / 2),
  }))

  return {
    newUsersData,
    activeUsersData,
  }
}

export const mockUsers = [
  {
    id: "1",
    name: "Nome do usuário SuperAdmin (Você)",
    email: "admin@haidoc.com",
    profile: "Perfil X",
    isCurrentUser: true,
  },
  {
    id: "2",
    name: "Ana Maria Santos Silva",
    email: "ana.maria.santos.silva1255@haidoc.com",
    profile: "Perfil X",
  },
  {
    id: "3",
    name: "João Carlos Oliveira",
    email: "joao.carlos@haidoc.com",
    profile: "Perfil X",
  },
  {
    id: "4",
    name: "Mariana Alves Costa",
    email: "mariana.alves@haidoc.com",
    profile: "Perfil X",
  },
  {
    id: "5",
    name: "Pedro Henrique Santos",
    email: "pedro.santos@haidoc.com",
    profile: "Perfil X",
  },
  {
    id: "6",
    name: "Camila Ferreira Lima",
    email: "camila.lima@haidoc.com",
    profile: "Perfil X",
  },
  {
    id: "7",
    name: "Rafael Souza Martins",
    email: "rafael.martins@haidoc.com",
    profile: "Perfil X",
  },
  {
    id: "8",
    name: "Rafael Souza Martins",
    email: "rafael.martins@haidoc.com",
    profile: "Perfil X",
  },
  {
    id: "9",
    name: "Rafael Souza Martins",
    email: "rafael.martins@haidoc.com",
    profile: "Perfil X",
  },
  {
    id: "10",
    name: "Rafael Souza Martins",
    email: "rafael.martins@haidoc.com",
    profile: "Perfil X",
  },
  {
    id: "11",
    name: "Rafael Souza Martins",
    email: "rafael.martins@haidoc.com",
    profile: "Perfil X",
  },
]

export const mockProfiles = [
  {
    id: "1",
    name: "Perfil X",
    permissions: [
      {
        id: "1",
        name: "Aplicações de usuários business",
        description:
          "O usuário pode visualizar, aprovar, reprovar e cancelar as solicitações dos usuários.",
        enabled: true,
      },
      {
        id: "2",
        name: "Finanças",
        description:
          "O usuário pode visualizar, aprovar, reprovar e cancelar as solicitações dos usuários.",
        enabled: true,
      },
      {
        id: "3",
        name: "Entregas",
        description:
          "O usuário pode visualizar, aprovar, reprovar e cancelar as solicitações dos usuários.",
        enabled: false,
      },
      {
        id: "4",
        name: "Pré-avaliações",
        description:
          "O usuário pode visualizar, aprovar, reprovar e cancelar as solicitações dos usuários.",
        enabled: false,
      },
      {
        id: "5",
        name: "Log de atividades",
        description:
          "O usuário pode visualizar as informações de usuários pacientes e usuários business.",
        enabled: true,
      },
    ],
  },
  {
    id: "2",
    name: "Perfil A",
    permissions: [
      {
        id: "1",
        name: "Aplicações de usuários business",
        description:
          "O usuário pode visualizar, aprovar, reprovar e cancelar as solicitações dos usuários.",
        enabled: false,
      },
      {
        id: "2",
        name: "Finanças",
        description:
          "O usuário pode visualizar, aprovar, reprovar e cancelar as solicitações dos usuários.",
        enabled: true,
      },
    ],
  },
  {
    id: "3",
    name: "Perfil B",
    permissions: [
      {
        id: "1",
        name: "Aplicações de usuários business",
        description:
          "O usuário pode visualizar, aprovar, reprovar e cancelar as solicitações dos usuários.",
        enabled: true,
      },
      {
        id: "3",
        name: "Entregas",
        description:
          "O usuário pode visualizar, aprovar, reprovar e cancelar as solicitações dos usuários.",
        enabled: true,
      },
    ],
  },
  {
    id: "4",
    name: "Perfil C",
    permissions: [
      {
        id: "4",
        name: "Pré-avaliações",
        description:
          "O usuário pode visualizar, aprovar, reprovar e cancelar as solicitações dos usuários.",
        enabled: true,
      },
      {
        id: "5",
        name: "Log de atividades",
        description:
          "O usuário pode visualizar as informações de usuários pacientes e usuários business.",
        enabled: true,
      },
    ],
  },
  {
    id: "5",
    name: "Perfil D",
    permissions: [
      {
        id: "2",
        name: "Finanças",
        description:
          "O usuário pode visualizar, aprovar, reprovar e cancelar as solicitações dos usuários.",
        enabled: true,
      },
      {
        id: "5",
        name: "Log de atividades",
        description:
          "O usuário pode visualizar as informações de usuários pacientes e usuários business.",
        enabled: false,
      },
    ],
  },
]
