"use client"

import { CallingCenterIcon } from "@/components/icons"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { ConsultationCategory } from "@/types/provider/professional/types"
import { ShieldCheck } from "lucide-react"
import { useTranslations } from "next-intl"

interface StartConsultationModalProps {
  isOpen: boolean
  onClose: () => void
  consultationType: ConsultationCategory
  onProceed: () => void
}

export function StartConsultationModal({ isOpen, onClose, consultationType, onProceed }: StartConsultationModalProps) {
  const t = useTranslations("modal.startConsultation")
  const tCta = useTranslations("cta")
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="hidden"></DialogTitle>
        <div className="flex flex-col items-center justify-center py-2">
          <div className="bg-system-1 rounded-full p-2 mb-2">
            <CallingCenterIcon size={120} />
          </div>
          <h2 className="text-xl font-semibold mb-3 text-secondary-12">{t("title")}</h2>
        </div>
        <div className="space-y-6">
          {consultationType === ConsultationCategory.Teleconsultation && (
            <Alert variant="info">
              <div>
                <AlertTitle className="flex flex-row items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-info-6 mt-0.5" />
                  {t("alert.title")}
                </AlertTitle>
                <AlertDescription>{t("alert.description")}</AlertDescription>
              </div>
            </Alert>
          )}
          <div className="flex flex-col gap-2">
            <Button variant="outline" colorVariant="error" onClick={onClose} className="w-full">
              {tCta("cancel")}
            </Button>
          </div>
          <div>
            <Alert variant="warning">
              <div>
                <AlertTitle>{t("alert2.title")}</AlertTitle>
                <AlertDescription>{t("alert2.description")}</AlertDescription>
              </div>
            </Alert>
          </div>
        </div>
        <DialogFooter className="flex justify-center">
          <Button onClick={onProceed} className="w-full bg-primary-9 hover:bg-primary-10 text-white">
            {consultationType === ConsultationCategory.Teleconsultation ? tCta("startCall") : tCta("startConsultation")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
