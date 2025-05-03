// src/components/ui/table-filters.tsx (or a suitable shared location)
"use client"

import * as React from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar as CalendarIcon, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"

// Define the structure for status options
export interface StatusOption<T> {
  label: string
  value: T
}

interface TableFiltersProps<T> {
  // Search Filter Props
  searchQuery: string
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  searchPlaceholder?: string

  // Date Filter Props
  selectedDate: Date | undefined
  onDateChange: (date: Date | undefined) => void

  // Status Filter Props
  selectedStatus: T | null
  onStatusChange: (value: T | null) => void
  statusOptions: StatusOption<T>[]
  statusPlaceholder?: string

  // Clear Filter Props
  hasActiveFilters: boolean
  onClearFilters: () => void
}

export function TableFilters<T>({
  searchQuery,
  onSearchChange,
  searchPlaceholder = "Pesquisar...",
  selectedDate,
  onDateChange,
  selectedStatus,
  onStatusChange,
  statusOptions,
  statusPlaceholder = "Selecione o status",
  hasActiveFilters,
  onClearFilters,
}: TableFiltersProps<T>) {
  return (
    <div className="space-y-4 mb-4">
      <div className="flex flex-wrap items-end gap-4">
        {/* Search */}
        <div className="flex-grow min-w-[250px]">
          <label
            htmlFor="table-search"
            className="mb-1 block text-sm font-medium"
          >
            Pesquisar
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              id="table-search"
              placeholder={searchPlaceholder}
              className="pl-10"
              value={searchQuery}
              onChange={onSearchChange}
            />
          </div>
        </div>
        {/* Date Picker */}
        <div className="flex-shrink-0 w-full sm:w-auto">
          <label
            htmlFor="date-filter-trigger"
            className="mb-1 block text-sm font-medium"
          >
            Data
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date-filter-trigger"
                variant="outline"
                className="w-full sm:w-[250px] justify-start text-left font-normal border" // Fixed width on larger screens
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? (
                  format(selectedDate, "dd/MM/yyyy", { locale: ptBR })
                ) : (
                  <span>Selecione uma Data</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={onDateChange}
                initialFocus
                locale={ptBR}
              />
            </PopoverContent>
          </Popover>
        </div>
        {/* Status Select */}
        <div className="flex-shrink-0 w-full sm:w-auto">
          <label
            htmlFor="status-filter"
            className="mb-1 block text-sm font-medium"
          >
            Status
          </label>
          <Select
            value={selectedStatus as string}
            onValueChange={(value) => onStatusChange(value as T)}
          >
            <SelectTrigger id="status-filter" className="w-full sm:w-[250px]">
              <SelectValue placeholder={statusPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {/* <SelectItem value={"null"}>Selecione o status</SelectItem> */}
              {statusOptions.map((option, index) => (
                <SelectItem key={index} value={option.value as string}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <div className="flex-shrink-0 self-end">
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              className="flex items-center gap-1"
            >
              <X className="h-4 w-4" />
              Limpar filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
