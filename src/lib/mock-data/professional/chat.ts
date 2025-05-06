import { ChatMessage, MessageGroups } from "@/types/provider/chat/interfaces"
import { MessageItem } from "@/types/provider/chat/types"
import { ConsultationHistoryColumns } from "@/types/provider/professional/interface-columns"
import { ConsultationStatus, ConsultationType } from "@/types/provider/professional/types"
import { UserRole } from "@/types/user"
import { faker } from "@faker-js/faker"

function getRandomDateInPast3Months(): { date: string; time: string } {
  const now = new Date()
  const past = new Date()
  past.setDate(now.getDate() - Math.floor(Math.random() * 90))

  const hours = String(Math.floor(Math.random() * 8) + 8).padStart(2, "0") // 08 to 15
  const minutes = String(Math.floor((Math.random() / 2) * 60)).padStart(2, "0") // 00 to 30 or 59

  return {
    date: past.toISOString().split("T")[0],
    time: `${hours}:${minutes}`,
  }
}

function getRandomType(): ConsultationType {
  const types = Object.values(ConsultationType)
  return types[Math.floor(Math.random() * types.length)]
}

// Mock data for chat conversations
function generateChat(idPrefix: string, count: number, isUnread = false) {
  return Array.from({ length: count }).map((_, i) => ({
    id: `${idPrefix}-${i + 1}`,
    name: faker.person.fullName(),
    message: faker.lorem.sentence(6),
    time: faker.date.recent().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    unreadCount: isUnread ? faker.number.int({ min: 1, max: 5 }) : 0,
    avatar: faker.image.avatar(),
  }))
}

export const mockChats: MessageGroups = {
  unread: generateChat("unread", 3, true),
  read: generateChat("read", 18),
  finished: generateChat("finished", 5),
}

const getRandomStatus = () => {
  const statuses = Object.values(ConsultationStatus)
  return statuses[Math.floor(Math.random() * statuses.length)]
}

export const mockHistoryMessages: MessageItem[] = generateChat("history", 5, true)

export const mockConsultationHistory: ConsultationHistoryColumns[] = Array.from({ length: 30 }, (_, i) => {
  const { date, time } = getRandomDateInPast3Months()
  return {
    id: (i + 1).toString(),
    consultationType: getRandomType(),
    value: Math.floor(Math.random() * 200) + 50, // Between 50 and 250
    status: getRandomStatus(),
    date,
    time,
  }
})

// mock data for chat messages
const messagesSamples = {
  patient: [
    "Olá, gostaria de tirar uma dúvida",
    "Tenho um exame para mostrar",
    "Obrigado pela ajuda",
    "Preciso agendar um horário",
  ],
  professional: [
    "Olá, tudo bem? Qual seria sua dúvida?",
    "Vamos marcar um retorno?",
    "Você pode enviar os exames por aqui",
    "Lembre-se de tomar o medicamento",
  ],
}

function generateMockMessages(count: number = 10): ChatMessage[] {
  return Array.from({ length: count }).map((_, i) => {
    const sender: UserRole = i % 2 === 0 ? UserRole.Patient : UserRole.Professional
    const isAttachment = faker.datatype.boolean() && sender === UserRole.Professional
    return {
      id: (i + 1).toString(),
      sender,
      content: isAttachment ? "anexo-laboratorio.pdf" : faker.helpers.arrayElement(messagesSamples[sender]),
      dateTime: faker.date.recent().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      ...(isAttachment && { isAttachment: true }),
    }
  })
}

export const mockMessages = generateMockMessages(20)
