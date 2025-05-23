"use client"

import { useState } from "react"

import { CalendarCheckIcon, CalendarClockIcon, PlusIcon, StethoscopeIcon } from "lucide-react"

import { MessageItem } from "@/components/provider"
import { Button } from "@/components/ui/button"

import { AppointmentCard1 } from "@/components/cards"
import { StatCard } from "@/components/common"
import { RequestConsultationTable } from "@/components/provider/home/request-consult-table"
import { ProfileApprovalAlert, ProfileApprovalStatus } from "@/components/provider/profile/profile-approval-alert"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import LinkButton from "@/components/ui/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { mockHistoryMessages } from "@/lib/mock-data/professional/chat"
import { mockAppointments } from "@/lib/mock-data/professional/home"
import { useTranslations } from "next-intl"
import { useRouter } from "nextjs-toploader/app"

export default function ProfessionalHomePage() {
  const router = useRouter()
  const t = useTranslations("pages.provider.home")
  const tCta = useTranslations("cta")
  const tCategory = useTranslations("form.category")

  const [selectedMonth, setSelectedMonth] = useState("Agosto")
  const [selectedDate, setSelectedDate] = useState(9) // Current date in the calendar
  const [approvedAccount, setApprovedAccount] = useState(false)

  const currentWeekDates = [4, 5, 6, 7, 8, 9, 10]
  const thisMonth = new Date().toLocaleDateString("pt-PT", { month: "long", year: "numeric" })

  const Months = [
    tCategory("months.january"),
    tCategory("months.february"),
    tCategory("months.march"),
    tCategory("months.april"),
    tCategory("months.may"),
    tCategory("months.june"),
    tCategory("months.july"),
    tCategory("months.august"),
    tCategory("months.september"),
    tCategory("months.october"),
    tCategory("months.november"),
    tCategory("months.december"),
  ]
  const ShortWeekDays = [
    tCategory("shortWeekDays.sunday"),
    tCategory("shortWeekDays.monday"),
    tCategory("shortWeekDays.tuesday"),
    tCategory("shortWeekDays.wednesday"),
    tCategory("shortWeekDays.thursday"),
    tCategory("shortWeekDays.friday"),
    tCategory("shortWeekDays.saturday"),
  ]
  return (
    <div className="space-y-8">
      <div>
        <ProfileApprovalAlert
          status={approvedAccount ? ProfileApprovalStatus.Approved : ProfileApprovalStatus.Pending}
          onActionClick={() => router.push("/professional/profile/public")}
        />
        <div className="flex flex-row items-center gap-2 mt-4 justify-end">
          <Switch checked={approvedAccount} onCheckedChange={() => setApprovedAccount(!approvedAccount)} />
        </div>
      </div>
      <div className="flex flex-col justify-start sm:flex-row sm:justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">{t("welcome", { name: "doctor" })}</h1>
        <Button
          className="gap-2 w-full sm:w-fit"
          onClick={() => router.push("/professional/consultations/new-appointment")}
        >
          <PlusIcon size={16} />
          {tCta("newAppointment")}
        </Button>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard
          title={t("metricStatus.marked")}
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
        <StatCard title={t("metricStatus.completed")} icon={<CalendarCheckIcon />} value={300} />
        <StatCard title={t("metricStatus.canceled")} icon={<StethoscopeIcon />} value={300} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Messages Section */}
        <Card>
          <CardHeader>
            <CardTitle>{t("lastestMessages")}</CardTitle>
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
            <LinkButton href="/professional/chat">{t("cta.viewMessages")}</LinkButton>
          </CardFooter>
        </Card>

        {/* Calendar Section */}
        <Card>
          <CardHeader>
            <CardTitle>{thisMonth}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 mb-4 items-center justify-center">
              {ShortWeekDays.map((day, index) => (
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
            <LinkButton href="/professional/agenda">{t("cta.viewAgenda")}</LinkButton>
          </CardFooter>
        </Card>
      </div>

      {/* Consultation Requests Section */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{t("consultationRequests")}</h3>
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
