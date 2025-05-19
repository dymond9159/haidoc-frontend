"use client"

import { CallingCenterIcon } from "@/components/icons"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { ConsultationCategory } from "@/types/provider/professional/types"
import { ShieldCheck } from "lucide-react"

interface StartConsultationModalProps {
  isOpen: boolean
  onClose: () => void
  consultationType: ConsultationCategory
  onProceed: () => void
}

export function StartConsultationModal({ isOpen, onClose, consultationType, onProceed }: StartConsultationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="hidden"></DialogTitle>
        <div className="flex flex-col items-center justify-center py-2">
          <div className="bg-system-1 rounded-full p-2 mb-2">
            <CallingCenterIcon size={120} />
          </div>
          <h2 className="text-xl font-semibold mb-3 text-secondary-12">Iniciando consulta...</h2>
        </div>
        <div className="space-y-6">
          {consultationType === ConsultationCategory.Teleconsultation && (
            <Alert variant="info">
              <div>
                <AlertTitle className="flex flex-row items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-info-6 mt-0.5" />
                  Chamada segura
                </AlertTitle>
                <AlertDescription>
                  Utilizamos tecnologia de criptografia avançada para garantir que todas as informações trocadas durante
                  a consulta permaneçam privadas e protegidas.
                </AlertDescription>
              </div>
            </Alert>
          )}
          <div className="flex flex-col gap-2">
            <Button variant="outline" colorVariant="error" onClick={onClose} className="w-full">
              Cancelar
            </Button>
          </div>
          <div>
            <Alert variant="warning">
              <div>
                <AlertTitle>Aviso de Uso De Serviços Fora da Plataforma</AlertTitle>
                <AlertDescription>
                  Para assegurar a segurança e a integridade dos nossos serviços, a HaiDoc declara que não se
                  responsabiliza por quaisquer tentativas de contato com provedores de saúde fora da nossa plataforma.
                  Recomendamos enfaticamente que todas as interações, consultas, transações e comunicações sejam
                  conduzidas exclusivamente através da nossa plataforma, a fim de evitar fraudes, danos morais e outros
                  inconvenientes. Ao clicar em &quot;Próximo&quot;, você afirma estar ciente do aviso.
                </AlertDescription>
              </div>
            </Alert>
          </div>
        </div>
        <DialogFooter className="flex justify-center">
          <Button onClick={onProceed} className="w-full bg-primary-9 hover:bg-primary-10 text-white">
            {consultationType === ConsultationCategory.Teleconsultation ? "Iniciar chamada" : "Iniciar consulta"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
