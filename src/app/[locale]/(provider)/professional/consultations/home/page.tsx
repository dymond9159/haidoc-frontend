"use client"

import { ConsultationFeatureBar } from "@/components/provider/consultation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { LucideCheckCircle2, MapPin } from "lucide-react"
import Link from "next/link"

export default function ConsultaDomicilioPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-row gap-6">
        <div className="flex-1">
          <Card className="gap-6">
            <Alert variant="info">
              <div>
                <AlertTitle className="flex items-center gap-2">
                  <LucideCheckCircle2 className="h-6 w-6" fill="var(--info-5)" color="white" />
                  Consulta a domicílio
                </AlertTitle>
                <AlertDescription>
                  Por favor, dirija-se ao endereço indicado no horário agendado para a consulta. Lembre-se de revisar
                  todas as informações antes de sair para garantir que tenha tudo o que precisa para o atendimento
                  domiciliar.
                </AlertDescription>
              </div>
            </Alert>

            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border">
                <AvatarImage src="/images/placeholder.svg?height=64&width=64" alt="Nome do Paciente" />
                <AvatarFallback>NP</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-medium">Nome do Paciente</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 gap-2">
                <h3 className="text-sm text-gray-500 mb-1">Segunda</h3>
                <p className="text-base font-medium">03 Setembro, 2024</p>
              </Card>
              <Card className="p-4 gap-2">
                <h3 className="text-sm text-gray-500 mb-1">Horário</h3>
                <p className="text-base font-medium">09:00 - 10:00</p>
              </Card>
            </div>

            <div>
              <h3 className="text-sm text-gray-500 mb-1">Link do endereço</h3>
              <Link
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-secondary"
              >
                <MapPin className="h-4 w-4" />
                Rua do Dão, nº49, 2º Andar, Bairro Central
              </Link>
            </div>

            <div>
              <h3 className="text-sm text-gray-500 mb-1">Contato</h3>
              <p className="text-base flex items-center gap-1">+258 00 00 0000</p>
            </div>
            <div className="flex justify-end">
              <Button variant="outline">Encerrar consulta</Button>
            </div>
          </Card>
        </div>
        <ConsultationFeatureBar />
      </div>
    </div>
  )
}
