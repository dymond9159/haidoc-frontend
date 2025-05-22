"use client"

import { BackButton } from "@/components/common"
import { ChatConversation, ChatList, ChatPlaceholder } from "@/components/provider/chat"
import { useScreen } from "@/hooks/use-screen"
import { MessageItem } from "@/types/provider/chat/types"
import { useState } from "react"

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<MessageItem | null>(null)
  const screen = useScreen()

  // Mobile/tablet: show only one panel at a time
  if (screen.isMobile) {
    return (
      <div className="flex flex-col h-full">
        {!selectedChat ? (
          <div className="flex-1">
            <BackButton text="Suas Conversas" />
            <ChatList onSelectChat={setSelectedChat} selectedChat={selectedChat} />
          </div>
        ) : (
          <div className="flex-1">
            <ChatConversation chat={selectedChat} showBackButton onBack={() => setSelectedChat(null)} />
          </div>
        )}
      </div>
    )
  }

  // Desktop: side-by-side
  return (
    <div
      className="grid grid-cols-[320px_1fr] h-full"
      // style={{ height: "-webkit-fill-available", maxHeight: "-webkit-fill-available" }}
    >
      <div className="w-[320px] border-r flex flex-col">
        <div>
          <BackButton text="Suas Conversas" />
        </div>
        <ChatList onSelectChat={setSelectedChat} selectedChat={selectedChat} />
      </div>
      <div className="flex-1">{selectedChat ? <ChatConversation chat={selectedChat} /> : <ChatPlaceholder />}</div>
    </div>
  )
}
