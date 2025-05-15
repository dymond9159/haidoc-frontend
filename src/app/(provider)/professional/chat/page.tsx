"use client"

import { BackButton } from "@/components/common"
import { ChatConversation, ChatList, ChatPlaceholder } from "@/components/provider/chat"
import { MessageItem } from "@/types/provider/chat/types"
import { useState } from "react"

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<MessageItem | null>(null)

  return (
    <div
      className="grid grid-cols-[320px_1fr] flex-1"
      style={{ height: "-webkit-fill-available", maxHeight: "-webkit-fill-available" }}
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
