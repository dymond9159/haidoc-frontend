import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface MessageItemProps {
  sender: string
  message: string
  time: string
  unreadCount?: number
  className?: string
}

export function MessageItem({ sender, message, time, unreadCount = 0, className }: MessageItemProps) {
  const initials = sender
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className={cn("flex items-start gap-3 py-3", className)}>
      <Avatar className="h-10 w-10">
        <AvatarImage src={`/images/placeholder.svg?text=${initials}`} alt={sender} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm">{sender}</p>
        <p className="text-sm text-system-9 truncate">{message}</p>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-xs text-system-9">{time}</span>
        {unreadCount > 0 && (
          <div className="bg-primary-11 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mt-1">
            {unreadCount}
          </div>
        )}
      </div>
    </div>
  )
}
