"use client"

import {
  Bell,
  FileText,
  MessageSquare,
  Search,
  ShieldAlert,
  Clock,
  ListChecksIcon,
  Trash2Icon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { NotificationType } from "@/types"

interface NotificationFiltersProps {
  selectedType: NotificationType | "all"
  searchQuery: string
  onTypeChange: (type: NotificationType | "all") => void
  onSearchChange: (query: string) => void
  unreadCount: number
  totalCount: number
  onMarkAllAsRead: () => void
  onClearAll: () => void
}

export function NotificationFilters({
  selectedType,
  searchQuery,
  onTypeChange,
  onSearchChange,
  unreadCount,
  totalCount,
  onMarkAllAsRead,
  onClearAll,
}: NotificationFiltersProps) {
  const filterButtons = [
    { type: "all", label: "Todas", icon: Bell },
    { type: "message", label: "Mensagens", icon: MessageSquare },
    { type: "alert", label: "Alertas", icon: ShieldAlert },
    { type: "document", label: "Documentos", icon: FileText },
    { type: "system", label: "Sistema", icon: Clock },
  ]

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-md">
            {unreadCount} não lidas de {totalCount} notificações
          </p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={onMarkAllAsRead}>
              <ListChecksIcon />
              Marcar todas
            </Button>
          )}
          <Button size="sm" onClick={onClearAll}>
            <Trash2Icon />
            Limpar todas
          </Button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Pesquisar notificações..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {filterButtons.map((button) => (
          <Button
            key={button.type}
            variant={selectedType === button.type ? "default" : "outline"}
            size="sm"
            className={cn(
              "gap-2",
              selectedType === button.type
                ? "bg-secondary text-white hover:bg-secondary"
                : "",
            )}
            onClick={() =>
              onTypeChange(button.type as NotificationType | "all")
            }
          >
            <button.icon className="h-4 w-4" />
            {button.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
