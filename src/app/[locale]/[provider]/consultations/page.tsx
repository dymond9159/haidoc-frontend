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

  const handleTabChange = (value: ConsultationOptions) => {
    setActiveTab(value)
    router.push(`/professional/consultations?tab=${value}`)
  }

  return (
    <div className="space-y-8">
      <Tabs
        value={activeTab}
        onValueChange={(value) => handleTabChange(value as ConsultationOptions)}
        className="w-full"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between gap-4 mb-2">
          <TabsList>
            <TabsTrigger value={ConsultationOptions.Consultation}>Consultas</TabsTrigger>
            <TabsTrigger value={ConsultationOptions.Request}>Solicitações</TabsTrigger>
          </TabsList>

          <div className="w-full md:w-auto grid grid-cols-2 gap-2 md:gap-4">
            <Button
              variant="outline"
              className="gap-2 w-full md:w-auto"
              onClick={() => router.push("/professional/profile/public/services")}
            >
              Disponibilidade
              <SlidersHorizontalIcon />
            </Button>
            <Button
              className="gap-2 w-full md:w-auto"
              onClick={() => router.push("/professional/consultations/new-appointment")}
            >
              <PlusIcon />
              Novo agendamento
            </Button>
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
