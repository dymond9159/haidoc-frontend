"use client"
import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
interface Appointment {
  id: string
  patientName: string
  date: Date
}

interface MonthViewProps {
  month: number
  year: number
  appointments: Appointment[]
  onDateClick?: (date: Date) => void
  onMonthChange?: (month: number, year: number) => void
  className?: string
}

export function MonthView({ month, year, appointments, onDateClick, onMonthChange, className }: MonthViewProps) {
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

  const getMonthData = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    // Get days from previous month to fill the first week
    const prevMonthLastDay = new Date(year, month, 0).getDate()
    const prevMonthDays = Array.from({ length: startingDayOfWeek }, (_, i) => ({
      date: new Date(year, month - 1, prevMonthLastDay - startingDayOfWeek + i + 1),
      isCurrentMonth: false,
    }))

    // Current month days
    const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => ({
      date: new Date(year, month, i + 1),
      isCurrentMonth: true,
    }))

    // Next month days to complete the grid
    const totalDaysDisplayed = Math.ceil((startingDayOfWeek + daysInMonth) / 7) * 7
    const nextMonthDays = Array.from(
      { length: totalDaysDisplayed - (prevMonthDays.length + currentMonthDays.length) },
      (_, i) => ({
        date: new Date(year, month + 1, i + 1),
        isCurrentMonth: false,
      }),
    )

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]
  }

  const monthData = getMonthData(month, year)
  const weeks = Array.from({ length: monthData.length / 7 }, (_, i) => monthData.slice(i * 7, (i + 1) * 7))

  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter(
      (appointment) =>
        appointment.date.getDate() === date.getDate() &&
        appointment.date.getMonth() === date.getMonth() &&
        appointment.date.getFullYear() === date.getFullYear(),
    )
  }

  const today = new Date()
  const isToday = (date: Date) =>
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()

  return (
    <div className={cn("w-full bg-white rounded-md", className)}>
      <div className="grid grid-cols-7 border rounded-t-md">
        {(isMobile ? shortWeekDays : weekDays).map((day, index) => (
          <div
            key={day}
            className={cn(
              "py-2 text-xs font-medium text-center",
              index === 0 && "text-error-5",
              index === 6 && "text-secondary-11",
            )}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 border-x border-b rounded-b-md">
        {weeks.map((week, weekIndex) =>
          week.map((day, dayIndex) => {
            const dayAppointments = getAppointmentsForDate(day.date)
            const maxDisplayAppointments = 3
            const hasMoreAppointments = dayAppointments.length > maxDisplayAppointments

            return (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className={cn(
                  "min-h-[100px] p-1 border-t border-r",
                  dayIndex === 0 && "border-l",
                  !day.isCurrentMonth && "bg-system-2 text-system-9",
                  isToday(day.date) && "bg-secondary-1",
                  "cursor-pointer hover:bg-system-2 transition-colors",
                )}
                onClick={() => onDateClick?.(day.date)}
              >
                <div className="text-right p-1">
                  <span
                    className={cn(
                      "inline-block w-6 h-6 rounded-full text-sm leading-6 text-center",
                      isToday(day.date) && "bg-secondary-9 text-white",
                    )}
                  >
                    {day.date.getDate()}
                  </span>
                </div>
                <div className="space-y-1">
                  {dayAppointments.slice(0, maxDisplayAppointments).map((appointment) => (
                    <div
                      key={appointment.id}
                      className="text-xs p-1 border-l-2 border-l-secondary-9 bg-white rounded truncate"
                    >
                      {appointment.patientName}
                    </div>
                  ))}
                  {hasMoreAppointments && (
                    <div className="text-xs text-primary-9 font-medium">
                      +{dayAppointments.length - maxDisplayAppointments}
                    </div>
                  )}
                </div>
              </div>
            )
          }),
        )}
      </div>
    </div>
  )
}
