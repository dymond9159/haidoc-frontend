"use client"

import { useEffect, useState } from "react"

import { HistoryIcon, Pill, StethoscopeIcon } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { ScrollArea, ScrollBar } from "@/components/ui"
import { Card } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { useScreen } from "@/hooks/use-screen"
import { cn } from "@/lib/utils"
import { ExamsForm } from "./exams-form"
import { PatientHistoryPanel } from "./patient-history-panel"
import { PrescriptionForm } from "./prescription-form"

export enum ConsultationFeatureBarTabs {
  History = "Histórico",
  Prescription = "Prescrição",
  Exams = "Exames",
}

interface ConsultationFeatureBarProps {
  isOpenFeatureBar?: boolean
  onOpenFeatureBarChange?: (open: boolean) => void
}

export const ConsultationFeatureBar = ({
  isOpenFeatureBar: isOpenFeatureBarProp,
  onOpenFeatureBarChange,
}: ConsultationFeatureBarProps) => {
  const { isMobile } = useScreen()
  const [activeTab, setActiveTab] = useState<ConsultationFeatureBarTabs>(ConsultationFeatureBarTabs.History)

  const [isFeatureBarOpen, setIsFeatureBarOpen] = useState(false)

  useEffect(() => {
    setIsFeatureBarOpen(isOpenFeatureBarProp || false)
  }, [isOpenFeatureBarProp])

  const handleFeatureBarOpenChange = (open: boolean) => {
    if (onOpenFeatureBarChange) onOpenFeatureBarChange(open)
    else setIsFeatureBarOpen(open)
  }

  const featureBarContent = (
    <div className="flex flex-col gap-2 h-full relative">
      <div className="flex-1">
        <Card className="w-[320px] flex-1 flex flex-col !p-0 overflow-hidden">
          <Tabs
            defaultValue={ConsultationFeatureBarTabs.History}
            className="w-full h-full !p-0 !gap-0"
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
            <ScrollArea className={cn("m-0 h-[calc(100vh-250px)]", isMobile && "h-[calc(100vh-75px)]")}>
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
    </div>
  )

  if (isMobile) {
    return (
      <Sheet open={isFeatureBarOpen} onOpenChange={handleFeatureBarOpenChange}>
        <SheetContent side="right" disableClose className="h-[calc(100vh)] w-fit rounded-t-xl">
          <SheetTitle className="sr-only">Funcionalidades</SheetTitle>
          {featureBarContent}
        </SheetContent>
      </Sheet>
    )
  }

  // Desktop/tablet
  return featureBarContent
}
