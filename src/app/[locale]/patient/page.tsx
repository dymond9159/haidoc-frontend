"use client"

import { ClinicIcon, Doctor2Icon, FilterIcon, LaboratoryIcon, PharmacyIcon } from "@/components/icons"
import { AppointmentCard } from "@/components/patient/appointment-card"
import { DoctorCard } from "@/components/patient/doctor-card"
import { FilterModal, type FilterValues } from "@/components/patient/filter-modal"
import { ServiceCard } from "@/components/patient/service-card"
import { ServiceItem } from "@/components/patient/service-item"
import { Button, ButtonColorVariant } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { SearchIcon } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function Home() {
  const [filterModalOpen, setFilterModalOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const appointmentTypes = [
    { id: "urgent", label: "Urgente", variant: "error" },
    { id: "normal", label: "Normal", variant: "info" },
    { id: "followup", label: "Seguimento", variant: "warning" },
  ]

  const handleApplyFilters = (filters: FilterValues) => {
    console.log("Applied filters:", filters)
  }

  return (
    <div className="space-y-8 mb-8">
      {/* Greeting */}
      <h1 className="text-2xl font-medium mb-8">Olá, [Nome do Paciente]!</h1>

      {/* Próximas Atividades */}
      <div>
        <h2 className="text-lg font-bold mb-4">Suas Próximas Atividades</h2>
        <ScrollArea className="w-[800px] pb-2">
          <div className="flex flex-row gap-4">
            <AppointmentCard
              title="Fundação Cardiológica HVMC"
              date="Segunda 28/Julho"
              time="09:00 - 10:00"
              specialty="Clínica"
            />
            <AppointmentCard
              title="Matheus Oliveira Cardoso"
              date="Segunda 28/Julho"
              time="09:00 - 10:00"
              specialty="Ortopedista"
            />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-lg font-medium mb-4">Pesquisa</h2>
          <div className="relative">
            <Input
              type="text"
              placeholder="Pesquisar"
              className="pl-10 pr-4 py-3 rounded-lg border border-system-6 bg-white"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <SearchIcon className="h-5 w-5 text-system-10" />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-4">Tipo de consulta</h2>
          <div className="flex flex-wrap gap-2 pt-1">
            {appointmentTypes.map((type) => (
              <Button
                key={type.id}
                variant="ghost"
                size="md"
                colorVariant={type.variant as ButtonColorVariant}
                className={cn("rounded-full", selectedType === type.id && "bg-secondary-10 text-white")}
                onClick={() => setSelectedType(selectedType === type.id ? null : type.id)}
              >
                {type.label}
              </Button>
            ))}
            <Button variant="outline" size="md" className="ml-4 gap-2" onClick={() => setFilterModalOpen(true)}>
              <FilterIcon className="w-4 h-4" />
              <span>Mais filtros</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Services */}
      <div>
        <h2 className="text-lg font-bold mb-4">Serviços</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ServiceCard title="Médicos" icon={Doctor2Icon} href="/servicos/medicos" />
          <ServiceCard title="Clínicas" icon={ClinicIcon} href="/servicos/clinicas" />
          <ServiceCard title="Farmácias" icon={PharmacyIcon} href="/servicos/farmacias" />
          <ServiceCard title="Laboratórios" icon={LaboratoryIcon} href="/servicos/laboratorios" />
        </div>
      </div>

      {/* Doctors */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Médicos</h2>
          <Button variant="link">Ver todos</Button>
        </div>
        <p className="text-sm mb-4">Confira os serviços do Haidoc plus!</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <DoctorCard
              key={i}
              name="Nome do médico grande para testar"
              image="/images/placeholder.svg"
              address="Rua do Dão, nº49, 2º Andar, Bairro Central"
              rating={4.6}
            />
          ))}
        </div>
      </div>

      {/* Family Plan */}
      <div>
        <div className="w-full max-w-xl mx-auto">
          <h3 className="text-xl font-bold mb-2">Faça um Upgrade</h3>
          <div className="relative bg-gradient-to-r from-secondary-1 to-secondary-5 rounded-lg p-0 flex items-center justify-between overflow-hidden">
            <div className="flex-1 p-6">
              <h4 className="text-lg font-medium mb-2">HaiFamily</h4>
              <p className="text-sm text-secondary-11 mb-4">
                O plano ideal para toda sua <strong>família!</strong>
              </p>
              <Button>Ver Mais Detalhes</Button>
            </div>
            <div className="absolute right-0 bottom-0 flex-shrink-0 h-full">
              <Image
                src="/images/family-plan-bg.png"
                alt="Family Plan"
                width={350}
                height={180}
                className="rounded-lg bg-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Services */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Farmácia</h3>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <ServiceItem
                key={i}
                name="Nome da farmácia grande para testar"
                image="/images/placeholder.svg"
                rating={4.6}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Laboratório</h3>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <ServiceItem
                key={i}
                name="Nome de laboratório grande para testar"
                image="/images/placeholder.svg"
                rating={4.6}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Clínica</h3>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <ServiceItem
                key={i}
                name="Nome da clínica grande para testar"
                image="/images/placeholder.svg"
                rating={4.6}
              />
            ))}
          </div>
        </div>
      </div>
      <FilterModal open={filterModalOpen} onOpenChange={setFilterModalOpen} onApplyFilters={handleApplyFilters} />
    </div>
  )
}
