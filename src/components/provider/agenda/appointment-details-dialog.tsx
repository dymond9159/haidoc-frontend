"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Calendar, Clock } from "lucide-react"
import { useState } from "react"

interface AppointmentDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  appointment: {
    id: string
    patientName: string
    patientId: string
    type: "Urgente" | "Normal" | "Seguimento"
    date: string
    startTime: string
    endTime: string
    specialty: string
    doctorName: string
    price: string
    reason: string
  }
  onMarkAsCompleted: () => void
  onReschedule: () => void
  onCancel: () => void
}

export function AppointmentDetailsModal({
  isOpen,
  onClose,
  appointment,
  onMarkAsCompleted,
  onReschedule,
  onCancel,
}: AppointmentDetailsModalProps) {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)
  const [cancelReason, setCancelReason] = useState("")

  const handleCancel = () => {
    setShowCancelConfirm(true)
  }

  const handleConfirmCancel = () => {
    onCancel()
    setShowCancelConfirm(false)
    onClose()
  }

  const handleCancelDialog = () => {
    setShowCancelConfirm(false)
  }

  if (showCancelConfirm) {
    return (
      <Dialog open={isOpen} onOpenChange={handleCancelDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Você realmente deseja Cancelar essa Consulta?</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-system-9 mb-2">Escreva o motivo da recusa do cancelamento para o paciente</p>
            <textarea
              className="w-full border border-system-5 rounded-md p-2 text-sm resize-none"
              rows={4}
              placeholder="Digite aqui"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
            />
          </div>
          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={handleCancelDialog}>
              Descartar
            </Button>
            <Button variant="destructive" onClick={handleConfirmCancel}>
              Enviar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  const getTypeColor = () => {
    switch (appointment.type) {
      case "Urgente":
        return "bg-error-1 text-error-5"
      case "Normal":
        return "bg-system-3 text-system-9"
      case "Seguimento":
        return "bg-info-1 text-info-5"
      default:
        return "bg-system-3 text-system-9"
    }
  }

  const patientInitials = appointment.patientName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Informações da consulta</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={`/placeholder.svg?text=${patientInitials}`} alt={appointment.patientName} />
                <AvatarFallback>{patientInitials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{appointment.patientName}</p>
                <p className="text-xs text-system-9">ID do paciente: #{appointment.patientId}</p>
              </div>
            </div>
            <Badge variant="outline" className={cn("px-2 py-1 w-full justify-center", getTypeColor())}>
              {appointment.type}
            </Badge>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-system-9 mb-1">Data da consulta</p>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-system-9" />
                <span className="text-sm">{appointment.date}</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-system-9 mb-1">Hora inicial</p>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-system-9" />
                <span className="text-sm">{appointment.startTime}</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-system-9 mb-1">Hora final</p>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-system-9" />
                <span className="text-sm">{appointment.endTime}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-system-9 mb-1">Especialidade</p>
              <p className="text-sm font-medium">{appointment.specialty}</p>
            </div>
            <div>
              <p className="text-xs text-system-9 mb-1">Médico</p>
              <p className="text-sm font-medium">{appointment.doctorName}</p>
            </div>
          </div>

          <div>
            <p className="text-xs text-system-9 mb-1">Valor</p>
            <p className="text-sm font-medium">{appointment.price} MZN</p>
          </div>

          <div>
            <p className="text-xs text-system-9 mb-1">Motivo da consulta</p>
            <p className="text-sm">{appointment.reason}</p>
          </div>
        </div>
        <div className="space-y-2">
          <Button className="w-full bg-success-5 hover:bg-success-6 text-white" onClick={onMarkAsCompleted}>
            Marcar como realizada
          </Button>
          <Button variant="outline" className="w-full" onClick={onReschedule}>
            Reagendar Consulta
          </Button>
          <Button variant="ghost" className="w-full text-error-5 hover:text-error-6" onClick={handleCancel}>
            Cancelar Consulta
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
