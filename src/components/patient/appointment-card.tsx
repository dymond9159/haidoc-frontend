"use client"

import { CalendarIcon, ClockIcon } from "@/components/icons"

interface AppointmentCardProps {
  title: string
  date: string
  time: string
  specialty: string
}

export function AppointmentCard({ title, date, time, specialty }: AppointmentCardProps) {
  return (
    <div className="border border-system-6 rounded-lg p-4 bg-white">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-system-4 flex items-center justify-center flex-shrink-0">
          <div className="w-6 h-6 rounded-full bg-system-6"></div>
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 mb-3">{title}</h3>
          <div className="flex items-center gap-4 text-sm text-system-10 mb-3">
            <div className="flex items-center gap-1">
              <CalendarIcon className="w-4 h-4 text-haidoc-blue" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4 text-haidoc-blue" />
              <span>{time}</span>
            </div>
          </div>
          <div className="inline-block px-3 py-1 bg-haidoc-lightBlue text-haidoc-blue text-sm rounded-full">
            {specialty}
          </div>
        </div>
      </div>
    </div>
  )
}
