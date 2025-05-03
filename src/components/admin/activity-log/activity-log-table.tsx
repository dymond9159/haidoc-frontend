"use client"

import { ActivityLogTab } from "@/app/(admin)/admin/activity-log/page"
import { ColumnDef } from "@/components/common/data-table"
import { EnhancedTable } from "@/components/common/enhanced-table"
import { FilterConfig } from "@/components/common/table-filter"
import { Button } from "@/components/ui/button"
import { businessUsers, patients } from "@/lib/mock-data/activity-log"
import { User } from "@/types"
import { useRouter } from "nextjs-toploader/app"
import { useCallback, useEffect, useMemo, useState } from "react"

interface ActivityLogTableProps {
  mode?: ActivityLogTab
}

export function ActivityLogTable({ mode = ActivityLogTab.Patients }: ActivityLogTableProps) {
  const router = useRouter()
  const [allData, setAllData] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState<{
    name?: string
  }>({})

  const handleFilterChange = useCallback((filterKey: keyof typeof filters, value: any) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterKey]: value }))
  }, [])

  // Fetch data
  useEffect(() => {
    const fetchDatas = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockData = mode === ActivityLogTab.Patients ? patients : businessUsers

      setAllData(mockData)
      setIsLoading(false)
    }
    fetchDatas()
  }, [mode])

  const handleViewDetails = (id: string) => {
    router.push(`/admin/activity-log/details/${id}`)
  }

  // Define Columns for Deliveries
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: mode === ActivityLogTab.Patients ? "ID DO PACIENTE" : "ID DO USUÁRIO",
      className: "font-medium",
    },
    {
      accessorKey: "name",
      header: mode === ActivityLogTab.Patients ? "NOME DO PACIENTE" : "NOME DO USUÁRIO BUSINESS",
    },
    {
      accessorKey: "createdAt",
      header: "DATA DE CADASTRO NA PLATAFORMA",
    },
    {
      accessorKey: "actions",
      header: "DETALHES",
      cell: (row) => (
        <Button variant="link" className="text-primary-9 h-auto p-0" onClick={() => handleViewDetails(row.id)}>
          Visualizar
        </Button>
      ),
    },
  ]

  // Define Filter Configurations for Deliveries
  const filterConfigs: FilterConfig<User>[] = useMemo(
    () => [
      {
        type: "search",
        label: "Pesquisar",
        accessorKey: "name",
        placeholder: "Pesquisar por ID do Paciente...",
        value: filters.name,
        onChange: (value) => handleFilterChange("name", value),
      },
    ],
    [filters, handleFilterChange],
  )

  return (
    <EnhancedTable
      data={allData}
      columns={columns}
      filterConfigs={filterConfigs}
      isLoading={isLoading}
      getRowId={(row) => row.id}
    />
  )
}
