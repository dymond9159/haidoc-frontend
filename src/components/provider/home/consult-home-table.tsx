"use client"

import { useCallback, useEffect, useMemo, useState } from "react"

import { StatusLabel } from "@/components/common"
import { ColumnDef } from "@/components/common/data-table"
import { EnhancedTable } from "@/components/common/enhanced-table" // Import EnhancedTable
import { FilterConfig } from "@/components/common/table-filter"
import { Button } from "@/components/ui"
import { ConsultationCategoryList, ConsultationTypeList } from "@/lib/constants/consultations"
import { mockConsultations } from "@/lib/mock-data/professional/home"
import { formatDate } from "@/lib/utils"
import { ConsultationColumns } from "@/types/provider/professional/interface-columns"
import { ConsultationCategory, ConsultationType } from "@/types/provider/professional/types"
import { useRouter } from "nextjs-toploader/app"
import { ConsultationDetailsModal } from "../consultation/consultation-details-modal"
import { StartConsultationModal } from "../consultation/start-consultation-modal"

interface ConsultationTableProps {
  maxRecords?: number
  filterable?: boolean
  viewMore?: boolean
  onViewMoreClick?: () => void
}

interface FilterOption {
  name?: string
  category?: string
  consultationType?: string
}

export function ConsultationHomeTable({
  filterable = true,
  viewMore = false,
  maxRecords,
  onViewMoreClick,
}: ConsultationTableProps) {
  const router = useRouter()

  const [allData, setAllData] = useState<ConsultationColumns[]>([])
  const [filters, setFilters] = useState<FilterOption>({}) // Initialize filter state
  const [isLoading, setIsLoading] = useState(true)

  const [selectedConsultation, setSelectedConsultation] = useState<ConsultationColumns | null>(null)
  const [showStartModal, setShowStartModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  const handleFilterChange = useCallback((filterKey: keyof FilterOption, value: any) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterKey]: value }))
  }, [])

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      let data: ConsultationColumns[] = []

      data = mockConsultations

      setAllData(data)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  const columns: ColumnDef<ConsultationColumns>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "NOME",
      },
      {
        accessorKey: "category",
        header: "CATEGORIA",
        cell: (row) => <StatusLabel status={row?.category} />,
      },
      {
        accessorKey: "consultationType",
        header: "TIPO DE CONSULTA",
        cell: (row) => <StatusLabel status={row?.consultationType} />,
      },
      {
        accessorKey: "date",
        header: "DATA E HORA",
        cell: (row) => (
          <div>
            <span className="text-sm block">{row?.time}</span>
            <span className="text-xs text-system-9">{formatDate(new Date(row?.date))}</span>
          </div>
        ),
      },
      {
        accessorKey: "actions",
        header: "OPÇÕES",
        cell: (row) => (
          <Button
            variant="link"
            onClick={(e) => {
              e.stopPropagation()
              handleStartConsultation(row)
            }}
          >
            Iniciar consulta
          </Button>
        ),
      },
    ],
    [],
  )

  const filterConfigs: FilterConfig<ConsultationColumns>[] = useMemo(
    () => [
      {
        type: "search",
        label: "Pesquisar Nome",
        accessorKey: "name",
        placeholder: "Pesquisar por Nome",
        value: filters.name,
        onChange: (value) => handleFilterChange("name", value),
      },
      {
        type: "select",
        label: "Categoria",
        accessorKey: "category",
        placeholder: "Selecione uma categoria",
        value: filters.category,
        onChange: (value) => handleFilterChange("category", value),
        options: ConsultationCategoryList.map((category) => ({
          label: category,
          value: category,
        })),
      },
      {
        type: "select",
        label: "Tipo de Consulta",
        accessorKey: "consultationType",
        placeholder: "Selecione um tipo de consulta",
        value: filters.consultationType,
        onChange: (value) => handleFilterChange("consultationType", value),
        options: ConsultationTypeList.map((type) => ({
          label: type,
          value: type,
        })),
      },
    ],
    [filters, handleFilterChange],
  )

  const handleStartConsultation = (consultation: ConsultationColumns) => {
    setSelectedConsultation(consultation)
    setShowStartModal(true)
  }

  const handleProceedWithConsultation = () => {
    if (!selectedConsultation) return

    setShowStartModal(false)

    // Navigate based on consultation type
    switch (selectedConsultation.category) {
      case ConsultationCategory.Teleconsultation:
        router.push("/professional/consultations/online")
        break
      case ConsultationCategory.Chat:
        router.push("/professional/consultations/chat")
        break
      case ConsultationCategory.Home:
        router.push("/professional/consultations/home")
        break
    }
  }

  const mockAppointment = {
    id: "1",
    patientName: "Nome do paciente",
    patientId: "1234567890",
    type: ConsultationType.Urgent,
    date: "2021-01-01",
    startTime: new Date(2025, 3, 22, 8, 0).toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" }),
    endTime: new Date(2025, 3, 22, 9, 0).toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" }),
    category: ConsultationCategory.Home,
    specialty: "Cardiologia",
    doctorName: "Nome do Médico",
    price: "250,00",
    reason: "Motivo da consulta informada pelo paciente.",
  }

  const handleShowDetails = (consultation: ConsultationColumns) => {
    setSelectedConsultation(consultation)
    setShowDetailsModal(true)
  }

  return (
    <div className="space-y-4">
      <EnhancedTable
        data={allData}
        columns={columns}
        filterable={false}
        filterConfigs={filterable ? filterConfigs : []}
        isLoading={isLoading}
        getRowId={(row) => row.id}
        viewMore={viewMore}
        maxRecords={maxRecords}
        onViewMoreClick={onViewMoreClick}
        onRowClick={handleShowDetails}
      />
      {selectedConsultation && (
        <StartConsultationModal
          isOpen={showStartModal}
          onClose={() => setShowStartModal(false)}
          consultationType={selectedConsultation.category}
          onProceed={handleProceedWithConsultation}
        />
      )}

      {selectedConsultation && (
        <ConsultationDetailsModal
          type="consultation"
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          appointment={
            {
              ...mockAppointment,
              patientName: selectedConsultation.name,
              type: selectedConsultation.consultationType,
              category: selectedConsultation.category,
            } as any
          }
          onStartConsultation={handleStartConsultation}
          onCancel={() => {}}
        />
      )}
    </div>
  )
}
