"use client"

import { Doctor2Icon, LaboratoryIcon, PharmacyIcon } from "@/components/icons"
import { ClinicIcon } from "@/components/icons/clinic-icon"
import { DoctorCard } from "@/components/patient/doctor-card"
import { FilterModal, type FilterValues } from "@/components/patient/filter-modal"
import { ServiceCard } from "@/components/patient/service-card"
import { ServiceItem } from "@/components/patient/service-item"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useState } from "react"

export default function ServicePage() {
  const params = useParams()
  const service = params.service as string
  const [filterModalOpen, setFilterModalOpen] = useState(false)

  const getServiceTitle = (service: string) => {
    switch (service) {
      case "medicos":
        return "Feed de serviços"
      case "clinicas":
        return "Clínicas"
      case "farmacias":
        return "Farmácias"
      case "laboratorios":
        return "Laboratórios"
      default:
        return "Serviços"
    }
  }

  const handleApplyFilters = (filters: FilterValues) => {
    console.log("Applied filters:", filters)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-medium mb-6">Olá, [Nome do Paciente]!</h1>

      {/* HaiDoc Plus Section */}
      <div className="bg-haidoc-lightBlue rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-haidoc-blue font-medium">Haidoc plus</span>
        </div>
        <p className="text-sm text-system-11 mb-4">Confira os serviços do HaiDoc plus!</p>
        <div className="flex -space-x-2">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full bg-haidoc-blue border-2 border-white flex items-center justify-center"
            >
              <Doctor2Icon className="w-4 h-4 text-white" />
            </div>
          ))}
        </div>
      </div>

      {/* Service Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <ServiceCard title="Médicos" icon={Doctor2Icon} href="/servicos/medicos" />
        <ServiceCard title="Clínicas" icon={ClinicIcon} href="/servicos/clinicas" />
        <ServiceCard title="Farmácias" icon={PharmacyIcon} href="/servicos/farmacias" />
        <ServiceCard title="Laboratórios" icon={LaboratoryIcon} href="/servicos/laboratorios" />
      </div>

      {/* Doctors Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Médicos</h2>
          <span className="text-sm text-haidoc-red cursor-pointer hover:underline">Ver todos</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <DoctorCard
              key={i}
              name="Nome do médico grande para testar"
              image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rectangle%20767-VR7jOvQ24dE0sHDsUMLDa3mxdeYv7o.png"
              address="Rua do Ouro, nº48, 2º Andar, Bairro Central"
              rating={4.6}
            />
          ))}
        </div>
      </div>

      {/* Family Plan Promotion */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-haidoc-lightBlue to-white rounded-lg p-6 flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-medium mb-2">Planos para toda família!</h3>
            <button className="bg-haidoc-red text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-primary-11">
              Ver Mais
            </button>
          </div>
          <div className="flex-shrink-0 ml-6">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%2075-ZHBBEFmcT8lpPEu6PL3GF2UVHVScXu.png"
              alt="Family Plan"
              width={200}
              height={120}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Service Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Farmácia */}
        <div>
          <h3 className="text-lg font-medium mb-4">Farmácia</h3>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <ServiceItem
                key={i}
                name="Nome da farmácia grande para testar"
                image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rectangle%20767-VR7jOvQ24dE0sHDsUMLDa3mxdeYv7o.png"
                rating={4.6}
              />
            ))}
          </div>
        </div>

        {/* Laboratório */}
        <div>
          <h3 className="text-lg font-medium mb-4">Laboratório</h3>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <ServiceItem
                key={i}
                name="Nome do laboratório grande para testar"
                image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rectangle%20767-VR7jOvQ24dE0sHDsUMLDa3mxdeYv7o.png"
                rating={4.6}
              />
            ))}
          </div>
        </div>

        {/* Clínica */}
        <div>
          <h3 className="text-lg font-medium mb-4">Clínica</h3>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <ServiceItem
                key={i}
                name="Nome da clínica grande para testar"
                image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rectangle%20767-VR7jOvQ24dE0sHDsUMLDa3mxdeYv7o.png"
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
