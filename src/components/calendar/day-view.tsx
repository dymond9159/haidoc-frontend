"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

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
  const hours = Array.from({ length: 14 }, (_, i) => i + 7) // 7:00 to 20:00

  const handlePrevDay = () => {
    const newDate = new Date(date)
    newDate.setDate(newDate.getDate() - 1)
    onDateChange?.(newDate)
  }

  const handleNextDay = () => {
    const newDate = new Date(date)
    newDate.setDate(newDate.getDate() + 1)
    onDateChange?.(newDate)
  }

  const getAppointmentsForHour = (hour: number) => {
    return appointments.filter((appointment) => appointment.startTime.getHours() === hour)
  }

  const weekDays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
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
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handlePrevDay}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="font-medium">
            {dayOfWeek}, {date.toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })}
          </span>
          <Button variant="ghost" size="icon" onClick={handleNextDay}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

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
