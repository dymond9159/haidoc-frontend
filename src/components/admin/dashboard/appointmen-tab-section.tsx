"use client"

import { useRouter } from "nextjs-toploader/app"
import { useState } from "react"

import { LaptopMinimal, MicroscopeIcon, PillBottleIcon, StethoscopeIcon } from "lucide-react"

import { StatCard } from "@/components/common"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { TimeframeOptions } from "@/types"
import { HarvestsTable } from "./harvests-table"
import { OnlineConsultTable } from "./online-consult-table"
import { PersonConsultTable } from "./person-consult-table"
import { PharmacyDeliveriesTable } from "./pharmacy-deliveries-table"
import { ProjectionTabs } from "./projection-section" // Import from the current directory

export enum AppointmentTab {
  Complete = "realizadas",
  Scheduled = "agendadas",
}

interface AppointmentTabsProps {
  timeframe?: TimeframeOptions
}

const AppointmentTabs: React.FC<AppointmentTabsProps> = ({}) => {
  const router = useRouter()
  const [currentItem, setCurrentItem] = useState<ProjectionTabs>(ProjectionTabs.OnlineConsultation)

  const handleViewMoreClick = () => {
    router.push(`/admin/dashboard/details?mode=${currentItem}`)
  }

  const renderTable = () => {
    switch (currentItem) {
      case ProjectionTabs.OnlineConsultation:
        return <OnlineConsultTable viewMore filterable={false} onViewMoreClick={handleViewMoreClick} maxRecords={3} />
      case ProjectionTabs.PrecenseConsultation:
        return <PersonConsultTable viewMore filterable={false} onViewMoreClick={handleViewMoreClick} maxRecords={3} />
      case ProjectionTabs.PharmacyDeliveries:
        return (
          <PharmacyDeliveriesTable viewMore filterable={false} onViewMoreClick={handleViewMoreClick} maxRecords={3} />
        )
      case ProjectionTabs.Harvests:
        return <HarvestsTable viewMore filterable={false} onViewMoreClick={handleViewMoreClick} maxRecords={3} />
      default:
        return <p className="text-sm text-muted-foreground">Página inválida</p>
    }
  }

  return (
    <Tabs defaultValue={AppointmentTab.Complete}>
      <TabsList>
        <TabsTrigger value={AppointmentTab.Complete}>Realizadas</TabsTrigger>
        <TabsTrigger value={AppointmentTab.Scheduled}>Agendadas</TabsTrigger>
      </TabsList>
      <div className="grid gap-4 md:grid-cols-4 mt-6">
        <StatCard
          title="Consultas Online"
          icon={<LaptopMinimal />}
          value={300}
          trend={20}
          toggle
          selected={currentItem === ProjectionTabs.OnlineConsultation}
          onClick={() => setCurrentItem(ProjectionTabs.OnlineConsultation)}
        />
        <StatCard
          title="Consultas Presenciais"
          icon={<StethoscopeIcon />}
          value={300}
          trend={20}
          toggle
          selected={currentItem === ProjectionTabs.PrecenseConsultation}
          onClick={() => setCurrentItem(ProjectionTabs.PrecenseConsultation)}
        />
        <StatCard
          title="Entregas de Farmácia"
          icon={<PillBottleIcon />}
          value={300}
          trend={20}
          toggle
          selected={currentItem === ProjectionTabs.PharmacyDeliveries}
          onClick={() => setCurrentItem(ProjectionTabs.PharmacyDeliveries)}
        />
        <StatCard
          title="Colheitas"
          icon={<MicroscopeIcon />}
          value={300}
          trend={20}
          toggle
          selected={currentItem === ProjectionTabs.Harvests}
          onClick={() => setCurrentItem(ProjectionTabs.Harvests)}
        />
      </div>
      {renderTable()}
    </Tabs>
  )
}

export default AppointmentTabs
