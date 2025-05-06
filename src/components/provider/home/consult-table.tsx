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
import { CheckIcon, HistoryIcon, MessageSquareTextIcon, X } from "lucide-react"

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

export function ConsultationTable({
  filterable = true,
  viewMore = false,
  maxRecords,
  onViewMoreClick,
}: ConsultationTableProps) {
  const [allData, setAllData] = useState<ConsultationColumns[]>([])
  const [filters, setFilters] = useState<FilterOption>({}) // Initialize filter state
  const [isLoading, setIsLoading] = useState(true)

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
        cell: (row) =>
          row?.isAccepted ? (
            <span className="text-sm">Aceito</span>
          ) : (
            <div className="flex items-center gap-1 justify-center">
              <Button variant="outline" colorVariant="success" size="icon" className="size-8 rounded-full">
                <CheckIcon />
              </Button>
              <Button variant="outline" colorVariant="error" size="icon" className="size-8 rounded-full">
                <X />
              </Button>
              <Button variant="outline" colorVariant="default" size="icon" className="size-8 rounded-full">
                <MessageSquareTextIcon />
              </Button>
              <Button variant="outline" colorVariant="info" size="icon" className="size-8 rounded-full">
                <HistoryIcon />
              </Button>
            </div>
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

  return (
    <div className="space-y-4">
      <EnhancedTable
        data={allData}
        columns={columns}
        filterConfigs={filterable ? filterConfigs : []}
        isLoading={isLoading}
        getRowId={(row) => row.id}
        viewMore={viewMore}
        maxRecords={maxRecords}
        onViewMoreClick={onViewMoreClick}
      />
    </div>
  )
}
