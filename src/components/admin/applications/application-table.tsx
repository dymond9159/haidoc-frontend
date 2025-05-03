"use client"

import { ColumnDef } from "@/components/common/data-table"
import { EnhancedTable } from "@/components/common/enhanced-table"
import { FilterConfig } from "@/components/common/table-filter"
import { Button } from "@/components/ui/button"
import { mockApplications } from "@/lib/mock-data/applications"
import { formatDate } from "@/lib/utils"
import { ApplicationColumns } from "@/types/admin"
import { useRouter } from "nextjs-toploader/app"
import { useCallback, useEffect, useMemo, useState } from "react"

interface ApplicationTableProps {
  status: "pending" | "approved" | "rejected" | "canceled"
}

export function ApplicationTable({ status }: ApplicationTableProps) {
  const router = useRouter()
  const [applications, setApplications] = useState<ApplicationColumns[]>([])
  const [isLoading, setIsLoading] = useState(true) // You might want to handle loading state
  const [filters, setFilters] = useState<{
    businessName?: string
    date?: Date | undefined
    plan?: "all" | "normal" | "plus"
  }>({})

  const handleFilterChange = useCallback((filterKey: keyof typeof filters, value: any) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterKey]: value }))
  }, [])

  const handleViewDetails = (id: string) => {
    router.push(`/admin/applications/${id}?status=${status}`)
  }

  // Mock data for applications
  useEffect(() => {
    setIsLoading(true)

    setApplications(mockApplications)
    setIsLoading(false)
  }, [status])

  // Define Columns for Applications
  const columns: ColumnDef<ApplicationColumns>[] = useMemo(
    () => [
      {
        accessorKey: "businessName",
        header: "NOME",
        className: "font-medium max-w-[300px] truncate",
      },
      {
        accessorKey: "date",
        header: "DATA",
        cell: (row) => formatDate(new Date(row.date)),
      },
      {
        accessorKey: "plan",
        header: "PLANO",
      },
      {
        accessorKey: "actions",
        header: "DETALHES",
        className: "text-center",
        cell: (row) => (
          <Button variant="link" className="text-primary-9 p-0 h-auto" onClick={() => handleViewDetails(row.id)}>
            Visualizar
          </Button>
        ),
      },
    ],
    [status],
  )

  // Define Filter Configurations for Applications
  const filterConfigs: FilterConfig<ApplicationColumns>[] = useMemo(
    () => [
      {
        type: "search",
        label: "Pesquisar",
        accessorKey: "businessName",
        placeholder: "Pesquisar por nome",
        value: filters.businessName,
        onChange: (value) => handleFilterChange("businessName", value),
      },
    ],
    [filters, handleFilterChange],
  )

  return (
    <EnhancedTable
      data={applications}
      columns={columns}
      filterConfigs={filterConfigs}
      isLoading={isLoading}
      getRowId={(row) => row.id}
    />
  )
}
