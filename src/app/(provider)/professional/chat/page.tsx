"use client"

import { ChatConversation, ChatList, ChatPlaceholder } from "@/components/provider/chat"
import LinkButton from "@/components/ui/link"
import { MessageItem } from "@/types/provider/chat/types"
import { useState } from "react"

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<MessageItem | null>(null)

  return (
    <div
      className="grid grid-cols-[400px_1fr] flex-1"
      style={{ height: "-webkit-fill-available", maxHeight: "-webkit-fill-available" }}
    >
      <div className="w-[400px] border-r flex flex-col">
        <div className="pb-2">
          <LinkButton variant="default" direction="left" href="/professional/">
            Suas Conversas
          </LinkButton>
        </div>
        <ChatList onSelectChat={setSelectedChat} selectedChat={selectedChat} />
      </div>
      <div className="flex-1">{selectedChat ? <ChatConversation chat={selectedChat} /> : <ChatPlaceholder />}</div>
    </div>
  )
}
