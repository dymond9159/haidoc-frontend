"use client"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface MessageCardProps {
  sender: {
    name: string
    avatar?: string
    initials: string
    isOnline?: boolean
  }
  message: string
  time: string
  unread?: boolean
  className?: string
  onClick?: () => void
}

export function MessageCard({
  sender,
  message,
  time,
  unread = false,
  className,
  onClick,
}: MessageCardProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-colors hover:bg-system-2",
        {
          "border-l-4 border-l-primary-9": unread,
        },
        className,
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar>
                <AvatarImage src={sender.avatar} alt={sender.name} />
                <AvatarFallback>{sender.initials}</AvatarFallback>
              </Avatar>
              {sender.isOnline && (
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-system-1 bg-success-6"></span>
              )}
            </div>
            <div>
              <h3 className={cn("font-medium", { "text-primary-11": unread })}>
                {sender.name}
              </h3>
              <p
                className={cn("line-clamp-1 text-sm", {
                  "font-medium text-system-12": unread,
                  "text-system-10": !unread,
                })}
              >
                {message}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs text-system-10">{time}</span>
            {unread && (
              <Badge className="mt-1 bg-primary-9 px-1.5 py-0.5 text-xs">
                New
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
