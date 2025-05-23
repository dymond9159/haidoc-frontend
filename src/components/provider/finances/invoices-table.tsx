"use client"

import { useRouter } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"

import { ColumnDef } from "@/components/common/data-table"
import { EnhancedTable } from "@/components/common/enhanced-table"
import { FilterConfig } from "@/components/common/table-filter"
import { Button } from "@/components/ui"
import { mockInvoice } from "@/lib/mock-data/finances"
import { InvoiceColumns } from "@/types/admin"
import { useTranslations } from "next-intl"

interface InvoiceTableProps {
  maxRecords?: number
  filterable?: boolean
  viewMore?: boolean
}

interface filterOption {
  invoiceId?: string
}

export function InvoiceTable({ maxRecords, filterable, viewMore }: InvoiceTableProps) {
  const router = useRouter()
  const t = useTranslations("table")

  const [allData, setAllData] = useState<InvoiceColumns[]>([])
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
    router.push(`/professional/finances/invoices`)
  }

  const handleViewDetails = (id: string) => {
    router.push(`/professional/finances/invoices/${id}`)
  }

  const columns: ColumnDef<InvoiceColumns>[] = useMemo(
    () => [
      {
        accessorKey: "id",
        header: t("columns.numberOf", { column: t("columns.invoice") }),
        className: "font-medium",
      },
      { accessorKey: "number", header: t("columns.client") },
      { accessorKey: "unitValue", header: t("columns.value") },
      { accessorKey: "issueDate", header: t("columns.issueDate") },
      {
        accessorKey: "actions",
        header: t("columns.actions"),
        cell: (row) => (
          <Button variant="link" className="text-primary-9 h-auto p-0" onClick={() => handleViewDetails(row.id)}>
            {t("cta.view")}
          </Button>
        ),
      },
    ],
    [],
  )

  // Define Filter Configurations for Invoices (Example - adjust as needed)
  const filterConfigs: FilterConfig<InvoiceColumns>[] = useMemo(
    () => [
      {
        type: "search",
        label: t("filter.label.search"),
        accessorKey: "id",
        placeholder: t("filter.placeholder.search", {
          column: t("columns.numberOf", { column: t("columns.invoice") }),
        }),
        value: filters.invoiceId,
        onChange: (value) => handleFilterChange("invoiceId", value),
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
      viewMoreButtonText={t("cta.viewAllOrders")}
      maxRecords={maxRecords}
      onViewMoreClick={handleViewMoreClick}
    />
  )
}
