"use client"

import { StatCard } from "@/components/common"
import { ConsultationHomeTable } from "@/components/provider/home/consult-home-table"
import { RequestConsultationTable } from "@/components/provider/home/request-consult-table"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HomeIcon, MessageSquareTextIcon, PlusIcon, SlidersHorizontalIcon, VideoIcon } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useRouter } from "nextjs-toploader/app"
import { useState } from "react"

export enum ConsultationOptions {
  Consultation = "consultation",
  Request = "request",
}

export default function ConsultationsPage() {
  const router = useRouter()
  const query = useSearchParams()
  const [activeTab, setActiveTab] = useState(
    query.get("tab") === ConsultationOptions.Request ? ConsultationOptions.Request : ConsultationOptions.Consultation,
  )

  return (
    <div className="space-y-8">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ConsultationOptions)} className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value={ConsultationOptions.Consultation}>Consultas</TabsTrigger>
            <TabsTrigger value={ConsultationOptions.Request}>Solicitações</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 mt-4">
              <Button variant="outline" className="gap-2">
                Disponibilidade
                <SlidersHorizontalIcon />
              </Button>
              <Button className="gap-2" onClick={() => router.push("/professional/consultations/new-appointment")}>
                <PlusIcon />
                Novo agendamento
              </Button>
            </div>
          </div>
        </div>

        <TabsContent value={ConsultationOptions.Consultation}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <StatCard title="Consultas à Domicílio" icon={<HomeIcon />} value="300" />
            <StatCard title="Consultas em Chat Rápido" icon={<MessageSquareTextIcon />} value="300" />
            <StatCard title="Teleconsultas" icon={<VideoIcon />} value="300" />
          </div>

          <ConsultationHomeTable />
        </TabsContent>

        <TabsContent value={ConsultationOptions.Request}>
          <RequestConsultationTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}
