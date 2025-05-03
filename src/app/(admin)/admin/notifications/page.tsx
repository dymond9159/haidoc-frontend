"use client"

import { useEffect, useState } from "react"

import { Loading } from "@/components/common"
import { NotificationFilters } from "@/components/common/notification-filters"
import { NotificationItem } from "@/components/common/notification-item"
import { Button } from "@/components/ui/button"

import { useToast } from "@/hooks/use-toast"
import { mockNotifications } from "@/lib/mock-data/notifications"
import { NotificationColumns, NotificationType } from "@/types"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationColumns[]>([])
  const [filteredNotifications, setFilteredNotifications] = useState<
    NotificationColumns[]
  >([])
  const [selectedType, setSelectedType] = useState<NotificationType | "all">(
    "all",
  )
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(10)
  const { toast } = useToast()

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifications(mockNotifications)
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  // Filter notifications based on type and search query
  useEffect(() => {
    let filtered = [...notifications]

    // Filter by type
    if (selectedType !== "all") {
      filtered = filtered.filter(
        (notification) => notification.type === selectedType,
      )
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (notification) =>
          notification.title.toLowerCase().includes(query) ||
          notification.description.toLowerCase().includes(query) ||
          (notification.sender?.name &&
            notification.sender.name.toLowerCase().includes(query)),
      )
    }

    setFilteredNotifications(filtered)
  }, [notifications, selectedType, searchQuery])

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length
  const totalCount = notifications.length

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    )
    toast({
      title: "Notificação marcada como lida",
      description: "A notificação foi marcada como lida com sucesso.",
    })
  }

  const handleMarkAsUnread = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, read: false }
          : notification,
      ),
    )
    toast({
      title: "Notificação marcada como não lida",
      description: "A notificação foi marcada como não lida com sucesso.",
    })
  }

  const handleDelete = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    )
    toast({
      title: "Notificação excluída",
      description: "A notificação foi excluída com sucesso.",
    })
  }

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true })),
    )
    toast({
      title: "Todas as notificações marcadas como lidas",
      description:
        "Todas as notificações foram marcadas como lidas com sucesso.",
    })
  }

  const handleClearAll = () => {
    setNotifications([])
    toast({
      title: "Todas as notificações excluídas",
      description: "Todas as notificações foram excluídas com sucesso.",
    })
  }

  const loadMore = () => {
    setVisibleCount((prev) => prev + 10)
  }

  return (
    <div className="mx-auto max-w-4xl">
      <NotificationFilters
        selectedType={selectedType}
        searchQuery={searchQuery}
        onTypeChange={setSelectedType}
        onSearchChange={setSearchQuery}
        unreadCount={unreadCount}
        totalCount={totalCount}
        onMarkAllAsRead={handleMarkAllAsRead}
        onClearAll={handleClearAll}
      />

      <div className="mt-6 space-y-4">
        {isLoading ? (
          <Loading />
        ) : filteredNotifications.length > 0 ? (
          <>
            <div className="space-y-4">
              {filteredNotifications
                .slice(0, visibleCount)
                .map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={handleMarkAsRead}
                    onMarkAsUnread={handleMarkAsUnread}
                    onDelete={handleDelete}
                  />
                ))}
            </div>

            {visibleCount < filteredNotifications.length && (
              <div className="mt-4 flex justify-center">
                <Button variant="outline" onClick={loadMore}>
                  Carregar mais
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <p className="text-gray-500">Nenhuma notificação encontrada</p>
            {(selectedType !== "all" || searchQuery) && (
              <Button
                variant="link"
                onClick={() => {
                  setSelectedType("all")
                  setSearchQuery("")
                }}
              >
                Limpar filtros
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
