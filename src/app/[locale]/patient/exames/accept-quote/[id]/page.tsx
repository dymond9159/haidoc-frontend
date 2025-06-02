"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

// Mock data for specific quote
const quoteData = {
  id: "1",
  labName: "Nome do Laboratórioooooooooooooooo",
  image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rectangle%20767-VR7jOvQ24dE0sHDsUMLDa3mxdeYv7o.png",
  collectionDate: "03 Setembro, 2024",
  collectionTime: "09:30h - 10:30",
  address: "Rua do Dão, N 49, 2º Andar, Bairro Central",
  collectionType: "Domicílio",
  analysisArea: "Bioquímica",
  exams: [
    { name: "Nome do exameeeeeeeeeeee", price: "100.00 MZN" },
    { name: "Nome do exameeeeeeeeeeee", price: "100.00 MZN" },
    { name: "Nome do exameeeeeeeeeeee", price: "100.00 MZN" },
  ],
  total: "300.00 MZN",
}

export default function AcceptQuotePage() {
  const params = useParams()
  const router = useRouter()
  const [showRejectModal, setShowRejectModal] = useState(false)

  const handleAccept = () => {
    router.push(`/exames/metodo-pagamento/${params.id}`)
  }

  const handleReject = () => {
    setShowRejectModal(false)
    // Show success toast here
    router.back()
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section - Laboratory Info */}
        <div className="space-y-4">
          {/* Laboratory Card */}
          <div className="bg-white border border-system-6 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={quoteData.image || "/placeholder.svg"}
                  alt={quoteData.labName}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-sm">{quoteData.labName}</h3>
              </div>
            </div>
          </div>

          {/* Date and Time Card */}
          <div className="bg-white border border-system-6 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-system-10 mb-1">Data da Colheita</h4>
                <p className="text-sm font-medium">{quoteData.collectionDate}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-system-10 mb-1">Horário da Colheita</h4>
                <p className="text-sm font-medium">{quoteData.collectionTime}</p>
              </div>
            </div>
          </div>

          {/* Address Card */}
          <div className="bg-white border border-system-6 rounded-lg p-4">
            <h4 className="text-sm font-medium text-system-10 mb-2">Endereço do Laboratório</h4>
            <p className="text-sm font-medium">{quoteData.address}</p>
          </div>

          {/* Collection Type Card */}
          <div className="bg-white border border-system-6 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-system-10 mb-2">Tipo de Colheita</h4>
                <p className="text-sm font-medium">{quoteData.collectionType}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-system-10 mb-2">Área de Análise</h4>
                <Badge className="bg-haidoc-lightBlue text-haidoc-blue text-xs">{quoteData.analysisArea}</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Exams */}
        <div>
          <div className="bg-white border border-system-6 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-4">Exames da Cotação</h3>
            <div className="max-h-[298px] overflow-y-auto space-y-3">
              {quoteData.exams.map((exam, index) => (
                <div key={index} className="flex justify-between items-center py-2">
                  <span className="text-sm">{exam.name}</span>
                  <span className="text-sm font-medium text-haidoc-blue">{exam.price}</span>
                </div>
              ))}
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">TOTAL</span>
                  <span className="text-lg font-medium text-haidoc-blue">{quoteData.total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-center gap-4">
        <Button
          variant="ghost"
          onClick={() => setShowRejectModal(true)}
          className="text-error-5 hover:text-error-5 hover:bg-error-1"
        >
          Rejeitar Proposta
        </Button>
        <Button onClick={handleAccept} className="bg-haidoc-red hover:bg-primary-11 text-white px-8">
          Aceitar Proposta
        </Button>
      </div>

      {/* Reject Modal */}
      <Dialog open={showRejectModal} onOpenChange={setShowRejectModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Você realmente deseja rejeitar esta proposta?</DialogTitle>
            <DialogDescription>Esta ação não pode ser desfeita.</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button variant="ghost" onClick={() => setShowRejectModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleReject} className="bg-haidoc-red hover:bg-primary-11 text-white">
              Sim, rejeitar proposta
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
