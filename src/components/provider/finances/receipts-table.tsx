"use client"

import { useRouter } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"

import { ColumnDef } from "@/components/common/data-table"
import { EnhancedTable } from "@/components/common/enhanced-table"
import { FilterConfig } from "@/components/common/table-filter"
import { Button } from "@/components/ui"
import { mockInvoice } from "@/lib/mock-data/finances"
import { ReceiptColumns } from "@/types/admin"

interface ReceiptsTableProps {
  maxRecords?: number
  filterable?: boolean
  viewMore?: boolean
}

interface filterOption {
  receiptId?: string
}

export function ReceiptsTable({ maxRecords, filterable, viewMore }: ReceiptsTableProps) {
  const router = useRouter()
  const [allData, setAllData] = useState<ReceiptColumns[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState<filterOption>({}) // Initialize filter state

  const handleFilterChange = useCallback((filterKey: string, value: any) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterKey]: value }))
  }, [])

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setAllData(mockInvoice)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  const handleViewMoreClick = () => {
    router.push(`/professional/finances/receipts`)
  }

  const handleViewDetails = (id: string) => {
    router.push(`/professional/finances/receipts/${id}`)
  }

  const columns: ColumnDef<ReceiptColumns>[] = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "N° RECIBO",
        className: "font-medium",
      },
      { accessorKey: "number", header: "CLIENTE" },
      { accessorKey: "unitValue", header: "VALOR" },
      { accessorKey: "issueDate", header: "DATA DA EMISSÃO" },
      {
        accessorKey: "actions",
        header: "AÇÕES",
        cell: (row) => (
          <Button variant="link" className="text-primary-9 h-auto p-0" onClick={() => handleViewDetails(row.id)}>
            Visualizar
          </Button>
        ),
      },
    ],
    [],
  )

  // Define Filter Configurations for Reiciptes (Example - adjust as needed)
  const filterConfigs: FilterConfig<ReceiptColumns>[] = useMemo(
    () => [
      {
        type: "search",
        label: "Pesquisar",
        accessorKey: "id",
        placeholder: "Pesquisar por N° Recibo...",
        value: filters.receiptId,
        onChange: (value) => handleFilterChange("receiptId", value),
      },
    ],
    [filters, handleFilterChange],
  )

  return (
    <EnhancedTable
      data={allData}
      columns={columns}
      filterable={filterable}
      filterConfigs={filterConfigs} // Pass the filter configurations
      isLoading={isLoading}
      getRowId={(row) => row.id}
      viewMore={viewMore}
      viewMoreButtonText="Ver Todos os Pedidos"
      maxRecords={maxRecords}
      onViewMoreClick={handleViewMoreClick}
    />
  )
}
