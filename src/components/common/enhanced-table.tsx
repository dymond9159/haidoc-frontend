"use client"

import React, { useState, useMemo, useEffect, useCallback } from "react"
import { DataTable, ColumnDef } from "./data-table" // Assuming your DataTable component
import { FilterConfig, TableFilters } from "./table-filter"

interface Props<T> {
  data: T[]
  columns: ColumnDef<T>[]
  filterable?: boolean
  filterConfigs?: FilterConfig<T>[]
  initialFilters?: Record<string, any> // Optional initial filter values
  onDataChange?: (newData: T[]) => void // Callback if data is managed externally
  isLoading?: boolean
  itemsPerPage?: number
  emptyStateMessage?: React.ReactNode
  loadingMessage?: React.ReactNode
  viewMore?: boolean
  viewMoreButtonText?: string
  maxRecords?: number
  getRowId?: (row: T, index: number) => string | number
  onViewMoreClick?: () => void
}

export function EnhancedTable<T>({
  data: initialData,
  columns,
  filterable = true,
  filterConfigs = [],
  initialFilters = {},
  onDataChange,
  isLoading = false,
  itemsPerPage = 7,
  emptyStateMessage = "Nenhum item encontrado.",
  loadingMessage = "Carregando dados...",
  viewMore = false,
  viewMoreButtonText = "Ver Todos",
  maxRecords,
  getRowId = (row: T, index: number) => (row as any)?.id ?? index,
  onViewMoreClick,
}: Props<T>) {
  const [filters, setFilters] = useState(initialFilters)
  const [filteredData, setFilteredData] = useState(initialData)

  // Update filtered data whenever initial data or filters change
  useEffect(() => {
    let newData = [...initialData]

    filterConfigs.forEach((filterConfig) => {
      const filterValue = filters[filterConfig.accessorKey as string]
      if (
        filterValue !== undefined &&
        filterValue !== null &&
        filterValue !== ""
      ) {
        newData = newData.filter((item) => {
          if (filterConfig.type === "search" && filterConfig.accessorKey) {
            const value = item[filterConfig.accessorKey]
            return (
              typeof value === "string" &&
              value.toLowerCase().includes(String(filterValue).toLowerCase())
            )
          } else if (filterConfig.type === "date" && filterConfig.accessorKey) {
            const value = item[filterConfig.accessorKey]
            if (value instanceof Date && filterValue instanceof Date) {
              return value.toDateString() === filterValue.toDateString()
            }
            return false
          } else if (
            filterConfig.type === "select" &&
            filterConfig.accessorKey
          ) {
            return item[filterConfig.accessorKey] === filterValue
          }
          // Add logic for other filter types as needed
          return true
        })
      }
    })

    setFilteredData(newData)
    onDataChange?.(newData) // Notify parent if data is managed externally
  }, [initialData, filters, filterConfigs, onDataChange])

  const handleFilterChange = useCallback((filterKey: string, value: any) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterKey]: value }))
  }, [])

  const handleClearFilters = useCallback(() => {
    setFilters({})
  }, [])

  const hasActiveFilters = useMemo(() => {
    return Object.values(filters).some(
      (value) => value !== undefined && value !== null && value !== "",
    )
  }, [filters])

  // Prepare filterConfigs with updated onChange handlers and values
  const updatedFilterConfigs = useMemo(() => {
    return filterConfigs.map((config) => ({
      ...config,
      value: filters[config.accessorKey as string],
      onChange: (value: any) =>
        handleFilterChange(config.accessorKey as string, value),
    }))
  }, [filterConfigs, filters, handleFilterChange])

  return (
    <div>
      {filterable && (
        <TableFilters
          filters={updatedFilterConfigs}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={handleClearFilters}
        />
      )}
      <DataTable
        data={maxRecords ? filteredData.slice(0, maxRecords) : filteredData}
        columns={columns}
        isLoading={isLoading}
        itemsPerPage={itemsPerPage}
        emptyStateMessage={emptyStateMessage}
        loadingMessage={loadingMessage}
        viewMore={viewMore}
        viewAllText={viewMoreButtonText}
        getRowId={getRowId}
        onViewMoreClick={onViewMoreClick}
      />
    </div>
  )
}
