import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { MessageItem as MessageItemType } from "@/types/provider/chat/types"

interface MessageItemProps extends MessageItemType {
  className?: string
}

export function MessageItem({ id, name = "", message, time, unreadCount = 0, avatar, className }: MessageItemProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className={cn("flex items-start gap-3 py-3", className)}>
      <Avatar className="h-10 w-10">
        <AvatarImage src={avatar || `/images/placeholder.svg?text=${initials}`} alt={name} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm">{name}</p>
        <p className="text-sm text-system-9 truncate">{message}</p>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-xs text-system-9">{time}</span>
        {unreadCount > 0 && (
          <div className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mt-1">
            {unreadCount}
          </div>
        )}
      </div>
    </div>
  )
}
