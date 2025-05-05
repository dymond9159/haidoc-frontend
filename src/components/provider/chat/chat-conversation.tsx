"use client"

import { SuccessToast } from "@/components/toast/success-toast"
import { ScrollArea, ScrollBar } from "@/components/ui"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { mockMessages } from "@/lib/mock-data/professional/chat"
import { ChatMessage } from "@/types/provider/chat/interfaces"
import { MessageItem } from "@/types/provider/chat/types"
import { UserRole } from "@/types/user"
import { Paperclip, Send } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ConsultationSummaryModal } from "./consultation-summary-modal"
import { EndChatModal } from "./end-chat-modal"

interface ChatConversationProps {
  chat: MessageItem
  isFinished?: boolean
}

export function ChatConversation({ chat, isFinished = false }: ChatConversationProps) {
  const [message, setMessage] = useState("")
  const [isEndChatModalOpen, setIsEndChatModalOpen] = useState(false)
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false)
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [mockMessages])

  const handleSendMessage = () => {
    if (message.trim() === "") return
    // In a real app, you would send the message to the API
    const newMessage: ChatMessage = {
      id: `${mockMessages.length + 1}`,
      sender: UserRole.Professional,
      content: message,
      dateTime: new Date().toLocaleString(),
      isAttachment: false,
    }
    mockMessages.push(newMessage)

    // Send message to API
    // await api.post("/messages", newMessage)
    // provide the mock api with the new message
    const newPatientMessage: ChatMessage = {
      id: `${mockMessages.length + 1}`,
      sender: UserRole.Patient,
      content: "Olá, gostaria de tirar uma dúvida",
      dateTime: new Date().toLocaleString(),
      isAttachment: false,
    }
    mockMessages.push(newPatientMessage)
    console.log("Message sent:", newMessage)
    setMessage("")
  }

  const handleEndChat = () => {
    setIsEndChatModalOpen(false)
    setIsSummaryModalOpen(true)
  }

  const handleSubmitSummary = () => {
    setIsSummaryModalOpen(false)
    setShowSuccessToast(true)
    setTimeout(() => setShowSuccessToast(false), 4000)
  }

  const handleFileUpload = () => {
    // In a real app, you would open a file picker
    const fileInput = document.createElement("input")
    fileInput.type = "file"
    fileInput.accept = ".pdf,.doc,.docx,.jpg,.jpeg,.png"
    fileInput.multiple = false

    fileInput.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      // In a real app, you would upload the file to storage and get URL
      const newMessage: ChatMessage = {
        id: `${mockMessages.length + 1}`,
        sender: UserRole.Professional,
        content: file.name,
        dateTime: new Date().toLocaleString(),
        isAttachment: true,
      }
      mockMessages.push(newMessage)
      setMessage("")
    }

    fileInput.click()

    console.log("File upload clicked")
  }

  return (
    <div
      className="flex flex-col"
      style={{ height: "calc(100vh - 280px)", minHeight: "calc(100vh - 280px)", maxHeight: "calc(100vh - 280px)" }}
    >
      {/* Chat header */}
      <div className="p-4 border-b flex items-center gap-3">
        <Link href={`/professional/chat/patient/${chat.id}`}>
          <div className="flex items-center gap-3 cursor-pointer">
            <Avatar className="h-10 w-10">
              <AvatarImage src={chat.avatar || "/images/placeholder.svg?height=40&width=40"} alt={chat.name} />
              <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="font-medium">{chat.name}</span>
          </div>
        </Link>
      </div>

      {/* Chat messages */}
      <div className="flex-1 p-4 pr-0 h-full">
        <ScrollArea className="h-full pr-1">
          {mockMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-end gap-2 mb-4 ${msg.sender === UserRole.Professional ? "flex-row-reverse" : ""}`}
            >
              <Avatar className="h-8 w-8 mt-1">
                <AvatarImage
                  src={
                    msg.sender === UserRole.Professional
                      ? "/images/avatar-professional.svg"
                      : chat.avatar || "/images/placeholder.svg?height=40&width=40"
                  }
                  alt={msg.sender}
                />
                <AvatarFallback>{msg.sender.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col max-w-[70%]">
                <div
                  className={`relative p-3 rounded-2xl break-words ${
                    msg.sender === UserRole.Professional
                      ? "bg-secondary-11 text-white rounded-br-none ml-auto"
                      : "bg-system-3 text-foreground rounded-bl-none"
                  } ${msg.isAttachment ? "flex items-center gap-2 bg-primary-600 text-white" : ""}`}
                >
                  {msg.isAttachment ? (
                    <>
                      <Paperclip className="w-5 h-5 mr-2 inline-block" />
                      <Link href={msg.content} target="_blank" className="truncate hover:underline">
                        {msg.content}
                      </Link>
                    </>
                  ) : (
                    <span className="text-sm whitespace-pre-line">{msg.content}</span>
                  )}
                  <div
                    className={`text-xs mt-1 ${
                      msg.sender === UserRole.Professional ? "text-right text-primary-300" : "text-left text-gray-400"
                    }`}
                  >
                    {msg.dateTime}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />

          {isFinished && (
            <div className="text-center text-sm text-gray-500 mt-4 p-3 border-t bg-gray-50">
              Consulta Finalizada em 24/12/2024 às 14:34
            </div>
          )}
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>

      {/* Chat input */}
      {!isFinished && (
        <div className="p-2 border-t">
          <div className="mb-3 flex justify-center">
            <Button variant="link" size="sm" onClick={() => setIsEndChatModalOpen(true)}>
              Finalizar Conversa
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button type="button" size="icon" variant="outline" className="rounded-full" onClick={handleFileUpload}>
              <Paperclip className="h-5 w-5" />
            </Button>
            <Input
              type="text"
              className="rounded-b-none"
              placeholder="Digite sua mensagem..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={400}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
            />
            <Button type="button" size="icon" className="rounded-full" onClick={handleSendMessage}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}

      <EndChatModal
        isOpen={isEndChatModalOpen}
        onClose={() => setIsEndChatModalOpen(false)}
        onConfirm={handleEndChat}
      />

      <ConsultationSummaryModal
        isOpen={isSummaryModalOpen}
        onClose={() => setIsSummaryModalOpen(false)}
        onSubmit={handleSubmitSummary}
      />

      {showSuccessToast && <SuccessToast message="Sucesso. Sua ação foi realizada com sucesso!" />}
    </div>
  )
}
