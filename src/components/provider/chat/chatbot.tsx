import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useMobile } from "@/hooks/use-mobile"
import { mockChats } from "@/lib/mock-data/professional/chat"
import { cn } from "@/lib/utils"
import { MessageSquareTextIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { ChatConversation } from "./chat-conversation"

interface ChatbotProps {
  isOpenChat?: boolean
  onOpenChatChange?: (open: boolean) => void
}

export const Chatbot = ({ isOpenChat: isOpenChatProp, onOpenChatChange }: ChatbotProps) => {
  const isMobile = useMobile()
  const [isChatOpen, setIsChatOpen] = useState(false)

  useEffect(() => {
    setIsChatOpen(isOpenChatProp || false)
  }, [isOpenChatProp])

  const handleChatOpenChange = (open: boolean) => {
    if (onOpenChatChange) onOpenChatChange(open)
    else setIsChatOpen(open)
  }

  return (
    <div className="absolute bottom-0 right-0  w-12 h-12">
      <div className={cn("absolute bottom-5 right-5")}>
        <Popover open={isChatOpen} onOpenChange={handleChatOpenChange}>
          <PopoverTrigger
            className={cn(
              "w-12 h-12 rounded-full bg-secondary px-3 py-3 transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center group",
              "hover:bg-secondary-10 hover:shadow-lg",
              isChatOpen ? "opacity-99 hover:opacity-99" : "opacity-100 hover:scale-105",
            )}
          >
            <MessageSquareTextIcon size={21} color="white" />
          </PopoverTrigger>
          <PopoverContent side="top" align="end" className="w-[320px] p-0 shadow-lg rounded-md border bg-background">
            <ChatConversation isPopover={true} chat={mockChats.read[0]} />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
