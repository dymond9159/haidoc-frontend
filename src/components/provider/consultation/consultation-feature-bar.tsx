"use client"

import { useState } from "react"

import { ChevronDownIcon, HistoryIcon, MessageSquareTextIcon, Pill, StethoscopeIcon } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { ScrollArea, ScrollBar } from "@/components/ui"
import { Card } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useScreen } from "@/hooks/use-screen"
import { mockChats } from "@/lib/mock-data/professional/chat"
import { cn } from "@/lib/utils"
import { ChatConversation } from "../chat"
import { ExamsForm } from "./exams-form"
import { PatientHistoryPanel } from "./patient-history-panel"
import { PrescriptionForm } from "./prescription-form"

export enum ConsultationFeatureBarTabs {
  History = "Histórico",
  Prescription = "Prescrição",
  Exams = "Exames",
}

export const ConsultationFeatureBar = () => {
  const { isMobile, isTablet } = useScreen()
  const [activeTab, setActiveTab] = useState<ConsultationFeatureBarTabs>(ConsultationFeatureBarTabs.History)
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex-1">
        <Card className="w-[320px] flex flex-col p-0 overflow-hidden">
          <Tabs
            defaultValue={ConsultationFeatureBarTabs.History}
            className="w-full h-full p-0 gap-0"
            onValueChange={(value) => setActiveTab(value as ConsultationFeatureBarTabs)}
          >
            <div className="h-12">
              <TabsList className="grid grid-cols-3 p-0 h-12 border-b rounded-bl-none rounded-br-none gap-0">
                <TabsTrigger
                  value={ConsultationFeatureBarTabs.History}
                  className="h-full rounded-bl-none rounded-br-none rounded-tr-none"
                >
                  <HistoryIcon size={16} />
                  Histórico
                </TabsTrigger>
                <TabsTrigger
                  value={ConsultationFeatureBarTabs.Prescription}
                  className="h-full rounded-bl-none rounded-br-none rounded-tr-none rounded-tl-none"
                >
                  <Pill size={16} />
                  Prescrição
                </TabsTrigger>
                <TabsTrigger
                  value={ConsultationFeatureBarTabs.Exams}
                  className="h-full rounded-bl-none rounded-br-none rounded-tl-none"
                >
                  <StethoscopeIcon size={16} />
                  Exames
                </TabsTrigger>
              </TabsList>
            </div>
            <ScrollArea className="m-0" style={{ height: "calc(100vh - 250px)" }}>
              <TabsContent value={ConsultationFeatureBarTabs.History} className="flex-1 p-0 m-0">
                <PatientHistoryPanel />
              </TabsContent>

              <TabsContent value={ConsultationFeatureBarTabs.Prescription} className="flex-1 p-0 m-0">
                <PrescriptionForm />
              </TabsContent>

              <TabsContent value={ConsultationFeatureBarTabs.Exams} className="flex-1 p-0 m-0">
                <ExamsForm />
              </TabsContent>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
            <TabsContent value={ConsultationFeatureBarTabs.Exams} className="flex-1 p-0 m-0"></TabsContent>
          </Tabs>
        </Card>
      </div>
      <div className="w-[320px]">
        <Popover open={isChatOpen} onOpenChange={setIsChatOpen}>
          <PopoverTrigger
            className={cn(
              "w-full border rounded-lg bg-white px-3 py-3 transition cursor-pointer group",
              "flex items-center gap-2 justify-between",
            )}
          >
            <div className="flex items-center gap-2 group-hover:text-secondary">
              <MessageSquareTextIcon size={16} className="mt-1" />
              <span className="text-sm font-medium">Chat rápido</span>
            </div>
            <ChevronDownIcon
              size={16}
              className={cn("transition-transform duration-200", isChatOpen && "rotate-180")}
            />
          </PopoverTrigger>
          <PopoverContent side="top" align="end" className="w-[320px] p-0 shadow-lg rounded-md border bg-background">
            <ChatConversation chat={mockChats.read[0]} />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
