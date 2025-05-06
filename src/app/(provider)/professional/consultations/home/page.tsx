"use client"

import { ExamsForm, PatientHistoryPanel, PrescriptionForm } from "@/components/provider/consultation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import LinkButton from "@/components/ui/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Phone } from "lucide-react"
import { useRouter } from "nextjs-toploader/app"

export default function ConsultaDomicilioPage() {
  const router = useRouter()
  return (
    <div className="space-y-8">
      <div className="mb-6">
        <LinkButton
          href=""
          onClick={() => router.push("/professional/consultations")}
          direction="left"
          variant="default"
        >
          Consulta a domicílio
        </LinkButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-2 text-primary-9 mb-4">
                <div className="w-6 h-6 rounded-full bg-primary-9 text-white flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </div>
                <span className="font-medium">Consulta a domicílio</span>
              </div>

              <p className="text-sm text-gray-600 mb-6">
                Por favor, dirija-se ao endereço indicado no horário agendado para a consulta. Lembre-se de revisar
                todas as informações antes de sair para garantir que tenha tudo o que precisa para o atendimento
                domiciliar.
              </p>

              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-16 w-16 border">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Nome do Paciente" />
                  <AvatarFallback>NP</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-lg font-medium">Nome do Paciente</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Data</h3>
                  <p className="text-base">Segunda</p>
                  <p className="text-base font-medium">03 Setembro, 2024</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Horário</h3>
                  <p className="text-base font-medium">09:00 - 10:00</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Link do endereço</h3>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  <MapPin className="h-4 w-4" />
                  Rua do Dão, nº49, 2º Andar, Bairro Central
                </a>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Contato</h3>
                <p className="text-base flex items-center gap-1">
                  <Phone className="h-4 w-4 text-gray-500" />
                  +258 00 00 0000
                </p>
              </div>

              <div className="flex justify-center">
                <Button className="bg-red-500 hover:bg-red-600 text-white">Encerrar consulta</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 h-full overflow-hidden">
            <Tabs defaultValue="historico" className="w-full h-full flex flex-col">
              <TabsList className="grid grid-cols-3 bg-gray-100">
                <TabsTrigger value="historico">Histórico</TabsTrigger>
                <TabsTrigger value="prescricao">Prescrição</TabsTrigger>
                <TabsTrigger value="exames">Exames</TabsTrigger>
              </TabsList>
              <TabsContent value="historico" className="flex-1 overflow-auto m-0">
                <PatientHistoryPanel />
              </TabsContent>
              <TabsContent value="prescricao" className="flex-1 overflow-auto m-0">
                <PrescriptionForm />
              </TabsContent>
              <TabsContent value="exames" className="flex-1 overflow-auto m-0">
                <ExamsForm />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
