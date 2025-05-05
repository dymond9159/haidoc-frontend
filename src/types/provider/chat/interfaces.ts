import { UserRole } from "@/types/user"
import { MessageItem } from "./types"

export interface MessageGroups {
  unread: MessageItem[]
  read: MessageItem[]
  finished: MessageItem[]
}

export interface ChatMessage {
  id: string
  sender: UserRole
  content: string
  dateTime: string
  isAttachment?: boolean
}
