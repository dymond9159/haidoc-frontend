"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"

// Mock data for delivery history
const deliveryData = {
  id: "1",
  pharmacyName: "Nome da farmácia super looooooooooooooongo",
  image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rectangle%20767-VR7jOvQ24dE0sHDsUMLDa3mxdeYv7o.png",
  date: "03 Setembro, 2024",
  time: "09:30h - 10:30",
  value: "250.00 MZN",
  address: "Rua dos Anjos, Nº 136, Casa Amarela, Maputo",
  paymentMethod: "Cartão de crédito - Final 3228",
  medications: [
    { name: "Nome do medicamento, 25mg, 20 comprimidos", price: "100.00 MZN" },
    { name: "Nome do medicamento, 25mg, 20 comprimidos", price: "100.00 MZN" },
  ],
  total: "200.00 MZN",
  documents: [
    {
      id: "1",
      name: "Requisição-médica.pdf",
      type: "pdf",
    },
    {
      id: "2",
      name: "Formulário-de-requisição.pdf",
      type: "pdf",
    },
  ],
}

export default function DeliveryHistoryPage() {
  const params = useParams()
  const router = useRouter()

  const handleDownload = (documentId: string) => {
    console.log("Download document:", documentId)
  }

  const handleView = (documentId: string) => {
    console.log("View document:", documentId)
  }

  const handleNewRequest = () => {
    router.push("/order/new-order")
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section - Pharmacy Info */}
        <div className="space-y-4">
          {/* Pharmacy Card */}
          <div className="bg-white border border-system-6 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={deliveryData.image || "/placeholder.svg"}
                  alt={deliveryData.pharmacyName}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-sm">{deliveryData.pharmacyName}</h3>
              </div>
            </div>
          </div>

          {/* Date, Time, Value Card */}
          <div className="bg-white border border-system-6 rounded-lg p-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <h4 className="text-sm font-medium text-system-10 mb-1">Data</h4>
                <p className="text-sm font-medium">{deliveryData.date}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-system-10 mb-1">Horário</h4>
                <p className="text-sm font-medium">{deliveryData.time}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-system-10 mb-1">Valor</h4>
                <p className="text-sm font-medium">{deliveryData.value}</p>
              </div>
            </div>
          </div>

          {/* Address Card */}
          <div className="bg-white border border-system-6 rounded-lg p-4">
            <h4 className="text-sm font-medium text-system-10 mb-2">Endereço da Entrega</h4>
            <p className="text-sm font-medium">{deliveryData.address}</p>
          </div>

          {/* Payment Method Card */}
          <div className="bg-white border border-system-6 rounded-lg p-4">
            <h4 className="text-sm font-medium text-system-10 mb-2">Forma de Pagamento</h4>
            <p className="text-sm font-medium">{deliveryData.paymentMethod}</p>
          </div>
        </div>

        {/* Right Section - Medications and Documents */}
        <div className="space-y-6">
          {/* Medications */}
          <div className="bg-white border border-system-6 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-4">Medicamentos Adquiridos</h3>
            <div className="max-h-[298px] overflow-y-auto space-y-3">
              {deliveryData.medications.map((medication, index) => (
                <div key={index} className="flex justify-between items-center py-2">
                  <span className="text-sm">{medication.name}</span>
                  <span className="text-sm font-medium text-haidoc-blue">{medication.price}</span>
                </div>
              ))}
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">TOTAL</span>
                  <span className="text-lg font-medium text-haidoc-blue">{deliveryData.total}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white border border-system-6 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Documentos Anexados à Solicitação</h3>
            </div>
            <div className="space-y-1">
              <div className="grid grid-cols-2 gap-4 text-xs font-medium text-haidoc-blue mb-3">
                <span>NOME DO ARQUIVO</span>
                <span className="text-right">OPÇÕES</span>
              </div>
              <div className="max-h-[298px] overflow-y-auto space-y-3">
                {deliveryData.documents.map((document) => (
                  <div key={document.id} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-error-5">
                          <path
                            d="M9 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V13C1 13.5304 1.21071 14.0391 1.58579 14.4142C1.96086 14.7893 2.46957 15 3 15H13C13.5304 15 14.0391 14.7893 14.4142 14.4142C14.7893 14.0391 15 13.5304 15 13V5L9 1Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9 1V5H13"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">{document.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleDownload(document.id)} className="p-1 hover:bg-system-3 rounded">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-haidoc-blue">
                          <path
                            d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5.33333 6.66667L8 9.33333L10.6667 6.66667"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8 9.33333V2"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <button onClick={() => handleView(document.id)} className="p-1 hover:bg-system-3 rounded">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-haidoc-blue">
                          <path
                            d="M1 8C1 8 3.66667 2.66667 8 2.66667C12.3333 2.66667 15 8 15 8C15 8 12.3333 13.3333 8 13.3333C3.66667 13.3333 1 8 1 8Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Request Button */}
      <div className="mt-8 flex justify-center">
        <Button onClick={handleNewRequest} className="bg-haidoc-red hover:bg-primary-11 text-white px-8 py-3">
          Fazer Novo Pedido
        </Button>
      </div>
    </div>
  )
}
