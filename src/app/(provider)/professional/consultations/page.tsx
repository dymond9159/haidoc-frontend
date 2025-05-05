"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function ConsultationsPage() {
  const [activeTab, setActiveTab] = useState("consultas")

  // Mock data for consultations
  const consultations = [
    {
      id: "1",
      patientName: "Nome da clínica, do médico, ou do paciente",
      category: "Teleconsulta",
      type: "Normal",
      date: "09/07/24",
      time: "18:45",
    },
    {
      id: "2",
      patientName: "Nome da clínica, do médico, ou do paciente",
      category: "Chat",
      type: "Normal",
      date: "09/07/24",
      time: "18:45",
    },
    {
      id: "3",
      patientName: "Nome da clínica, do médico, ou do paciente",
      category: "Domicílio",
      type: "Normal",
      date: "09/07/24",
      time: "18:45",
    },
    {
      id: "4",
      patientName: "Nome da clínica, do médico, ou do paciente",
      category: "Teleconsulta",
      type: "Normal",
      date: "09/07/24",
      time: "18:45",
    },
    {
      id: "5",
      patientName: "Nome da clínica, do médico, ou do paciente",
      category: "Teleconsulta",
      type: "Normal",
      date: "09/07/24",
      time: "18:45",
    },
    {
      id: "6",
      patientName: "Nome da clínica, do médico, ou do paciente",
      category: "Chat",
      type: "Normal",
      date: "09/07/24",
      time: "18:45",
    },
    {
      id: "7",
      patientName: "Nome da clínica, do médico, ou do paciente",
      category: "Domicílio",
      type: "Normal",
      date: "09/07/24",
      time: "18:45",
    },
  ]

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "Teleconsulta":
        return (
          <Badge variant="outline" className="bg-info-1 text-info-5 border-info-3">
            <span className="mr-1">📹</span>
            Teleconsulta
          </Badge>
        )
      case "Chat":
        return (
          <Badge variant="outline" className="bg-warning-1 text-warning-5 border-warning-3">
            <span className="mr-1">💬</span>
            Chat
          </Badge>
        )
      case "Domicílio":
        return (
          <Badge variant="outline" className="bg-success-1 text-success-5 border-success-3">
            <span className="mr-1">🏠</span>
            Domicílio
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="consultas">Consultas</TabsTrigger>
            <TabsTrigger value="solicitacoes">Solicitações</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-4">
            <Button variant="outline" className="gap-2">
              Disponibilidade
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8 3.33334V12.6667"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.33331 8H12.6666"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
            <Button className="bg-primary-9 hover:bg-primary-10 text-white gap-2">
              Novo agendamento
              <span className="text-lg">+</span>
            </Button>
          </div>
        </div>

        <TabsContent value="consultas">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg border border-system-5 p-6">
              <div className="flex items-center gap-3 mb-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.5 18.3333V15C7.5 14.0795 8.24619 13.3333 9.16667 13.3333H10.8333C11.7538 13.3333 12.5 14.0795 12.5 15V18.3333M12.5 18.3333H16.6667C17.1269 18.3333 17.5 17.9602 17.5 17.5V9.28866C17.5 9.05048 17.4023 8.82329 17.2315 8.65247L10.0649 1.48587C9.74834 1.16928 9.24209 1.16928 8.92551 1.48587L1.75891 8.65247C1.58809 8.82329 1.49036 9.05048 1.49036 9.28866V17.5C1.49036 17.9602 1.86346 18.3333 2.32369 18.3333H6.66667"
                    stroke="#8A8E99"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3 className="text-sm text-system-9">Consultas à Domicílio</h3>
              </div>
              <p className="text-3xl font-bold">300</p>
            </div>

            <div className="bg-white rounded-lg border border-system-5 p-6">
              <div className="flex items-center gap-3 mb-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M17.5 9.58336C17.5029 10.6832 17.2459 11.7683 16.75 12.75C16.162 13.9265 15.2581 14.916 14.1395 15.6078C13.021 16.2995 11.7319 16.6662 10.4167 16.6667C9.31678 16.6696 8.23176 16.4126 7.25 15.9167L2.5 17.5L4.08333 12.75C3.58744 11.7683 3.33047 10.6832 3.33333 9.58336C3.33384 8.26815 3.70051 6.97907 4.39227 5.86048C5.08402 4.7419 6.07355 3.838 7.25 3.25002C8.23176 2.75413 9.31678 2.49716 10.4167 2.50002H10.8333C12.5703 2.59585 14.2109 3.32899 15.4409 4.55907C16.671 5.78915 17.4042 7.42973 17.5 9.16669V9.58336Z"
                    stroke="#8A8E99"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3 className="text-sm text-system-9">Consultas em Chat Rápido</h3>
              </div>
              <p className="text-3xl font-bold">300</p>
            </div>

            <div className="bg-white rounded-lg border border-system-5 p-6">
              <div className="flex items-center gap-3 mb-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15.8333 8.33331H4.16667C3.24619 8.33331 2.5 9.0795 2.5 9.99998V15.8333C2.5 16.7538 3.24619 17.5 4.16667 17.5H15.8333C16.7538 17.5 17.5 16.7538 17.5 15.8333V9.99998C17.5 9.0795 16.7538 8.33331 15.8333 8.33331Z"
                    stroke="#8A8E99"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.83331 8.33331V5.83331C5.83331 4.72824 6.27229 3.66845 7.05372 2.88702C7.83516 2.10558 8.89495 1.66665 9.99998 1.66665C11.105 1.66665 12.1648 2.10558 12.9462 2.88702C13.7277 3.66845 14.1666 4.72824 14.1666 5.83331V8.33331"
                    stroke="#8A8E99"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3 className="text-sm text-system-9">Teleconsultas</h3>
              </div>
              <p className="text-3xl font-bold">300</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-system-5 overflow-hidden">
            <div className="grid grid-cols-5 gap-4 p-4 border-b">
              <div className="font-medium text-sm text-system-11">NOME</div>
              <div className="font-medium text-sm text-system-11">CATEGORIA</div>
              <div className="font-medium text-sm text-system-11">TIPO DE CONSULTA</div>
              <div className="font-medium text-sm text-system-11">DATA E HORA</div>
              <div className="font-medium text-sm text-system-11 text-center">OPÇÕES</div>
            </div>

            {consultations.map((consultation) => (
              <div key={consultation.id} className="grid grid-cols-5 gap-4 p-4 border-b">
                <div className="text-sm">{consultation.patientName}</div>
                <div>{getCategoryBadge(consultation.category)}</div>
                <div className="text-sm">{consultation.type}</div>
                <div className="text-sm">
                  {consultation.time}
                  <br />
                  <span className="text-xs text-system-9">{consultation.date}</span>
                </div>
                <div className="flex justify-center">
                  <Link href="/professional/consulta-online">
                    <Button variant="outline" className="text-primary-9 hover:text-primary-10 border-primary-9">
                      Iniciar consulta
                    </Button>
                  </Link>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center p-4">
              <Button variant="outline" className="gap-2">
                <ChevronLeft className="h-4 w-4" />
                Anterior
              </Button>

              <div className="flex items-center gap-1">
                <Button variant="outline" className="h-8 w-8 p-0 bg-secondary-9 text-white border-secondary-9">
                  1
                </Button>
                <Button variant="outline" className="h-8 w-8 p-0">
                  2
                </Button>
                <span className="mx-1">...</span>
                <Button variant="outline" className="h-8 w-8 p-0">
                  8
                </Button>
                <Button variant="outline" className="h-8 w-8 p-0">
                  9
                </Button>
                <Button variant="outline" className="h-8 w-8 p-0">
                  10
                </Button>
              </div>

              <Button variant="outline" className="gap-2">
                Próximo
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="solicitacoes">
          <div className="bg-white rounded-lg border border-system-5 p-6 text-center">
            <h3 className="text-lg font-medium mb-2">Nenhuma solicitação pendente</h3>
            <p className="text-system-9">Você não possui solicitações de consulta pendentes no momento.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
