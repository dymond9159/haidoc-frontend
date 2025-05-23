"use client"

import { useCallback, useEffect, useMemo, useState } from "react"

import { ColumnDef } from "@/components/common/data-table"
import { EnhancedTable } from "@/components/common/enhanced-table"
import { StatusLabel } from "@/components/common/status-label"
import { FilterConfig } from "@/components/common/table-filter"
import { mockConsultationHistory } from "@/lib/mock-data/professional/chat"
import { formatDate } from "@/lib/utils"
import { ConsultationHistoryColumns } from "@/types/provider/professional/interface-columns"
import { ConsultationStatus } from "@/types/provider/professional/types"
import { useTranslations } from "next-intl"
import { DateFilterModal } from "./date-filter-modal"

interface filterOption {
  id: string
  value?: number
  status?: ConsultationStatus
  dateFilter?: string
}

export function ConsultationHistoryTable() {
  const t = useTranslations("table")

  const [allData, setAllData] = useState<ConsultationHistoryColumns[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState<filterOption>({
    id: "",
    value: 0,
    dateFilter: "",
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
        header: t("columns.ID"),
        className: "font-medium",
      },
      {
        accessorKey: "consultationType",
        header: t("columns.typeOf", { column: t("columns.consultation") }),
        cell: (row) => <StatusLabel status={row?.consultationType} />,
      },
      { accessorKey: "value", header: t("columns.value") },
      {
        accessorKey: "status",
        header: t("columns.status"),
        cell: (row) => <StatusLabel status={row?.status} />,
      },
      {
        accessorKey: "date",
        header: t("columns.datetime"),
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
        label: t("filter.label.search"),
        value: filters.id,
        accessorKey: "id",
        placeholder: t("filter.placeholder.search", { column: t("columns.ID") }),
        onChange: (value) => handleFilterChange("id", value),
      },
      {
        type: "select",
        label: t("filter.label.status"),
        placeholder: t("filter.placeholder.status"),
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
        label: t("filter.label.date"),
        placeholder: t("filter.placeholder.date"),
        accessorKey: "date",
        value: filters.dateFilter,
        onChange: (value) => handleFilterChange("dateFilter", value),
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
