"use client"

import { StatusLabel } from "@/components/common"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ConsultationColumns } from "@/types/provider/professional/interface-columns"
import { ConsultationCategory, ConsultationType } from "@/types/provider/professional/types"
import { Calendar, Clock } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { CancelConfirmModal } from "./cancel-confirm-modal"

interface ConsultationDetailsModalProps {
  type: "consultation" | "appointment"
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
    category: ConsultationCategory
  }
  onStartConsultation?: (consultationId: ConsultationColumns) => void
  onMarkAsCompleted?: () => void
  onReschedule?: () => void
  onCancel: () => void
}

export function ConsultationDetailsModal({
  isOpen,
  onClose,
  type,
  appointment,
  onStartConsultation,
  onMarkAsCompleted,
  onReschedule,
  onCancel,
}: ConsultationDetailsModalProps) {
  const t = useTranslations("modal.consultationDetails")
  const tCta = useTranslations("cta")

  const [showCancelConfirm, setShowCancelConfirm] = useState(false)

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

  const patientInitials = appointment.patientName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const handleStartConsultation = () => {
    const consultation: ConsultationColumns = {
      id: appointment.id,
      name: appointment.patientName,
      consultationType: appointment.type,
      date: appointment.date,
      time: appointment.startTime,
      category: appointment.category,
    }
    onStartConsultation?.(consultation)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t("title")}</DialogTitle>
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
                  <p className="text-xs">
                    {t("label.idOf")}: #{appointment.patientId}
                  </p>
                </div>
              </div>
              <StatusLabel status={appointment.type} className="w-full h-10 justify-center rounded-md" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs mb-1">{t("label.date")}</p>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">{appointment.date}</span>
                </div>
              </div>
              <div>
                <p className="text-xs mb-1">{t("label.startTime")}</p>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-secondary-9" />
                  <span className="text-sm">{appointment.startTime}</span>
                </div>
              </div>
              <div>
                <p className="text-xs mb-1">{t("label.endTime")}</p>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-secondary-9" />
                  <span className="text-sm">{appointment.endTime}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs mb-1">{t("label.specialty")}</p>
                <p className="text-sm font-medium">{appointment.specialty}</p>
              </div>
              <div>
                <p className="text-xs mb-1">{t("label.doctorName")}</p>
                <p className="text-sm font-medium">{appointment.doctorName}</p>
              </div>
            </div>

            <div>
              <p className="text-xs mb-1">{t("label.price")}</p>
              <p className="text-sm font-medium">{appointment.price} MZN</p>
            </div>

            <div>
              <p className="text-xs mb-1">{t("label.reason")}</p>
              <p className="text-sm">{appointment.reason}</p>
            </div>
          </div>
          <div className="space-y-2">
            {type === "consultation" && (
              <Button className="w-full" onClick={handleStartConsultation}>
                {appointment.category === ConsultationCategory.Teleconsultation
                  ? tCta("startCall")
                  : tCta("startConsultation")}
              </Button>
            )}
            {type === "appointment" && (
              <>
                <Button className="w-full" onClick={onMarkAsCompleted}>
                  {tCta("markAsCompleted")}
                </Button>
                <Button variant="outline" className="w-full" onClick={onReschedule}>
                  {tCta("reschedule")}
                </Button>
              </>
            )}
            <Button variant="link" className="w-full" onClick={handleCancel}>
              {appointment.category === ConsultationCategory.Teleconsultation
                ? tCta("cancelCall")
                : tCta("cancelConsultation")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {showCancelConfirm && (
        <CancelConfirmModal
          isOpen={showCancelConfirm}
          onOpenChange={setShowCancelConfirm}
          onCancel={handleCancelDialog}
          onConfirm={handleConfirmCancel}
          title={t("cancelConfirm.title")}
          description={t("cancelConfirm.description")}
        />
      )}
    </>
  )
}
