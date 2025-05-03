"use client"

import { TimeframeOptions } from "@/types"
import { UserStats } from "../users-stats"
import AppointmentTabs from "./appointmen-tab-section"

export enum AppointmentTab {
  Complete = "realizadas",
  Scheduled = "agendadas",
}

interface DashboardDefaultSectionProps {
  timeframe?: TimeframeOptions
}

export const DashboardDefaultSection = ({
  timeframe = TimeframeOptions.SixMonths,
}: DashboardDefaultSectionProps) => {
  return (
    <div className="space-y-8">
      <UserStats timeframe={timeframe} />
      <AppointmentTabs timeframe={timeframe} />
    </div>
  )
}
