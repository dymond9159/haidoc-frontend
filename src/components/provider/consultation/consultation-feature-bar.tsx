"use client"

import { useState } from "react"

import { HistoryIcon, MessageSquareTextIcon, Pill, StethoscopeIcon } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { ScrollArea, ScrollBar } from "@/components/ui"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { useScreen } from "@/hooks/use-screen"
import { mockChats } from "@/lib/mock-data/professional/chat"
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

  return (
    <div className="flex flex-col gap-2">
      {/* Right side - Tabs for History, Prescription, Exams */}
      <Card className="w-[320px] flex flex-col p-0 overflow-hidden" style={{ height: "calc(100vh - 140px)" }}>
        <Tabs
          defaultValue={ConsultationFeatureBarTabs.History}
          className="w-full h-full p-0"
          onValueChange={(value) => setActiveTab(value as ConsultationFeatureBarTabs)}
        >
          <div className="h-12">
            <TabsList className="grid grid-cols-3 p-0 h-12 border-b rounded-bl-none rounded-br-none">
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
          <ScrollArea className="py-2 m-0" style={{ height: "calc(100% - 50px)" }}>
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
      <div className="w-[320px] flex flex-col">
        <Accordion type="single" collapsible>
          <AccordionItem value={ConsultationFeatureBarTabs.History} className="p-0 m-0">
            <AccordionTrigger className="flex items-center gap-2 text-secondary">
              <MessageSquareTextIcon size={16} />
              Chat rápido
            </AccordionTrigger>
            <AccordionContent className="!p-0 !px-0">
              <ChatConversation chat={mockChats.read[0]} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
