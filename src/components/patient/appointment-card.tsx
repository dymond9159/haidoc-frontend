"use client"

import { CalendarIcon, ClockIcon } from "@/components/icons"
import { Badge } from "../ui/badge"

interface AppointmentCardProps {
  title: string
  date: string
  time: string
  specialty: string
}

export function AppointmentCard({ title, date, time, specialty }: AppointmentCardProps) {
  return (
    <div className="border border-system-6 rounded-lg p-4 bg-white">
      <div className="flex flex-col items-start gap-3">
        <div className="flex flex-row gap-3 items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-system-4 flex items-center justify-center flex-shrink-0"></div>
          <h3 className="font-medium whitespace-nowrap">{title}</h3>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-4 text-sm text-system-10 mb-3">
            <div className="flex items-center gap-1">
              <CalendarIcon className="w-4 h-4 text-secondary" />
              <span className="whitespace-nowrap">{date}</span>
            </div>
            <div className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4 text-secondary" />
              <span className="whitespace-nowrap">{time}</span>
            </div>
          </div>
          <Badge variant="info">{specialty}</Badge>
        </div>
      </div>
    </div>
  )
}
