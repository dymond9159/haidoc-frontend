"use client"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
interface Appointment {
  id: string
  patientName: string
  startTime: Date
  endTime: Date
}

interface DayViewProps {
  date: Date
  appointments: Appointment[]
  onAppointmentClick?: (appointment: Appointment) => void
  onDateChange?: (date: Date) => void
  className?: string
}

export function DayView({ date, appointments, onAppointmentClick, onDateChange, className }: DayViewProps) {
  const t = useTranslations("form")

  const hours = Array.from({ length: 14 }, (_, i) => i + 7) // 7:00 to 20:00

  const getAppointmentsForHour = (hour: number) => {
    return appointments.filter((appointment) => appointment.startTime.getHours() === hour)
  }

  const weekDays = [
    t("category.weekDays.sunday"),
    t("category.weekDays.monday"),
    t("category.weekDays.tuesday"),
    t("category.weekDays.wednesday"),
    t("category.weekDays.thursday"),
    t("category.weekDays.friday"),
    t("category.weekDays.saturday"),
  ]
  const dayOfWeek = weekDays[date.getDay()]

  const today = new Date()
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()

  const currentHour = today.getHours()
  const currentMinutes = today.getMinutes()
  const currentTimePosition = currentHour - 7 + currentMinutes / 60 // Relative to 7:00 start

  return (
    <div className={cn("w-full bg-white rounded-md", className)}>
      <div className="border rounded-md relative">
        {hours.map((hour) => {
          const hourAppointments = getAppointmentsForHour(hour)

          return (
            <div
              key={hour}
              className={cn("grid grid-cols-[80px_1fr] border-t first:border-t-0", isToday && "bg-secondary-1")}
            >
              <div className="py-2 px-2 text-xs text-system-9 text-right border-r">{hour}:00</div>
              <div className="min-h-[60px] p-2 relative">
                {hourAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="text-xs p-2 border-l-2 border-l-secondary-9 bg-white rounded mb-1 cursor-pointer hover:bg-system-1"
                    onClick={() => onAppointmentClick?.(appointment)}
                  >
                    <div className="font-medium">{appointment.patientName}</div>
                    <div className="text-system-9">
                      {appointment.startTime.getHours()}:
                      {appointment.startTime.getMinutes().toString().padStart(2, "0")} -{" "}
                      {appointment.endTime.getHours()}:{appointment.endTime.getMinutes().toString().padStart(2, "0")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        {/* Current time indicator */}
        {isToday && (
          <div
            className="absolute left-0 right-0 border-t border-dashed border-primary-9 z-10 pointer-events-none"
            style={{ top: `${currentTimePosition * 60}px` }}
          ></div>
        )}
      </div>
    </div>
  )
}
