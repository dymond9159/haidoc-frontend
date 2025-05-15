"use client"

import { useCallback, useEffect, useMemo, useState } from "react"

import { StatusLabel } from "@/components/common"
import { ColumnDef } from "@/components/common/data-table"
import { EnhancedTable } from "@/components/common/enhanced-table" // Import EnhancedTable
import { FilterConfig } from "@/components/common/table-filter"
import { ConsultationCategoryList } from "@/lib/constants/consultations"
import { mockConsultationRequests } from "@/lib/mock-data/professional/home"
import { formatDate } from "@/lib/utils"
import { RequestConsultationColumns } from "@/types/provider/professional/interface-columns"
import { useRouter } from "nextjs-toploader/app"
import { RequestConsultationActions } from "../consultation"

interface RequestConsultationTableProps {
  maxRecords?: number
  filterable?: boolean
  viewMore?: boolean
  onViewMoreClick?: () => void
}

interface FilterOption {
  name?: string
  category?: string
}

export function RequestConsultationTable({
  filterable = true,
  viewMore = false,
  maxRecords,
  onViewMoreClick,
}: RequestConsultationTableProps) {
  const router = useRouter()
  const [allData, setAllData] = useState<RequestConsultationColumns[]>([])
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

      let data: RequestConsultationColumns[] = []

      data = mockConsultationRequests

      setAllData(data)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  const columns: ColumnDef<RequestConsultationColumns>[] = useMemo(
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
          row?.isAccepted ? <span className="text-sm">Aceito</span> : <RequestConsultationActions consultation={row} />,
      },
    ],
    [],
  )

  const filterConfigs: FilterConfig<RequestConsultationColumns>[] = useMemo(
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
    ],
    [filters, handleFilterChange],
  )

  const handleShowDetailsForRequesting = (row: RequestConsultationColumns) => {
    alert(2)
    router.push(`/professional/consultations/details/requested/${row.id}`)
  }

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
        onRowClick={handleShowDetailsForRequesting}
      />
    </div>
  )
}
