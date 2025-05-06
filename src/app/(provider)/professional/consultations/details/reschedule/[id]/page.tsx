"use client"

import { Asterisk, StatusLabel } from "@/components/common"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import LinkButton from "@/components/ui/link"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { TimeSlots } from "@/lib/constants/app"
import { cn } from "@/lib/utils"
import { ConsultationCategory, ConsultationType } from "@/types/provider/professional/types"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { useParams } from "next/navigation"
import { useRouter } from "nextjs-toploader/app"
import { useState } from "react"

export default function RescheduleConsultationPage() {
  const router = useRouter()
  const params = useParams()
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([])
  const [rescheduleReason, setRescheduleReason] = useState("")

  const handleTimeSlotClick = (timeSlot: string) => {
    if (selectedTimeSlots.includes(timeSlot)) {
      setSelectedTimeSlots(selectedTimeSlots.filter((slot) => slot !== timeSlot))
    } else {
      if (selectedTimeSlots.length < 2) {
        setSelectedTimeSlots([...selectedTimeSlots, timeSlot].sort())
      } else {
        setSelectedTimeSlots([timeSlot])
      }
    }
  }

  const handleSubmit = () => {
    console.log({
      consultationId: params.id,
      newDate: date,
      timeSlots: selectedTimeSlots,
      rescheduleReason,
    })
    // In a real app, you would send this data to your backend
    // and then redirect the user
  }

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <LinkButton href="" direction="left" variant="default" onClick={() => router.back()}>
          Reagendar Consulta
        </LinkButton>
      </div>

      <Card className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border">
              <AvatarImage src="/images/placeholder.svg?height=64&width=64" alt="Nome do paciente" />
              <AvatarFallback>NP</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-medium">Nome do paciente</h2>
              <p className="text-sm text-gray-500">ID do paciente: #44825</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm text-gray-500 mb-2">Tipo de Consulta:</h3>
            <StatusLabel status={ConsultationType.Urgent} className="m-0" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <h3 className="text-sm text-gray-500 mb-2">Especialidade</h3>
            <p className="text-base font-medium">Cardiologia</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500 mb-2">Médico</h3>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/images/placeholder.svg?height=24&width=24" alt="Nome do Médico" />
                <AvatarFallback>NM</AvatarFallback>
              </Avatar>
              <p className="text-base font-medium">Nome do Médico</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm text-gray-500 mb-2">Valor</h3>
            <p className="text-base font-medium">250,00 MZN</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500 mb-2">Categoria</h3>
            <StatusLabel status={ConsultationCategory.Teleconsultation} className="m-0" />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm text-gray-500 mb-2">Motivo da Consulta</h3>
          <p className="text-base font-medium">Motivo da consulta do paciente</p>
        </div>

        <div className="mb-6">
          <label className="text-sm font-medium mb-1 block">
            Data <Asterisk />
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("justify-start text-left font-normal", !date && "text-gray-400")}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP", { locale: ptBR }) : "Selecione uma Data"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="mb-6">
          <label className="text-sm font-medium mb-1 block">
            Horários disponíveis <Asterisk />
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-12 gap-2">
            {TimeSlots.map((time) => (
              <Button
                key={time}
                type="button"
                size="sm"
                variant={selectedTimeSlots.includes(time) ? "secondary" : "outline"}
                className={cn(
                  "h-8 px-4 py-2 rounded-md",
                  selectedTimeSlots.includes(time) ? "bg-secondary-9 text-white" : "",
                )}
                onClick={() => handleTimeSlotClick(time)}
              >
                {time}
              </Button>
            ))}
          </div>
          {selectedTimeSlots.length === 2 && (
            <p className="text-sm text-gray-500 mt-2">
              Horário selecionado: {selectedTimeSlots[0]} - {selectedTimeSlots[1]}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="text-sm font-medium mb-1 block">
            Motivo do reagendamento <Asterisk />
          </label>
          <Textarea
            value={rescheduleReason}
            onChange={(e) => setRescheduleReason(e.target.value)}
            placeholder="Motivo do reagendamento da consulta ao paciente"
            rows={4}
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSubmit} disabled={!date || selectedTimeSlots.length !== 2 || !rescheduleReason}>
            Enviar
          </Button>
        </div>
      </Card>
    </div>
  )
}
