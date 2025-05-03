"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Bell, Check, X } from "lucide-react"
import { useRouter } from "nextjs-toploader/app"
import { useState } from "react"
import { getNotificationIcon } from "./notification-item"

// Define notification types
type NotificationType = "alert" | "message" | "system" | "document"

interface Notification {
  id: string
  type: NotificationType
  title: string
  description: string
  timestamp: Date
  read: boolean
  actionUrl?: string
}

// Mock data for notifications
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "alert",
    title: "Alerta de Segurança",
    description: "Tentativa de login suspeita detectada na sua conta",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
    actionUrl: "/admin/seguranca",
  },
  {
    id: "2",
    type: "message",
    title: "Nova mensagem",
    description: "Dr. João Paulo enviou uma mensagem sobre um paciente",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
    actionUrl: "/admin/mensagens",
  },
  {
    id: "3",
    type: "document",
    title: "Documento pendente",
    description: "Novo documento requer sua aprovação",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    read: false,
    actionUrl: "/admin/documentos",
  },
  {
    id: "4",
    type: "system",
    title: "Manutenção programada",
    description: "O sistema estará indisponível das 02:00 às 04:00",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
  },
  {
    id: "5",
    type: "message",
    title: "Nova mensagem",
    description: "Dra. Maria Silva enviou uma mensagem sobre faturamento",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26), // 26 hours ago
    read: true,
    actionUrl: "/admin/mensagens",
  },
]

export function NotificationsDropdown() {
  const router = useRouter()
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.filter((notification) => !notification.read).length

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
  }

  // Mark single notification as read
  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  // Remove notification
  const removeNotification = (id: string) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="text-system-11 relative rounded-full">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute p-0 -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-9 text-[10px] font-medium text-white"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-1">
          <DropdownMenuLabel className="text-base">Notificações</DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button
              variant="link"
              size="sm"
              className="h-auto p-0 px-2 text-xs font-normal text-secondary"
              onClick={markAllAsRead}
            >
              Marcar todas como lidas
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />

        <div className="max-h-[60vh] overflow-y-auto">
          {notifications.length > 0 ? (
            <DropdownMenuGroup>
              {notifications.map((notification, index) => (
                <div key={notification.id} className="relative">
                  <DropdownMenuItem
                    className={cn(
                      "flex cursor-default gap-3 p-4 focus:bg-system-2 rounded-none border-b last:border-none",
                      !notification.read && "bg-system-3",
                      index === notifications.length - 1 && "border-none",
                    )}
                  >
                    <div className="flex-shrink-0 mt-0.5">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className={cn("text-sm font-medium", !notification.read && "font-semibold text-system-9")}>
                          {notification.title}
                        </p>
                        <p className="whitespace-nowrap text-xs text-gray-500">
                          {formatDistanceToNow(notification.timestamp, {
                            addSuffix: true,
                            locale: ptBR,
                          })}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500">{notification.description}</p>
                    </div>
                  </DropdownMenuItem>

                  {/* Action buttons that appear on hover */}
                  <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100 hover:opacity-100">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <Check className="h-3 w-3" />
                        <span className="sr-only">Marcar como lida</span>
                      </Button>
                    )}
                    <Button
                      variant="ghost-destructive"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => removeNotification(notification.id)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remover</span>
                    </Button>
                  </div>
                </div>
              ))}
            </DropdownMenuGroup>
          ) : (
            <div className="flex flex-col items-center justify-center p-6">
              <Bell className="mb-2 h-10 w-10 text-gray-300" />
              <p className="text-sm text-gray-500">Nenhuma notificação</p>
            </div>
          )}
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="p-0 flex items-center justify-center">
          <Button
            variant="link"
            onClick={() => router.push("/admin/notifications")}
            className="w-full flex justify-center items-center text-secondary"
          >
            Ver todas as notificações
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
