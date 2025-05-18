"use client"

import { useState } from "react"

import {
  ChevronLeft,
  ChevronRight,
  HomeIcon,
  MessageSquareTextIcon,
  PlusIcon,
  SlidersHorizontalIcon,
  VideoIcon,
} from "lucide-react"

import { DayView } from "@/components/calendar/day-view"
import { MonthView } from "@/components/calendar/month-view"
import { WeekView } from "@/components/calendar/week-view"
import { StatCard } from "@/components/common"
import { ConsultationHistoryTable } from "@/components/provider/chat/consultation-history-table"
import { ConsultationDetailsModal } from "@/components/provider/consultation/consultation-details-modal"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useSearchParams } from "next/navigation"
import { useRouter } from "nextjs-toploader/app"

enum AgendaTabOptions {
  Agenda = "agenda",
  History = "history",
}

export default function AgendaPage() {
  const router = useRouter()
  const { toast } = useToast()
  const query = useSearchParams()
  const [activeTab, setActiveTab] = useState(
    query.get("tab") === AgendaTabOptions.History ? AgendaTabOptions.History : AgendaTabOptions.Agenda,
  )

  const [calendarView, setCalendarView] = useState("month")
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false)

  // Mock data
  const consultationTypes = ["Urgente", "Normal", "Seguimento"]
  const consultationCategories = ["Teleconsulta", "Chat", "Domicílio"]

  const appointments = [
    {
      id: "1",
      patientName: "Nome do paciente",
      date: new Date(currentYear, currentMonth, 9),
      startTime: new Date(currentYear, currentMonth, 9, 8, 0),
      endTime: new Date(currentYear, currentMonth, 9, 9, 0),
    },
    {
      id: "2",
      patientName: "Nome do paciente",
      date: new Date(currentYear, currentMonth, 9),
      startTime: new Date(currentYear, currentMonth, 9, 8, 0),
      endTime: new Date(currentYear, currentMonth, 9, 9, 0),
    },
    {
      id: "3",
      patientName: "Nome do paciente",
      date: new Date(currentYear, currentMonth, 13),
      startTime: new Date(currentYear, currentMonth, 13, 8, 0),
      endTime: new Date(currentYear, currentMonth, 13, 9, 0),
    },
    {
      id: "4",
      patientName: "Nome do paciente",
      date: new Date(currentYear, currentMonth, 13),
      startTime: new Date(currentYear, currentMonth, 13, 8, 0),
      endTime: new Date(currentYear, currentMonth, 13, 9, 0),
    },
    {
      id: "5",
      patientName: "Nome do paciente",
      date: new Date(currentYear, currentMonth, 13),
      startTime: new Date(currentYear, currentMonth, 13, 8, 0),
      endTime: new Date(currentYear, currentMonth, 13, 9, 0),
    },
    {
      id: "6",
      patientName: "Nome do paciente",
      date: new Date(currentYear, currentMonth, 22),
      startTime: new Date(currentYear, currentMonth, 22, 8, 0),
      endTime: new Date(currentYear, currentMonth, 22, 9, 0),
    },
  ]

  const handleTabChange = (value: AgendaTabOptions) => {
    setActiveTab(value)
    router.push(`/professional/agenda?tab=${value}`)
  }

  const handleAppointmentClick = (appointment: any) => {
    setSelectedAppointment({
      ...appointment,
      patientId: "44825",
      type: "Urgente",
      date: appointment.date.toLocaleDateString("pt-PT"),
      startTime: appointment.startTime.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" }),
      endTime: appointment.endTime.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" }),
      specialty: "Cardiologia",
      doctorName: "Nome do Médico",
      price: "250,00",
      reason: "Motivo da consulta informada pelo paciente.",
    })
    setIsAppointmentModalOpen(true)
  }

  const handleMarkAsCompleted = () => {
    // Handle marking appointment as completed
    toast({
      title: "Consulta marcada como realizada",
      description: "A consulta foi marcada como realizada com sucesso",
    })
    setIsAppointmentModalOpen(false)
  }

  const handleReschedule = () => {
    // Handle rescheduling appointment
    setIsAppointmentModalOpen(false)
    router.push("/professional/consultations/details/reschedule/123")
  }

  const handleCancel = () => {
    // Handle cancelling appointment
    setIsAppointmentModalOpen(false)
  }

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <Tabs
          value={activeTab}
          onValueChange={(value) => handleTabChange(value as AgendaTabOptions)}
          className="w-full"
        >
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value={AgendaTabOptions.Agenda}>Agenda</TabsTrigger>
              <TabsTrigger value={AgendaTabOptions.History}>Histórico</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-4 mt-4">
              <Button variant="outline" className="gap-2">
                Disponibilidade
                <SlidersHorizontalIcon />
              </Button>
              <Button className="gap-2" onClick={() => router.push("/professional/consultations/new-appointment")}>
                <PlusIcon />
                Novo agendamento
              </Button>
            </div>
          </div>

          <TabsContent value={AgendaTabOptions.Agenda} className="mt-4">
            {/* Metrics Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <StatCard title="Consultas à Domicílio" value="300" icon={<HomeIcon />} />
              <StatCard title="Consultas em Chat Rápido" value="300" icon={<MessageSquareTextIcon />} />
              <StatCard title="Teleconsultas" value="300" icon={<VideoIcon />} />
            </div>

            {/* Calendar View Selector */}
            <div className="mb-6">
              <Tabs value={calendarView} onValueChange={setCalendarView}>
                <div className="flex justify-between items-center mb-4 gap-10">
                  <div className="flex items-center gap-2">
                    <TabsList>
                      <TabsTrigger value="month">Mês</TabsTrigger>
                      <TabsTrigger value="week">Semana</TabsTrigger>
                      <TabsTrigger value="day">Dia</TabsTrigger>
                    </TabsList>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          if (calendarView === "month") {
                            const newMonth = currentMonth === 0 ? 11 : currentMonth - 1
                            const newYear = currentMonth === 0 ? currentYear - 1 : currentYear
                            setCurrentMonth(newMonth)
                            setCurrentYear(newYear)
                          } else if (calendarView === "week") {
                            const newDate = new Date(currentDate)
                            newDate.setDate(newDate.getDate() - 7)
                            setCurrentDate(newDate)
                          } else {
                            const newDate = new Date(currentDate)
                            newDate.setDate(newDate.getDate() - 1)
                            setCurrentDate(newDate)
                          }
                        }}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>

                      <span className="font-medium">
                        {calendarView === "month"
                          ? `${monthNames[currentMonth]}, ${currentYear}`
                          : currentDate.toLocaleDateString("pt-PT", { month: "long", year: "numeric" })}
                      </span>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          if (calendarView === "month") {
                            const newMonth = currentMonth === 11 ? 0 : currentMonth + 1
                            const newYear = currentMonth === 11 ? currentYear + 1 : currentYear
                            setCurrentMonth(newMonth)
                            setCurrentYear(newYear)
                          } else if (calendarView === "week") {
                            const newDate = new Date(currentDate)
                            newDate.setDate(newDate.getDate() + 7)
                            setCurrentDate(newDate)
                          } else {
                            const newDate = new Date(currentDate)
                            newDate.setDate(newDate.getDate() + 1)
                            setCurrentDate(newDate)
                          }
                        }}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-sm text-system-9 mb-1 block">Tipo de Consulta</label>
                      <Select defaultValue="Urgente">
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {consultationTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm text-system-9 mb-1 block">Categoria de Consulta</label>
                      <Select defaultValue="Teleconsulta">
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {consultationCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <TabsContent value="month" className="mt-0">
                  <MonthView
                    month={currentMonth}
                    year={currentYear}
                    appointments={appointments}
                    onDateClick={(date) => {
                      setCurrentDate(date)
                      setCalendarView("day")
                    }}
                    onMonthChange={(month, year) => {
                      setCurrentMonth(month)
                      setCurrentYear(year)
                    }}
                  />
                </TabsContent>

                <TabsContent value="week" className="mt-0">
                  <WeekView
                    startDate={(() => {
                      const date = new Date(currentDate)
                      const day = date.getDay()
                      date.setDate(date.getDate() - day)
                      return date
                    })()}
                    appointments={appointments.map((appt) => ({
                      ...appt,
                      startTime: appt.startTime,
                      endTime: appt.endTime,
                    }))}
                    onAppointmentClick={handleAppointmentClick}
                    onWeekChange={(startDate) => {
                      setCurrentDate(startDate)
                    }}
                  />
                </TabsContent>

                <TabsContent value="day" className="mt-0">
                  <DayView
                    date={currentDate}
                    appointments={appointments.map((appt) => ({
                      ...appt,
                      startTime: appt.startTime,
                      endTime: appt.endTime,
                    }))}
                    onAppointmentClick={handleAppointmentClick}
                    onDateChange={(date) => {
                      setCurrentDate(date)
                    }}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>

          <TabsContent value={AgendaTabOptions.History} className="mt-4">
            <ConsultationHistoryTable />
          </TabsContent>
        </Tabs>
      </div>
      {selectedAppointment && (
        <ConsultationDetailsModal
          type="appointment"
          isOpen={isAppointmentModalOpen}
          onClose={() => setIsAppointmentModalOpen(false)}
          appointment={selectedAppointment}
          onMarkAsCompleted={handleMarkAsCompleted}
          onReschedule={handleReschedule}
          onCancel={handleCancel}
        />
      )}
    </div>
  )
}
