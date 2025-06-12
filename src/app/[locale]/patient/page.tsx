"use client"

import { ClinicIcon, Doctor2Icon, FilterIcon, LaboratoryIcon, PharmacyIcon } from "@/components/icons"
import { AppointmentCard } from "@/components/patient/appointment-card"
import { DoctorCard } from "@/components/patient/doctor-card"
import { FilterModal, type FilterValues } from "@/components/patient/filter-modal"
import { ServiceCard } from "@/components/patient/service-card"
import { ServiceItem } from "@/components/patient/service-item"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function Home() {
  const [filterModalOpen, setFilterModalOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const appointmentTypes = [
    { id: "urgent", name: "Urgente", color: "bg-error-5 text-white" },
    { id: "normal", name: "Normal", color: "bg-haidoc-blue text-white" },
    { id: "followup", name: "Seguimento", color: "bg-warning-5 text-white" },
  ]

  const handleApplyFilters = (filters: FilterValues) => {
    console.log("Applied filters:", filters)
  }

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <h1 className="text-2xl font-medium mb-8">Olá, [Nome do Paciente]!</h1>

      {/* Próximas Atividades */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">Suas Próximas Atividades</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Tipo de consulta</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFilterModalOpen(true)}
              className="flex items-center gap-2 text-haidoc-blue hover:text-haidoc-blue"
            >
              <FilterIcon className="w-4 h-4" />
              <span>Mais filtros</span>
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {appointmentTypes.map((type) => (
              <button
                key={type.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedType === type.id ? type.color : "bg-system-4 text-system-11 hover:bg-system-5"
                }`}
                onClick={() => setSelectedType(selectedType === type.id ? null : type.id)}
              >
                {type.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">Serviços</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ServiceCard title="Médicos" icon={Doctor2Icon} href="/servicos/medicos" />
          <ServiceCard title="Clínicas" icon={ClinicIcon} href="/servicos/clinicas" />
          <ServiceCard title="Farmácias" icon={PharmacyIcon} href="/servicos/farmacias" />
          <ServiceCard title="Laboratórios" icon={LaboratoryIcon} href="/servicos/laboratorios" />
        </div>
      </div>

      {/* Doctors */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Médicos</h2>
          <span className="text-sm text-haidoc-red cursor-pointer hover:underline">Ver todos</span>
        </div>
        <p className="text-sm text-system-10 mb-4">Confira os serviços do Haidoc plus!</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <DoctorCard
              key={i}
              name="Nome do médico grande para testar"
              image="/images/placeholder.png"
              address="Rua do Dão, nº49, 2º Andar, Bairro Central"
              rating={4.6}
            />
          ))}
        </div>
      </div>

      {/* Family Plan */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-haidoc-lightBlue to-white rounded-lg p-8 flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">Faça um Upgrade</h3>
            <h4 className="text-lg font-medium mb-2">HaiFamily</h4>
            <p className="text-sm text-haidoc-blue mb-4">O plano ideal para toda sua família!</p>
            <Button className="bg-haidoc-red hover:bg-primary-11 text-white">Ver Mais Detalhes</Button>
          </div>
          <div className="flex-shrink-0 ml-8">
            <Image src="/images/placeholder.png" alt="Family Plan" width={300} height={180} className="rounded-lg" />
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
                image="/images/placeholder.png"
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
                image="/images/placeholder.png"
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
                image="/images/placeholder.png"
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
