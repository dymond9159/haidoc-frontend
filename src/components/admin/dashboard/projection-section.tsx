"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LaptopMinimalIcon,
  MicroscopeIcon,
  PillBottleIcon,
  StethoscopeIcon,
  UserRoundCheckIcon,
  UserRoundPlusIcon,
} from "lucide-react"
import { ChartSection } from "./chart-section"

import { mockProjectionData } from "@/lib/mock-data/dashboard"
import { cn } from "@/lib/utils"
import { TimeframeOptions } from "@/types"
import { PlanoStats } from "../plano-stats"

export enum ProjectionTabs {
  NewUser = "Novos Usuários",
  ActiveUser = "Usuários Ativos",
  OnlineConsultation = "Consultas Online",
  PrecenseConsultation = "Consultas Presenciais",
  PharmacyDeliveries = "Entregas de Farmácia",
  Harvests = "Colheitas",
}

const Icons = {
  NewUser: <UserRoundPlusIcon />,
  ActiveUser: <UserRoundCheckIcon />,
  OnlineConsultation: <LaptopMinimalIcon />,
  PrecenseConsultation: <StethoscopeIcon />,
  PharmacyDeliveries: <PillBottleIcon />,
  Harvests: <MicroscopeIcon />,
}

interface DashboardProjectionSectionProps {
  timeframe?: TimeframeOptions
}

export function DashboardProjectionSection({
  timeframe = TimeframeOptions.SixMonths,
}: DashboardProjectionSectionProps) {
  const projectionData = mockProjectionData(timeframe)

  return (
    <div className="space-y-8">
      <Tabs defaultValue={ProjectionTabs.NewUser}>
        <TabsList className="w-full h-fit space-y-6">
          <div className="w-full grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {Object.entries(ProjectionTabs).map(([key, item], index) => (
              <TabsTrigger
                key={index}
                className={cn(
                  index < 2 ? "col-span-2" : "col-span-1",
                  "truncate",
                )}
                value={item}
                variant="button"
                size="lg"
              >
                {Icons?.[key as keyof typeof Icons]}
                {item}
              </TabsTrigger>
            ))}
          </div>
        </TabsList>
        <TabsContent value={ProjectionTabs.NewUser} className="mt-4">
          <ChartSection title={"Novos Usuários"} data={projectionData} />
        </TabsContent>
        <TabsContent value={ProjectionTabs.ActiveUser} className="mt-4">
          <ChartSection title={"Usuários Ativos"} data={projectionData} />
          <PlanoStats timeframe={timeframe} />
        </TabsContent>
        <TabsContent value={ProjectionTabs.OnlineConsultation} className="mt-4">
          <ChartSection
            title={"Consultas Online Realizadas"}
            data={projectionData}
          />
          <ChartSection
            title={"Consultas Online Agendadas"}
            data={projectionData}
          />
        </TabsContent>
        <TabsContent
          value={ProjectionTabs.PrecenseConsultation}
          className="mt-4"
        >
          <ChartSection
            title={"Consultas Presenciais Realizadas"}
            data={projectionData}
          />
          <ChartSection
            title={"Consultas Presenciais Agendadas"}
            data={projectionData}
          />
        </TabsContent>
        <TabsContent value={ProjectionTabs.PharmacyDeliveries} className="mt-4">
          <ChartSection
            title={"Entregas de Farmácia Realizadas"}
            data={projectionData}
          />
          <ChartSection
            title={"Entregas de Farmácia Agendadas"}
            data={projectionData}
          />
        </TabsContent>
        <TabsContent value={ProjectionTabs.Harvests} className="mt-4">
          <ChartSection title={"Colheitas Realizadas"} data={projectionData} />
          <ChartSection title={"Colheitas Agendadas"} data={projectionData} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
