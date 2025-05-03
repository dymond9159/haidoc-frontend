"use client"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useRouter } from "nextjs-toploader/app"
import { useState } from "react"

import { Bell, Check, Clock, FileText, MessageSquare, ShieldAlert, Trash2Icon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"
import { NotificationColumns, NotificationType } from "@/types"

interface NotificationItemProps {
  notification: NotificationColumns
  onMarkAsRead: (id: string) => void
  onMarkAsUnread: (id: string) => void
  onDelete: (id: string) => void
}

// Get icon based on notification type
export const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case "alert":
      return <ShieldAlert className="h-5 w-5 text-error-4" />
    case "message":
      return <MessageSquare className="h-5 w-5 text-info-4" />
    case "system":
      return <Clock className="h-5 w-5 text-warning-4" />
    case "document":
      return <FileText className="h-5 w-5 text-success-4" />
    default:
      return <Bell className="h-5 w-5 text-secondary" />
  }
}

export function NotificationItem({ notification, onMarkAsRead, onMarkAsUnread, onDelete }: NotificationItemProps) {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={cn(
        "group relative flex gap-4 rounded-lg border p-4 transition-colors",
        notification.read ? "bg-white" : "bg-blue-50/50",
        isHovered && "bg-gray-50",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {notification.sender ? (
        <Avatar className="h-10 w-10 flex-shrink-0">
          <AvatarImage src={notification.sender.avatar || "/images/placeholder.svg"} alt={notification.sender.name} />
          <AvatarFallback>
            {notification.sender.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .substring(0, 2)}
          </AvatarFallback>
        </Avatar>
      ) : (
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100">
          {getNotificationIcon(notification.type)}
        </div>
      )}

      <div className="flex-1 space-y-1">
        <div className="flex items-start justify-between">
          <h3 className={cn("text-sm font-medium", !notification.read && "font-semibold")}>{notification.title}</h3>
          <span className="text-xs text-gray-500">
            {formatDistanceToNow(notification.timestamp, {
              addSuffix: true,
              locale: ptBR,
            })}
          </span>
        </div>
        <p className="text-sm text-gray-600">{notification.description}</p>

        {notification.actionUrl && (
          <div className="pt-1">
            <Button
              variant="link"
              onClick={() => router.push(notification.actionUrl || "")}
              className="text-xs font-medium text-secondary pl-0"
            >
              Ver detalhes
            </Button>
          </div>
        )}
      </div>

      <div className={cn("absolute right-2 bottom-2 flex gap-1")}>
        {notification.read ? (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full text-secondary"
            onClick={() => onMarkAsUnread(notification.id)}
            title="Marcar como não lida"
          >
            <MessageSquare className="h-4 w-4" />
            <span className="sr-only">Marcar como não lida</span>
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full text-secondary"
            onClick={() => onMarkAsRead(notification.id)}
            title="Marcar como lida"
          >
            <Check className="h-4 w-4" />
            <span className="sr-only">Marcar como lida</span>
          </Button>
        )}
        <Button
          variant="ghost-destructive"
          size="icon"
          className="h-8 w-8 rounded-full text-error-5"
          onClick={() => onDelete(notification.id)}
          title="Excluir"
        >
          <Trash2Icon className="h-4 w-4" />
          <span className="sr-only">Excluir</span>
        </Button>
      </div>
    </div>
  )
}
