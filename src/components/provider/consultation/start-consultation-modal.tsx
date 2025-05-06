"use client"

import { CallingCenterIcon } from "@/components/icons"
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
            <div className="bg-info-1 p-4 rounded-mdw-full">
              <div className="flex flex-col items-start gap-2">
                <div className="flex items-center justify-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-info-5 mt-0.5" />
                  <p className="text-sm font-medium text-info-5 mb-1">Chamada segura</p>
                </div>
                <p className="text-sm text-secondary-12">
                  Utilizamos tecnologia de criptografia avançada para garantir que todas as informações trocadas durante
                  a consulta permaneçam privadas e protegidas.
                </p>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <Button variant="outline" colorVariant="error" onClick={onClose} className="w-full">
              Cancelar
            </Button>
          </div>
          <div className="bg-warning-2 p-4 rounded-md w-full">
            <p className="text-sm font-medium text-warning-6 mb-1">Aviso de Uso De Serviços Fora da Plataforma</p>
            <p className="text-sm text-warning-6">
              Para assegurar a segurança e a integridade dos nossos serviços, a HaiDoc declara que não se responsabiliza
              por quaisquer tentativas de contato com provedores de saúde fora da nossa plataforma. Recomendamos
              enfaticamente que todas as interações, consultas, transações e comunicações sejam conduzidas
              exclusivamente através da nossa plataforma, a fim de evitar fraudes, danos morais e outros inconvenientes.
              Ao clicar em "Próximo", você afirma estar ciente do aviso.
            </p>
          </div>
        </div>
        <DialogFooter className="flex justify-center">
          <Button onClick={onProceed} className="w-full bg-primary-9 hover:bg-primary-10 text-white">
            Iniciar chamada
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
