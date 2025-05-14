"use client"

import { useCallback, useEffect, useMemo, useState } from "react"

import { ColumnDef } from "@/components/common/data-table"
import { EnhancedTable } from "@/components/common/enhanced-table"
import { StatusLabel } from "@/components/common/status-label"
import { FilterConfig } from "@/components/common/table-filter"
import { mockConsultationHistory } from "@/lib/mock-data/professional/chat"
import { formatDate } from "@/lib/utils"
import { ConsultationHistoryColumns } from "@/types/provider/professional/interface-columns"
import { ConsultationStatus, ConsultationType } from "@/types/provider/professional/types"
import { DateFilterModal } from "./date-filter-modal"

interface filterOption {
  id: string
  consultationType?: ConsultationType
  value?: number
  status?: ConsultationStatus
  date?: string
}

export function ConsultationHistoryTable() {
  const [allData, setAllData] = useState<ConsultationHistoryColumns[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState<filterOption>({
    id: "",
    consultationType: undefined,
    value: 0,
    date: "",
  })

  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false)

  const handleFilterChange = useCallback((filterKey: string, value: any) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterKey]: value }))
  }, [])

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setAllData(mockConsultationHistory)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  const columns: ColumnDef<ConsultationHistoryColumns>[] = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        className: "font-medium",
      },
      {
        accessorKey: "consultationType",
        header: "TIPO DE CONSULTA",
        cell: (row) => <StatusLabel status={row?.consultationType} />,
      },
      { accessorKey: "value", header: "VALOR" },
      {
        accessorKey: "status",
        header: "STATUS",
        cell: (row) => <StatusLabel status={row?.status} />,
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
    ],
    [],
  )

  // Define Filter Configurations for Invoices (Example - adjust as needed)
  const filterConfigs: FilterConfig<ConsultationHistoryColumns>[] = useMemo(
    () => [
      {
        type: "search",
        label: "Pesquisar",
        value: filters.id,
        accessorKey: "id",
        placeholder: "Pesquisar",
        onChange: (value) => handleFilterChange("id", value),
      },
      {
        type: "select",
        label: "Tipo de Consulta",
        placeholder: "Selecione uma tipo de consulta",
        value: filters.consultationType,
        accessorKey: "consultationType",
        options: Object.values(ConsultationType).map((type) => ({
          label: type,
          value: type,
        })),
        onChange: (value) => handleFilterChange("consultationType", value),
      },
      {
        type: "select",
        label: "Status",
        placeholder: "Selecione uma status",
        value: filters.status,
        accessorKey: "status",
        options: Object.values(ConsultationStatus).map((status) => ({
          label: status,
          value: status,
        })),
        onChange: (value) => handleFilterChange("status", value),
      },
      {
        type: "date-filter",
        label: "Data",
        placeholder: "Selecione uma data",
        accessorKey: "date",
        value: filters.date,
        onChange: (value) => handleFilterChange("date", value),
        onClick: () => setIsDateFilterOpen(true),
      },
    ],
    [filters, handleFilterChange],
  )

  return (
    <>
      <EnhancedTable
        data={allData}
        columns={columns}
        filterConfigs={filterConfigs}
        isLoading={isLoading}
        getRowId={(row) => row.id}
      />
      <DateFilterModal isOpen={isDateFilterOpen} onClose={() => setIsDateFilterOpen(false)} />
    </>
  )
}
