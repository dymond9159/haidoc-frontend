import { NotificationColumns, NotificationType } from "@/types"
import { subDays } from "date-fns"

// Helper function to generate random dates within the last 30 days
function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  )
}

// Generate 50 mock notifications
export function generateMockNotifications(count = 50): NotificationColumns[] {
  const now = new Date()
  const thirtyDaysAgo = subDays(now, 30)

  const alertTitles = [
    "Alerta de Segurança",
    "Acesso Suspeito",
    "Tentativa de Login",
    "Alerta de Sistema",
    "Verificação Necessária",
  ]

  const alertDescriptions = [
    "Tentativa de login suspeita detectada na sua conta",
    "Acesso não autorizado bloqueado",
    "Múltiplas tentativas de login detectadas",
    "Seu endereço IP mudou recentemente",
    "Verificação de dois fatores recomendada",
  ]

  const messageTitles = [
    "Nova mensagem",
    "Mensagem importante",
    "Comunicação de equipe",
    "Mensagem do paciente",
    "Consulta pendente",
  ]

  const messageDescriptions = [
    "enviou uma mensagem sobre um paciente",
    "solicitou informações sobre um caso",
    "enviou uma atualização sobre o tratamento",
    "tem uma dúvida sobre medicação",
    "enviou resultados de exames para revisão",
  ]

  const systemTitles = [
    "Manutenção programada",
    "Atualização do sistema",
    "Backup automático",
    "Verificação de segurança",
    "Limpeza de dados",
  ]

  const systemDescriptions = [
    "O sistema estará indisponível das 02:00 às 04:00",
    "Nova versão do sistema será instalada hoje à noite",
    "Backup completo realizado com sucesso",
    "Verificação de segurança concluída sem problemas",
    "Dados temporários foram limpos para melhorar o desempenho",
  ]

  const documentTitles = [
    "Documento pendente",
    "Assinatura necessária",
    "Revisão de documento",
    "Novo formulário",
    "Atualização de política",
  ]

  const documentDescriptions = [
    "Novo documento requer sua aprovação",
    "Um documento precisa da sua assinatura",
    "Revisão de prontuário solicitada",
    "Novo formulário de consentimento disponível",
    "Política de privacidade atualizada requer sua atenção",
  ]

  const doctorNames = [
    "Dr. João Paulo",
    "Dra. Maria Silva",
    "Dr. Carlos Mendes",
    "Dra. Ana Beatriz",
    "Dr. Roberto Alves",
    "Dra. Juliana Costa",
    "Dr. Fernando Santos",
    "Dra. Camila Oliveira",
    "Dr. Ricardo Lima",
    "Dra. Patricia Sousa",
  ]

  const notifications: NotificationColumns[] = []

  for (let i = 0; i < count; i++) {
    const id = (i + 1).toString()
    let type: NotificationType
    let title: string
    let description: string
    let actionUrl: string | undefined
    let sender:
      | { id: string; name: string; avatar?: string; role?: string }
      | undefined

    // Distribute notification types somewhat evenly
    const typeRandom = Math.random()
    if (typeRandom < 0.25) {
      type = "alert"
      title = alertTitles[Math.floor(Math.random() * alertTitles.length)]
      description =
        alertDescriptions[Math.floor(Math.random() * alertDescriptions.length)]
      actionUrl = "/admin/seguranca"
    } else if (typeRandom < 0.6) {
      type = "message"
      title = messageTitles[Math.floor(Math.random() * messageTitles.length)]
      const doctorName =
        doctorNames[Math.floor(Math.random() * doctorNames.length)]
      description = `${doctorName} ${messageDescriptions[Math.floor(Math.random() * messageDescriptions.length)]}`
      actionUrl = "/admin/mensagens"
      sender = {
        id: `doctor-${Math.floor(Math.random() * 100)}`,
        name: doctorName,
        role: "Médico",
        avatar: `/placeholder.svg?height=40&width=40&text=${doctorName.substring(0, 2)}`,
      }
    } else if (typeRandom < 0.8) {
      type = "system"
      title = systemTitles[Math.floor(Math.random() * systemTitles.length)]
      description =
        systemDescriptions[
          Math.floor(Math.random() * systemDescriptions.length)
        ]
    } else {
      type = "document"
      title = documentTitles[Math.floor(Math.random() * documentTitles.length)]
      description =
        documentDescriptions[
          Math.floor(Math.random() * documentDescriptions.length)
        ]
      actionUrl = "/admin/documentos"
    }

    // Generate random timestamp within the last 30 days
    const timestamp = randomDate(thirtyDaysAgo, now)

    // Older notifications are more likely to be read
    const daysSinceCreation =
      (now.getTime() - timestamp.getTime()) / (1000 * 60 * 60 * 24)
    const readProbability = Math.min(0.9, daysSinceCreation / 30)
    const read = Math.random() < readProbability

    notifications.push({
      id,
      type,
      title,
      description,
      timestamp,
      read,
      actionUrl,
      sender,
    })
  }

  // Sort by timestamp (newest first)
  return notifications.sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime(),
  )
}

export const mockNotifications = generateMockNotifications(50)
