"use client"

import { useState } from "react"

import { CalendarCheckIcon, CalendarClockIcon, PlusIcon, StethoscopeIcon } from "lucide-react"

import { MessageItem } from "@/components/provider"
import { Button } from "@/components/ui/button"

import { AppointmentCard1 } from "@/components/cards"
import { StatCard } from "@/components/common"
import { RequestConsultationTable } from "@/components/provider/home/request-consult-table"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import LinkButton from "@/components/ui/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Months, WeekDays } from "@/lib/constants/index"
import { mockHistoryMessages } from "@/lib/mock-data/professional/chat"
import { mockAppointments } from "@/lib/mock-data/professional/home"
import { useRouter } from "nextjs-toploader/app"

export default function ProfessionalHomePage() {
  const router = useRouter()
  const [selectedMonth, setSelectedMonth] = useState("Agosto")
  const [selectedDate, setSelectedDate] = useState(9) // Current date in the calendar

  const currentWeekDates = [4, 5, 6, 7, 8, 9, 10]

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Hi, doctor!</h1>
        <Button className="gap-2" onClick={() => router.push("/professional/consultations/new-appointment")}>
          <PlusIcon size={16} />
          Novo agendamento
        </Button>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard
          title="Consultas Marcadas"
          value={300}
          icon={<CalendarClockIcon />}
          action={
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[100px] h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Months.map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          }
        />
        <StatCard title="Consultas Realizadas" icon={<CalendarCheckIcon />} value={300} />
        <StatCard title="Consultas pendentes" icon={<StethoscopeIcon />} value={300} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Messages Section */}
        <Card>
          <CardHeader>
            <CardTitle>Últimas Mensagens</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="divide-y">
              {mockHistoryMessages.map((message, index) => (
                <MessageItem
                  key={index}
                  id={message.id}
                  name={message.name}
                  message={message.message}
                  time={message.time}
                  unreadCount={message.unreadCount}
                  avatar={message.avatar}
                />
              ))}
            </div>
          </CardContent>
          <Separator className="my-0" />
          <CardFooter className="p-0 flex justify-end">
            <LinkButton href="/professional/chat">Ver Mensagens</LinkButton>
          </CardFooter>
        </Card>

        {/* Calendar Section */}
        <Card>
          <CardHeader>
            <CardTitle>Agosto 2024</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 mb-4 items-center justify-center">
              {WeekDays.map((day, index) => (
                <div key={day} className="text-center text-xs font-medium">
                  {day}
                </div>
              ))}
              {currentWeekDates.map((date, index) => (
                <Button
                  key={date}
                  variant="ghost"
                  size="icon"
                  className={`flex flex-col items-center justify-center rounded-full mx-auto ${
                    date === selectedDate
                      ? "bg-secondary-9 text-white hover:bg-secondary-9 hover:text-white"
                      : "text-system-11"
                  }`}
                  onClick={() => setSelectedDate(date)}
                >
                  <span className="text-sm">{date}</span>
                </Button>
              ))}
            </div>

            <div className="space-y-2">
              {mockAppointments.map((appointment) => (
                <AppointmentCard1
                  key={appointment.id}
                  patientName={appointment.patientName}
                  doctorName={appointment.doctorName}
                  startTime={appointment.startTime}
                  endTime={appointment.endTime}
                />
              ))}
            </div>
          </CardContent>
          <Separator className="my-0" />
          <CardFooter className="p-0 flex justify-end">
            <LinkButton href="/professional/agenda">Ver Agenda</LinkButton>
          </CardFooter>
        </Card>
      </div>

      {/* Consultation Requests Section */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Solicitações de Consulta</h3>
        <RequestConsultationTable
          maxRecords={5}
          viewMore
          onViewMoreClick={() => router.push("/professional/consultations?tab=request")}
          filterable={false}
        />
      </div>
    </div>
  )
}
