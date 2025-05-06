"use client"

import {
  ExamsForm,
  MedicalReportModal,
  PatientHistoryPanel,
  PrescriptionForm,
  VideoCallInterface,
} from "@/components/provider/consultation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Pill, TestTube } from "lucide-react"
import { useState } from "react"

export default function OnlineConsultationPage() {
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isAudioOn, setIsAudioOn] = useState(true)
  const [isEndCallModalOpen, setIsEndCallModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"history" | "prescription" | "exams">("history")

  // Handle end call
  const handleEndCall = () => {
    setIsEndCallModalOpen(true)
  }

  // Handle submit medical report
  const handleSubmitMedicalReport = (data: any) => {
    console.log("Medical report submitted:", data)
    // In a real app, you would send this data to your backend
    // Then redirect to a summary page or back to the consultations list
    window.location.href = "/professional/consultas"
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Left side - Video call */}
      <div className="flex-1 relative">
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary-9 flex items-center justify-center">
            <span className="text-white text-sm">P</span>
          </div>
          <span className="font-medium">Nome do Paciente</span>
        </div>

        <VideoCallInterface
          isVideoOn={isVideoOn}
          isAudioOn={isAudioOn}
          onToggleVideo={() => setIsVideoOn(!isVideoOn)}
          onToggleAudio={() => setIsAudioOn(!isAudioOn)}
          onEndCall={handleEndCall}
        />

        {/* Medical report modal (shown when ending call) */}
        <MedicalReportModal
          isOpen={isEndCallModalOpen}
          onClose={() => setIsEndCallModalOpen(false)}
          onSubmit={handleSubmitMedicalReport}
        />
      </div>

      {/* Right side - Tabs for History, Prescription, Exams */}
      <div className="w-[400px] border-l border-gray-200 flex flex-col">
        <Tabs defaultValue="history" className="w-full h-full" onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="grid grid-cols-3 p-0 h-12">
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-blue-50 rounded-none border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none"
            >
              <FileText className="h-4 w-4 mr-2 text-blue-500" />
              Histórico
            </TabsTrigger>
            <TabsTrigger
              value="prescription"
              className="data-[state=active]:bg-blue-50 rounded-none border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none"
            >
              <Pill className="h-4 w-4 mr-2 text-blue-500" />
              Prescrição
            </TabsTrigger>
            <TabsTrigger
              value="exams"
              className="data-[state=active]:bg-blue-50 rounded-none border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none"
            >
              <TestTube className="h-4 w-4 mr-2 text-blue-500" />
              Exames
            </TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="flex-1 p-0 m-0 overflow-auto">
            <PatientHistoryPanel />
          </TabsContent>

          <TabsContent value="prescription" className="flex-1 p-0 m-0 overflow-auto">
            <PrescriptionForm />
          </TabsContent>

          <TabsContent value="exams" className="flex-1 p-0 m-0 overflow-auto">
            <ExamsForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
