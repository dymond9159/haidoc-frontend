"use client"

import { Pagination } from "@/components/ui/pagination"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowRightIcon, Loader2 } from "lucide-react"
import * as React from "react"
import { useMemo, useState } from "react"
import { Button } from "../ui"

// Define a generic type for column definitions
export interface ColumnDef<T> {
  accessorKey: keyof T | "actions" // The key in your data object, or 'actions' for custom action columns
  header: React.ReactNode // What to display in the table header
  cell?: (row: T, rowIndex: number) => React.ReactNode // Optional custom renderer for the cell
  className?: string // Optional class for the TableCell
  headerClassName?: string // Optional class for the TableHead
}

interface DataTableProps<T> {
  data: T[] // The array of data items to display
  columns: ColumnDef<T>[] // The column definitions
  isLoading: boolean // Whether data is currently loading
  itemsPerPage?: number // Number of items per page (default: 7)
  emptyStateMessage?: React.ReactNode // Message when data is empty
  loadingMessage?: React.ReactNode // Message while loading
  viewMore?: boolean
  viewAllText?: string
  getRowId?: (row: T, index: number) => string | number // Function to get a unique ID for the row key (optional, defaults to index)
  onViewMoreClick?: () => void
}

export function DataTable<T>({
  data,
  columns,
  isLoading,
  itemsPerPage = 7, // Default items per page
  emptyStateMessage = "Nenhum item encontrado.", // Default empty message
  loadingMessage = "Carregando dados...", // Default loading message
  viewMore = false,
  viewAllText = "Ver tudo",
  getRowId,
  onViewMoreClick,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1)

  // Memoize pagination calculation
  const { paginatedData, totalPages } = useMemo(() => {
    const total = Math.ceil(data.length / itemsPerPage)
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    const paginated = data.slice(start, end)
    return { paginatedData: paginated, totalPages: total }
  }, [data, currentPage, itemsPerPage])

  // Reset to page 1 if data changes significantly (e.g., filtering)
  React.useEffect(() => {
    setCurrentPage(1)
  }, [data.length]) // Depend on data length as a proxy for filter changes

  const defaultGetRowId = (row: T, index: number): string | number => {
    // Try common id fields, otherwise fallback to index
    if (typeof row === "object" && row !== null) {
      if (
        "id" in row &&
        (typeof row.id === "string" || typeof row.id === "number")
      ) {
        return row.id
      }
      if (
        "_id" in row &&
        (typeof row._id === "string" || typeof row._id === "number")
      ) {
        return row._id
      }
    }
    return index
  }

  const effectiveGetRowId = getRowId ?? defaultGetRowId

  return (
    <div className="bg-white rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={String(column.accessorKey)}
                className={column.headerClassName ?? "text-secondary"} // Apply specific or default class
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-80 text-center">
                <div className="flex items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-secondary" />
                  <span className="ml-2">{loadingMessage}</span>
                </div>
              </TableCell>
            </TableRow>
          ) : paginatedData.length > 0 ? (
            paginatedData.map((row, rowIndex) => (
              <TableRow key={effectiveGetRowId(row, rowIndex)} className="h-15">
                {columns.map((column) => {
                  // Determine the cell content
                  let cellContent: React.ReactNode
                  if (column.cell) {
                    // Use custom cell renderer if provided
                    cellContent = column.cell(row, rowIndex)
                  } else if (column.accessorKey !== "actions") {
                    // Directly access the value using the accessorKey
                    // Ensure type safety for accessing row properties
                    const key = column.accessorKey as keyof T
                    const value = row[key]
                    // Handle potential non-primitive values if needed (e.g., format dates)
                    cellContent =
                      typeof value === "string" || typeof value === "number"
                        ? value
                        : JSON.stringify(value)
                  } else {
                    // Default for 'actions' if no cell renderer provided (likely an error in config)
                    cellContent = null
                  }

                  return (
                    <TableCell
                      key={String(column.accessorKey)}
                      className={column.className} // Apply specific class if provided
                    >
                      {cellContent}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {emptyStateMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* Pagination */}
      {!isLoading &&
        totalPages > 1 && ( // Only show pagination if not loading and needed
          <div className="p-4 border-t">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      {!isLoading && viewMore && (
        <div className="p-4 border-t">
          <div className="w-full h-8 flex flex-row items-center justify-end gap-2">
            <Button variant="link" onClick={onViewMoreClick}>
              {viewAllText} <ArrowRightIcon />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
