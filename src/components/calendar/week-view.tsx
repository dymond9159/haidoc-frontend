"use client"

import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import React from "react"

interface Appointment {
  id: string
  patientName: string
  startTime: Date
  endTime: Date
}

interface WeekViewProps {
  startDate: Date
  appointments: Appointment[]
  onAppointmentClick?: (appointment: Appointment) => void
  onWeekChange?: (startDate: Date) => void
  className?: string
}

export function WeekView({ startDate, appointments, onAppointmentClick, onWeekChange, className }: WeekViewProps) {
  const t = useTranslations("form")
  const weekDays = [
    t("category.weekDays.sunday"),
    t("category.weekDays.monday"),
    t("category.weekDays.tuesday"),
    t("category.weekDays.wednesday"),
    t("category.weekDays.thursday"),
    t("category.weekDays.friday"),
    t("category.weekDays.saturday"),
  ]
  const shortWeekDays = [
    t("category.shortWeekDays.sunday"),
    t("category.shortWeekDays.monday"),
    t("category.shortWeekDays.tuesday"),
    t("category.shortWeekDays.wednesday"),
    t("category.shortWeekDays.thursday"),
    t("category.shortWeekDays.friday"),
    t("category.shortWeekDays.saturday"),
  ]

  const isMobile = useMobile()

  const hours = Array.from({ length: 14 }, (_, i) => i + 7) // 7:00 to 20:00

  const getWeekDates = (start: Date) => {
    const result = []
    const current = new Date(start)

    for (let i = 0; i < 7; i++) {
      result.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }

    return result
  }

  const weekDates = getWeekDates(startDate)

  const getAppointmentsForDateAndHour = (date: Date, hour: number) => {
    return appointments.filter(
      (appointment) =>
        appointment.startTime.getDate() === date.getDate() &&
        appointment.startTime.getMonth() === date.getMonth() &&
        appointment.startTime.getFullYear() === date.getFullYear() &&
        appointment.startTime.getHours() === hour,
    )
  }

  const formatMonthDay = (date: Date) => {
    return date.getDate()
  }

  const today = new Date()
  const isToday = (date: Date) =>
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()

  const currentHour = today.getHours()
  const currentMinutes = today.getMinutes()
  const currentTimePosition = currentHour - 7 + currentMinutes / 60 // Relative to 7:00 start

  return (
    <div className={cn("w-full bg-white rounded-md", className)}>
      <div className="grid grid-cols-8 border rounded-t-md">
        <div className="py-2 text-xs font-medium text-center"></div>
        {(isMobile ? shortWeekDays : weekDays).map((day, index) => (
          <div
            key={day}
            className={cn(
              "py-2 text-xs font-medium text-center",
              index === 0 && "text-error-5",
              index === 6 && "text-secondary-11",
            )}
          >
            <div>{day}</div>
            <div
              className={cn(
                "inline-block w-6 h-6 rounded-full text-sm leading-6 text-center mt-1",
                isToday(weekDates[index]) && "bg-secondary-9 text-white",
              )}
            >
              {formatMonthDay(weekDates[index])}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-8 border-x border-b rounded-b-md relative">
        {hours.map((hour) => (
          <React.Fragment key={hour}>
            <div className="border-t border-r py-2 px-2 text-xs text-system-9 text-right">{hour}:00</div>
            {weekDates.map((date, index) => {
              const hourAppointments = getAppointmentsForDateAndHour(date, hour)

              return (
                <div
                  key={`${date.toISOString()}-${hour}`}
                  className={cn("border-t border-r min-h-[60px] p-1 relative", isToday(date) && "bg-secondary-1")}
                >
                  {hourAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="text-xs p-1 border-l-2 border-l-secondary-9 bg-white rounded mb-1 cursor-pointer hover:bg-system-1"
                      onClick={() => onAppointmentClick?.(appointment)}
                    >
                      <div className="font-medium truncate">{appointment.patientName}</div>
                      <div className="text-system-9">
                        {appointment.startTime.getHours()}:
                        {appointment.startTime.getMinutes().toString().padStart(2, "0")} -{" "}
                        {appointment.endTime.getHours()}:{appointment.endTime.getMinutes().toString().padStart(2, "0")}
                      </div>
                    </div>
                  ))}
                </div>
              )
            })}
          </React.Fragment>
        ))}

        {/* Current time indicator */}
        {weekDates.some(isToday) && (
          <div
            className="absolute left-0 right-0 border-t border-dashed border-primary-9 z-10 pointer-events-none"
            style={{ top: `${currentTimePosition * 60}px` }}
          ></div>
        )}
      </div>
    </div>
  )
}
