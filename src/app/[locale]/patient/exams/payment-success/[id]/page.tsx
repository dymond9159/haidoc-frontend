"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"

// Mock data
const successData = {
  labName: "Nome do Laboratórioooooooooooooooo",
  image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rectangle%20767-VR7jOvQ24dE0sHDsUMLDa3mxdeYv7o.png",
  collectionDate: "03 Setembro, 2024",
  collectionTime: "09:30h - 10:30",
  address: "Rua do Dão, N 49, 2º Andar, Bairro Central",
  collectionType: "Domicílio",
  analysisArea: "Bioquímica",
}

export default function PaymentSuccessPage() {
  const router = useRouter()

  const handleGoHome = () => {
    router.push("/")
  }

  return (
    <div className="space-y-8">
      {/* Success Section */}
      <div className="text-center mb-12">
        <div className="w-32 h-32 mx-auto mb-6 bg-haidoc-lightBlue rounded-full flex items-center justify-center">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="text-haidoc-blue">
            <path
              d="M20 32L28 40L44 24"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-medium text-haidoc-blue mb-4">Agendamento Solicitado</h1>
        <p className="text-sm text-system-10 max-w-2xl mx-auto">
          Aguardando confirmação do prestador de serviços. Fique de olho nas notificações: avisaremos quando a
          solicitação for aceita, para que você realize o pagamento do serviço.
        </p>
      </div>

      {/* Laboratory Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Laboratory Card */}
        <div className="bg-white border border-system-6 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <Image
                src={successData.image || "/placeholder.svg"}
                alt={successData.labName}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-sm">{successData.labName}</h3>
            </div>
          </div>
        </div>

        {/* Date and Time Cards */}
        <div className="bg-white border border-system-6 rounded-lg p-4">
          <h4 className="text-sm font-medium text-system-10 mb-1">Data da Colheita</h4>
          <p className="text-sm font-medium">{successData.collectionDate}</p>
        </div>

        <div className="bg-white border border-system-6 rounded-lg p-4">
          <h4 className="text-sm font-medium text-system-10 mb-1">Horário da Colheita</h4>
          <p className="text-sm font-medium">{successData.collectionTime}</p>
        </div>

        {/* Address Card */}
        <div className="bg-white border border-system-6 rounded-lg p-4">
          <h4 className="text-sm font-medium text-system-10 mb-2">Endereço da Colheita</h4>
          <p className="text-sm">{successData.address}</p>
        </div>
      </div>

      {/* Collection Type and Analysis Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mb-12">
        <div className="bg-white border border-system-6 rounded-lg p-4">
          <h4 className="text-sm font-medium text-system-10 mb-2">Tipo de Colheita</h4>
          <p className="text-sm font-medium">{successData.collectionType}</p>
        </div>

        <div className="bg-white border border-system-6 rounded-lg p-4">
          <h4 className="text-sm font-medium text-system-10 mb-2">Área de Análise</h4>
          <Badge className="bg-haidoc-lightBlue text-haidoc-blue text-xs">{successData.analysisArea}</Badge>
        </div>
      </div>

      {/* Go Home Button */}
      <div className="text-center">
        <Button onClick={handleGoHome} className="bg-haidoc-red hover:bg-primary-11 text-white px-8">
          Ir para Home
        </Button>
      </div>
    </div>
  )
}
