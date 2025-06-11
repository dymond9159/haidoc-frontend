"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"

// Mock data
const reviewData = {
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
  total: "200.00 MZN",
  paymentMethod: "Cartão de crédito - Final 3228",
}

export default function PaymentRevisionPage() {
  const params = useParams()
  const router = useRouter()

  const handlePayment = () => {
    router.push(`/exames/payment-success/${params.id}`)
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="space-y-8">
      {/* Laboratory Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Laboratory Card */}
        <div className="bg-white border border-system-6 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <Image
                src={reviewData.image || "/placeholder.svg"}
                alt={reviewData.labName}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-sm">{reviewData.labName}</h3>
            </div>
          </div>
        </div>

        {/* Date and Time Cards */}
        <div className="bg-white border border-system-6 rounded-lg p-4">
          <h4 className="text-sm font-medium text-system-10 mb-1">Data da Colheita</h4>
          <p className="text-sm font-medium">{reviewData.collectionDate}</p>
        </div>

        <div className="bg-white border border-system-6 rounded-lg p-4">
          <h4 className="text-sm font-medium text-system-10 mb-1">Horário da Colheita</h4>
          <p className="text-sm font-medium">{reviewData.collectionTime}</p>
        </div>

        {/* Address Card */}
        <div className="bg-white border border-system-6 rounded-lg p-4">
          <h4 className="text-sm font-medium text-system-10 mb-2">Endereço do Laboratório</h4>
          <p className="text-sm">{reviewData.address}</p>
        </div>
      </div>

      {/* Collection Type and Analysis Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white border border-system-6 rounded-lg p-4">
          <h4 className="text-sm font-medium text-system-10 mb-2">Tipo de Colheita</h4>
          <p className="text-sm font-medium">{reviewData.collectionType}</p>
        </div>

        <div className="bg-white border border-system-6 rounded-lg p-4">
          <h4 className="text-sm font-medium text-system-10 mb-2">Área de Análise</h4>
          <Badge className="bg-haidoc-lightBlue text-haidoc-blue text-xs">{reviewData.analysisArea}</Badge>
        </div>
      </div>

      {/* Exams Section */}
      <div className="bg-white border border-system-6 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-medium mb-4">Exames da Cotação</h3>
        <div className="max-h-[298px] overflow-y-auto space-y-3">
          {reviewData.exams.map((exam, index) => (
            <div key={index} className="flex justify-between items-center py-2">
              <span className="text-sm">{exam.name}</span>
              <span className="text-sm font-medium text-haidoc-blue">{exam.price}</span>
            </div>
          ))}
          <div className="border-t pt-3 mt-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">TOTAL</span>
              <span className="text-lg font-medium text-haidoc-blue">{reviewData.total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div className="bg-white border border-system-6 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-medium mb-4">Detalhes do Pagamento</h3>
        <p className="text-sm">{reviewData.paymentMethod}</p>
      </div>

      {/* Warning Notice */}
      <div className="bg-warning-1 border border-warning-4 rounded-lg p-4 mb-8">
        <h4 className="text-sm font-medium text-warning-5 mb-2">Aviso de Uso De Serviços Fora da Plataforma</h4>
        <p className="text-xs text-warning-5">
          Para assegurar a segurança e a integridade dos nossos serviços, a HaiDoc declara que não se responsabiliza por
          quaisquer tentativas de contato com provedores de saúde fora da nossa plataforma. Recomendamos enfaticamente
          que todas as interações, consultas, transações e comunicações sejam conduzidas exclusivamente através da nossa
          plataforma, a fim de evitar fraudes, danos morais e outros inconvenientes.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-end">
        <Button variant="ghost" onClick={handleBack}>
          Voltar
        </Button>
        <Button onClick={handlePayment} className="bg-haidoc-red hover:bg-primary-11 text-white px-8">
          Efetuar Pagamento
        </Button>
      </div>
    </div>
  )
}
