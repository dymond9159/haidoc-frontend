"use client"

import { useState } from "react"

import { CalendarIcon, ChevronDown, ChevronLeft, ChevronRight, PlusIcon, SlidersHorizontalIcon } from "lucide-react"

import { DayView } from "@/components/calendar/day-view"
import { MonthView } from "@/components/calendar/month-view"
import { WeekView } from "@/components/calendar/week-view"
import { StatCard } from "@/components/common"
import { AppointmentDetailsModal } from "@/components/provider/agenda/appointment-details-dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AgendaPage() {
  const [activeTab, setActiveTab] = useState("agenda")
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

  const handleAppointmentClick = (appointment: any) => {
    setSelectedAppointment({
      ...appointment,
      patientId: "44825",
      type: "Urgente",
      date: appointment.date.toLocaleDateString("pt-BR"),
      startTime: appointment.startTime.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      endTime: appointment.endTime.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      specialty: "Cardiologia",
      doctorName: "Nome do Médico",
      price: "250,00",
      reason: "Motivo da consulta informada pelo paciente.",
    })
    setIsAppointmentModalOpen(true)
  }

  const handleMarkAsCompleted = () => {
    // Handle marking appointment as completed
    setIsAppointmentModalOpen(false)
  }

  const handleReschedule = () => {
    // Handle rescheduling appointment
    setIsAppointmentModalOpen(false)
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
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="agenda">Agenda</TabsTrigger>
            <TabsTrigger value="historico">Histórico</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-4 mt-4">
            <Button variant="outline" className="gap-2">
              Disponibilidade
              <SlidersHorizontalIcon />
            </Button>
            <Button className="gap-2">
              <PlusIcon />
              Novo agendamento
            </Button>
          </div>

          <TabsContent value="agenda" className="mt-4">
            {/* Metrics Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <StatCard
                title="Consultas à Domicílio"
                value="300"
                icon={
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7.5 18.3333V15C7.5 14.0795 8.24619 13.3333 9.16667 13.3333H10.8333C11.7538 13.3333 12.5 14.0795 12.5 15V18.3333M12.5 18.3333H16.6667C17.1269 18.3333 17.5 17.9602 17.5 17.5V9.28866C17.5 9.05048 17.4023 8.82329 17.2315 8.65247L10.0649 1.48587C9.74834 1.16928 9.24209 1.16928 8.92551 1.48587L1.75891 8.65247C1.58809 8.82329 1.49036 9.05048 1.49036 9.28866V17.5C1.49036 17.9602 1.86346 18.3333 2.32369 18.3333H6.66667"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              />
              <StatCard
                title="Consultas em Chat Rápido"
                value="300"
                icon={
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M17.5 9.58336C17.5029 10.6832 17.2459 11.7683 16.75 12.75C16.162 13.9265 15.2581 14.916 14.1395 15.6078C13.021 16.2995 11.7319 16.6662 10.4167 16.6667C9.31678 16.6696 8.23176 16.4126 7.25 15.9167L2.5 17.5L4.08333 12.75C3.58744 11.7683 3.33047 10.6832 3.33333 9.58336C3.33384 8.26815 3.70051 6.97907 4.39227 5.86048C5.08402 4.7419 6.07355 3.838 7.25 3.25002C8.23176 2.75413 9.31678 2.49716 10.4167 2.50002H10.8333C12.5703 2.59585 14.2109 3.32899 15.4409 4.55907C16.671 5.78915 17.4042 7.42973 17.5 9.16669V9.58336Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              />
              <StatCard
                title="Teleconsultas"
                value="300"
                icon={
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M15.8333 8.33331H4.16667C3.24619 8.33331 2.5 9.0795 2.5 9.99998V15.8333C2.5 16.7538 3.24619 17.5 4.16667 17.5H15.8333C16.7538 17.5 17.5 16.7538 17.5 15.8333V9.99998C17.5 9.0795 16.7538 8.33331 15.8333 8.33331Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.83331 8.33331V5.83331C5.83331 4.72824 6.27229 3.66845 7.05372 2.88702C7.83516 2.10558 8.89495 1.66665 9.99998 1.66665C11.105 1.66665 12.1648 2.10558 12.9462 2.88702C13.7277 3.66845 14.1666 4.72824 14.1666 5.83331V8.33331"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              />
            </div>

            {/* Calendar View Selector */}
            <div className="mb-6">
              <Tabs value={calendarView} onValueChange={setCalendarView}>
                <div className="flex justify-between items-center mb-4">
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
                        : currentDate.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-sm text-system-9 mb-1 block">Tipo de Consulta</label>
                    <Select defaultValue="Urgente">
                      <SelectTrigger>
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
                      <SelectTrigger>
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

          <TabsContent value="historico" className="mt-4">
            <div className="bg-white rounded-lg border border-system-5 p-6">
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                <div className="flex-1">
                  <label className="text-sm text-system-9 mb-1 block">Pesquisar</label>
                  <div className="relative">
                    <svg
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-system-9"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14 14L11.1 11.1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <input
                      type="text"
                      placeholder="Pesquisar"
                      className="w-full pl-10 pr-4 py-2 border border-system-5 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-9 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-system-9 mb-1 block">Status</label>
                  <Select defaultValue="Todos">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Todos">Todos</SelectItem>
                      <SelectItem value="Realizado">Realizado</SelectItem>
                      <SelectItem value="Cancelado">Cancelado</SelectItem>
                      <SelectItem value="Reagendado">Reagendado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-system-9 mb-1 block">Data</label>
                  <Button variant="outline" className="w-[200px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span>Selecione uma Data</span>
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-system-5">
                      <th className="text-left py-2 px-4 text-sm font-medium text-system-11">
                        <div className="flex items-center gap-1">
                          NOME DO PACIENTE
                          <Button variant="ghost" size="icon" className="h-5 w-5">
                            <ChevronDown className="h-3 w-3" />
                          </Button>
                        </div>
                      </th>
                      <th className="text-left py-2 px-4 text-sm font-medium text-system-11">TIPO DE CONSULTA</th>
                      <th className="text-left py-2 px-4 text-sm font-medium text-system-11">
                        <div className="flex items-center gap-1">
                          DATA E HORA
                          <Button variant="ghost" size="icon" className="h-5 w-5">
                            <ChevronDown className="h-3 w-3" />
                          </Button>
                        </div>
                      </th>
                      <th className="text-left py-2 px-4 text-sm font-medium text-system-11">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-system-5">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <tr key={index} className="hover:bg-system-1 cursor-pointer">
                        <td className="py-4 px-4">Maria Francisca de Souza</td>
                        <td className="py-4 px-4">
                          {index % 3 === 0 && "Urgente"}
                          {index % 3 === 1 && "Seguimento"}
                          {index % 3 === 2 && "Normal"}
                        </td>
                        <td className="py-4 px-4">
                          18:45
                          <br />
                          <span className="text-xs text-system-9">09/07/24</span>
                        </td>
                        <td className="py-4 px-4">
                          {index % 3 === 0 && <span className="text-error-5">Cancelado</span>}
                          {index % 3 === 1 && <span className="text-success-5">Realizado</span>}
                          {index % 3 === 2 && <span className="text-info-5">Reagendado</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center mt-6">
                <Button variant="outline" className="gap-2">
                  <ChevronLeft className="h-4 w-4" />
                  Anterior
                </Button>

                <div className="flex items-center gap-1">
                  <Button variant="outline" className="h-8 w-8 p-0 bg-secondary-9 text-white border-secondary-9">
                    1
                  </Button>
                  <Button variant="outline" className="h-8 w-8 p-0">
                    2
                  </Button>
                  <span className="mx-1">...</span>
                  <Button variant="outline" className="h-8 w-8 p-0">
                    8
                  </Button>
                  <Button variant="outline" className="h-8 w-8 p-0">
                    9
                  </Button>
                  <Button variant="outline" className="h-8 w-8 p-0">
                    10
                  </Button>
                </div>

                <Button variant="outline" className="gap-2">
                  Próximo
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      {selectedAppointment && (
        <AppointmentDetailsModal
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
