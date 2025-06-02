"use client"

import { CalendarIcon, ClockIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { ChevronDownIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

// Mock data
const upcomingAppointments = [
  {
    id: "1",
    labName: "Laboratório de Maputo",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rectangle%20767-VR7jOvQ24dE0sHDsUMLDa3mxdeYv7o.png",
    date: "Segunda 28/Julho",
    time: "09:00 - 10:00",
  },
  {
    id: "2",
    labName: "Laboratório de Maputo",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rectangle%20767-VR7jOvQ24dE0sHDsUMLDa3mxdeYv7o.png",
    date: "Segunda 28/Julho",
    time: "09:00 - 10:00",
  },
  {
    id: "3",
    labName: "Laboratório de Maputo",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rectangle%20767-VR7jOvQ24dE0sHDsUMLDa3mxdeYv7o.png",
    date: "Segunda 28/Julho",
    time: "09:00 - 10:00",
  },
  {
    id: "4",
    labName: "Laboratório de Maputo",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rectangle%20767-VR7jOvQ24dE0sHDsUMLDa3mxdeYv7o.png",
    date: "Segunda 28/Julho",
    time: "09:00 - 10:00",
  },
]

const pendingRequests = [
  {
    id: "1",
    title: "Solicitação",
    date: "Segunda 28/Julho",
    status: "waiting",
    statusText: "Aguardando propostas",
  },
  {
    id: "2",
    title: "Solicitação",
    date: "Segunda 28/Julho",
    status: "received",
    statusText: "Proposta(s) recebida(s)",
  },
]

const historyAppointments = Array.from({ length: 9 }, (_, i) => ({
  id: `history-${i + 1}`,
  labName: "Nome do laboratório",
  image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rectangle%20767-VR7jOvQ24dE0sHDsUMLDa3mxdeYv7o.png",
  date: "Segunda 28/Julho",
  value: "100 MZN",
}))

export default function ExamesPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9
  const totalPages = Math.ceil(historyAppointments.length / itemsPerPage)

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return historyAppointments.slice(startIndex, endIndex)
  }

  return (
    <div className="space-y-8">
      <section className="space-y-6">
        <h2 className="text-lg font-medium mb-4">Próximo Agendamento</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {upcomingAppointments.map((appointment) => (
            <div key={appointment.id} className="flex-shrink-0 w-80 bg-white border border-system-6 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-system-4 overflow-hidden">
                  <Image
                    src={appointment.image || "/placeholder.svg"}
                    alt={appointment.labName}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{appointment.labName}</h3>
                </div>
                <ChevronDownIcon className="w-4 h-4 text-system-10 rotate-[-90deg]" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-haidoc-blue">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{appointment.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-system-10">
                  <ClockIcon className="w-4 h-4" />
                  <span>{appointment.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pending Requests */}
      <section className="space-y-6">
        <h2 className="text-lg font-medium mb-4">Pendentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pendingRequests.map((request) => (
            <Link
              key={request.id}
              href={`/exames/cotacoes/${request.id}`}
              className="bg-white border border-system-6 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">{request.title}</h3>
                <ChevronDownIcon className="w-4 h-4 text-system-10 rotate-[-90deg]" />
              </div>
              <div className="flex items-center gap-2 text-sm text-haidoc-blue mb-3">
                <CalendarIcon className="w-4 h-4" />
                <span>{request.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${request.status === "waiting" ? "bg-haidoc-blue" : "bg-error-5"}`}
                />
                <span className={`text-sm ${request.status === "waiting" ? "text-haidoc-blue" : "text-error-5"}`}>
                  {request.statusText}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* History */}
      <section className="space-y-6">
        <h2 className="text-lg font-medium mb-4">Histórico</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {getCurrentPageItems().map((appointment) => (
            <Link
              key={appointment.id}
              href={`/exames/historico/${appointment.id}`}
              className="bg-white border border-system-6 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-system-4 overflow-hidden">
                    <Image
                      src={appointment.image || "/placeholder.svg"}
                      alt={appointment.labName}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-medium text-sm">{appointment.labName}</h3>
                </div>
                <ChevronDownIcon className="w-4 h-4 text-system-10 rotate-[-90deg]" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-haidoc-blue">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{appointment.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-haidoc-blue">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-haidoc-blue">
                    <path
                      d="M2 4H14V12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14H4C3.46957 14 2.96086 13.7893 2.58579 13.4142C2.21071 13.0391 2 12.5304 2 12V4Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M2 4H14V6H2V4Z" fill="currentColor" />
                  </svg>
                  <span>{appointment.value}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-2"
          >
            <ChevronDownIcon className="w-4 h-4 rotate-90" />
            Anterior
          </Button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-full text-sm font-medium ${
                  currentPage === page ? "bg-haidoc-blue text-white" : "text-system-10 hover:bg-system-3"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <Button
            variant="ghost"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2"
          >
            Próximo
            <ChevronDownIcon className="w-4 h-4 rotate-[-90deg]" />
          </Button>
        </div>
      </section>
    </div>
  )
}
