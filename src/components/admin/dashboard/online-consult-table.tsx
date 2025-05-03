"use client"

import { useCallback, useEffect, useMemo, useState } from "react"

import { ColumnDef } from "@/components/common/data-table"
import { EnhancedTable } from "@/components/common/enhanced-table" // Import EnhancedTable
import { FilterConfig } from "@/components/common/table-filter"
import { mockOnlineConsultations } from "@/lib/mock-data/dashboard"
import { formatDate } from "@/lib/utils"
import { OnlineConsultationColumns } from "@/types/admin"

interface OnlineConsultTableProps {
  maxRecords?: number
  filterable?: boolean
  viewMore?: boolean
  onViewMoreClick?: () => void
}

interface FilterOption {
  patientId?: string
  professional?: string
  doctor?: string
  date?: string
}

export function OnlineConsultTable({
  filterable = true,
  viewMore = false,
  maxRecords,
  onViewMoreClick,
}: OnlineConsultTableProps) {
  const [allData, setAllData] = useState<OnlineConsultationColumns[]>([])
  const [filters, setFilters] = useState<FilterOption>({}) // Initialize filter state
  const [isLoading, setIsLoading] = useState(true)

  const handleFilterChange = useCallback(
    (filterKey: keyof FilterOption, value: any) => {
      setFilters((prevFilters) => ({ ...prevFilters, [filterKey]: value }))
    },
    [],
  )

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      let data: OnlineConsultationColumns[] = []

      data = mockOnlineConsultations

      setAllData(data)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  const columns: ColumnDef<OnlineConsultationColumns>[] = useMemo(
    () => [
      {
        accessorKey: "patientId",
        header: "ID DO PACIENTE",
        className: "font-medium",
      },
      { accessorKey: "professional", header: "ESPECIALIDADE" },
      { accessorKey: "doctor", header: "MÉDICO" },
      { accessorKey: "value", header: "VALOR" },
      {
        accessorKey: "date",
        header: "DATA E HORA",
        cell: (row) => (
          <div>
            <span className="text-sm block">{row?.time}</span>
            <span className="text-xs text-system-9">
              {formatDate(new Date(row?.date))}
            </span>
          </div>
        ),
      },
    ],
    [],
  )

  const filterConfigs: FilterConfig<OnlineConsultationColumns>[] = useMemo(
    () => [
      {
        type: "search",
        label: "Pesquisar",
        accessorKey: "patientId",
        placeholder: "Pesquisar por ID",
        value: filters.patientId,
        onChange: (value) => handleFilterChange("patientId", value),
      },
      {
        type: "search",
        label: "Especialidade",
        accessorKey: "professional",
        placeholder: "Selecione uma Especialidade",
        value: filters.professional,
        onChange: (value) => handleFilterChange("professional", value),
      },
      {
        type: "search",
        label: "Médico",
        accessorKey: "doctor",
        placeholder: "Nome do Médico",
        value: filters.doctor,
        onChange: (value) => handleFilterChange("doctor", value),
      },
      {
        type: "date",
        label: "Data",
        accessorKey: "date",
        placeholder: "Selecione uma Data",
        value: filters.date,
        onChange: (value) => handleFilterChange("date", value),
      },
    ],
    [filters, handleFilterChange],
  )

  return (
    <div className="space-y-4">
      <EnhancedTable
        data={allData}
        columns={columns}
        filterConfigs={filterable ? filterConfigs : []} // Pass filterConfigs conditionally
        isLoading={isLoading}
        getRowId={(row) => row.id}
        viewMore={viewMore}
        maxRecords={maxRecords}
        onViewMoreClick={onViewMoreClick}
      />
    </div>
  )
}
