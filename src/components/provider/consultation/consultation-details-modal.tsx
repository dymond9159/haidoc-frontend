"use client"

import { StatusLabel } from "@/components/common"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ConsultationType } from "@/types/provider/professional/types"
import { Calendar, Clock } from "lucide-react"
import { useState } from "react"

interface ConsultationDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  appointment: {
    id: string
    patientName: string
    patientId: string
    type: ConsultationType
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

export function ConsultationDetailsModal({
  isOpen,
  onClose,
  appointment,
  onMarkAsCompleted,
  onReschedule,
  onCancel,
}: ConsultationDetailsModalProps) {
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
      case ConsultationType.Urgent:
        return "bg-error-1 text-error-5"
      case ConsultationType.Normal:
        return "bg-system-3 text-system-9"
      case ConsultationType.FollowUp:
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
        <div className="space-y-6">
          <div className="py-4">
            <div className="flex items-center gap-3 mb-6">
              <Avatar className="h-12 w-12">
                <AvatarImage src={`/images/placeholder.svg?text=${patientInitials}`} alt={appointment.patientName} />
                <AvatarFallback>{patientInitials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{appointment.patientName}</p>
                <p className="text-xs text-system-9">ID do paciente: #{appointment.patientId}</p>
              </div>
            </div>
            <StatusLabel status={appointment.type} className="w-full h-10 justify-center rounded-md" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-system-9 mb-1">Data da consulta</p>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">{appointment.date}</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-system-9 mb-1">Hora inicial</p>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-secondary-9" />
                <span className="text-sm">{appointment.startTime}</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-system-9 mb-1">Hora final</p>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-secondary-9" />
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
          <Button className="w-full" onClick={onReschedule}>
            Iniciar Consulta
          </Button>
          <Button variant="link" className="w-full" onClick={handleCancel}>
            Cancelar Consulta
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
