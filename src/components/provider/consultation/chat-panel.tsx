"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Send, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface ChatPanelProps {
  isOpen: boolean
  onClose: () => void
}

interface Message {
  id: string
  sender: "doctor" | "patient"
  text: string
  timestamp: Date
}

export function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "patient",
      text: "Olá doutor, estou com dor de cabeça há 3 dias",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
    {
      id: "2",
      sender: "doctor",
      text: "Olá, vamos conversar sobre isso. A dor é constante ou intermitente?",
      timestamp: new Date(Date.now() - 1000 * 60 * 4),
    },
    {
      id: "3",
      sender: "patient",
      text: "É constante, principalmente na parte da tarde",
      timestamp: new Date(Date.now() - 1000 * 60 * 3),
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    setMessages([
      ...messages,
      {
        id: Date.now().toString(),
        sender: "doctor",
        text: newMessage,
        timestamp: new Date(),
      },
    ])

    setNewMessage("")
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div
      className={cn(
        "fixed inset-0 bg-black/70 z-50 transition-transform duration-300 ease-in-out",
        isOpen ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl h-[70vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium">Chat</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex flex-col max-w-[80%] rounded-lg p-3",
                message.sender === "doctor" ? "bg-primary-9 text-white ml-auto" : "bg-gray-100 text-gray-800",
              )}
            >
              <p className="text-sm">{message.text}</p>
              <span className="text-xs opacity-70 mt-1 self-end">{formatTime(message.timestamp)}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage()
              }
            }}
          />
          <Button onClick={handleSendMessage}>
            <Send className="h-4 w-4 mr-2" />
            Enviar
          </Button>
        </div>
      </div>
    </div>
  )
}
