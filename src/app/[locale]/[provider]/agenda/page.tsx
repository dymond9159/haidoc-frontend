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
import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"
import { useRouter } from "nextjs-toploader/app"

enum AgendaTabOptions {
  Agenda = "agenda",
  History = "history",
}

export default function AgendaPage() {
  const router = useRouter()
  const t = useTranslations("pages.provider.agenda")
  const tForm = useTranslations("form")
  const tCta = useTranslations("cta")
  const tFilter = useTranslations("table.filter")
  const tNotification = useTranslations("notification")

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
  const consultationTypes = [
    tForm("category.consultationType.urgent"),
    tForm("category.consultationType.normal"),
    tForm("category.consultationType.followUp"),
  ]
  const consultationCategories = [
    tForm("category.consultationCategory.teleconsultation"),
    tForm("category.consultationCategory.chat"),
    tForm("category.consultationCategory.home"),
  ]

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
      title: tNotification("appointment.success.title"),
      description: tNotification("appointment.success.message"),
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
    tForm("category.months.january"),
    tForm("category.months.february"),
    tForm("category.months.march"),
    tForm("category.months.april"),
    tForm("category.months.may"),
    tForm("category.months.june"),
    tForm("category.months.july"),
    tForm("category.months.august"),
    tForm("category.months.september"),
    tForm("category.months.october"),
    tForm("category.months.november"),
    tForm("category.months.december"),
  ]

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <Tabs
          value={activeTab}
          onValueChange={(value) => handleTabChange(value as AgendaTabOptions)}
          className="w-full"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between gap-4 mb-2">
            <TabsList>
              <TabsTrigger value={AgendaTabOptions.Agenda}>{t("tabs.agenda")}</TabsTrigger>
              <TabsTrigger value={AgendaTabOptions.History}>{t("tabs.history")}</TabsTrigger>
            </TabsList>

            <div className="w-full md:w-auto grid grid-cols-2 gap-2 md:gap-4">
              <Button
                variant="outline"
                className="gap-2 w-full md:w-auto"
                onClick={() => router.push("/professional/profile/public/services")}
              >
                {tCta("availability")}
                <SlidersHorizontalIcon />
              </Button>
              <Button
                className="gap-2 w-full md:w-auto"
                onClick={() => router.push("/professional/consultations/new-appointment")}
              >
                <PlusIcon />
                {tCta("newAppointment")}
              </Button>
            </div>
          </div>

          <TabsContent value={AgendaTabOptions.Agenda}>
            {/* Metrics Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <StatCard title={t("metricStatus.home")} value="300" icon={<HomeIcon />} />
              <StatCard title={t("metricStatus.chat")} value="300" icon={<MessageSquareTextIcon />} />
              <StatCard title={t("metricStatus.teleconsultation")} value="300" icon={<VideoIcon />} />
            </div>

            {/* Calendar View Selector */}
            <div className="mb-6">
              <Tabs value={calendarView} onValueChange={setCalendarView}>
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-10">
                  <div className="w-full md:w-auto flex flex-col md:flex-row items-center justify-start md:justify-between gap-2">
                    <TabsList className="w-full md:w-auto gap-2 md:gap-4">
                      <TabsTrigger value="month">{t("tabs.month")}</TabsTrigger>
                      <TabsTrigger value="week">{t("tabs.week")}</TabsTrigger>
                      <TabsTrigger value="day">{t("tabs.day")}</TabsTrigger>
                    </TabsList>
                    <div className="flex flex-row items-center gap-2">
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
                  <div className="w-full md:w-auto grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-sm mb-1 block">{tFilter("label.typeOfConsultation")}</label>
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
                      <label className="text-sm mb-1 block">{tFilter("label.categoryOfConsultation")}</label>
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
