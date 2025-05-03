// Define notification types
export type NotificationType = "alert" | "message" | "system" | "document"

export interface NotificationColumns {
  id: string
  type: NotificationType
  title: string
  description: string
  timestamp: Date
  read: boolean
  actionUrl?: string
  sender?: {
    id: string
    name: string
    avatar?: string
    role?: string
  }
}
