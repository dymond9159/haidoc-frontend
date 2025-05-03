"use client"

import { CalendarIcon, Search, X } from "lucide-react"
import { Input } from "../ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui"
import { format } from "date-fns"
import { Calendar } from "../ui/calendar"
import { ptBR } from "date-fns/locale"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

// Define the structure for status options
export interface StatusOption<T> {
  label: string
  value: T
}

export interface FilterConfig<T> {
  type: "search" | "date" | "select" | "custom"
  label: string
  accessorKey?: keyof T
  placeholder?: string
  options?: StatusOption<any>[]
  render?: (props: any) => React.ReactNode
  onChange: (value: any) => void
  value: any
}

export interface TableFiltersProps<T> {
  filters: FilterConfig<T>[]
  hasActiveFilters: boolean
  onClearFilters: () => void
}

export function TableFilters<T>({
  filters,
  hasActiveFilters,
  onClearFilters,
}: TableFiltersProps<T>) {
  return (
    <div className="space-y-4 mb-4">
      <div className="flex flex-wrap items-end gap-4">
        {filters.map((filter) => (
          <div
            key={filter.label}
            className={`flex-grow min-w-[200px] ${
              filter.type === "date" || filter.type === "select"
                ? "flex-shrink-0 w-full sm:w-auto"
                : ""
            }`}
          >
            <label
              htmlFor={`filter-${filter.label}`}
              className="mb-1 block text-sm font-medium"
            >
              {filter.label}
            </label>
            {filter.type === "search" && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  id={`filter-${filter.label}`}
                  placeholder={filter.placeholder || ""}
                  className="pl-10"
                  value={filter.value || ""}
                  onChange={(e) => filter.onChange(e.target.value)}
                />
              </div>
            )}
            {filter.type === "date" && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id={`filter-${filter.label}-trigger`}
                    variant="outline"
                    className="w-full justify-start text-left font-normal border"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filter.value ? (
                      format(filter.value, "dd/MM/yyyy", { locale: ptBR })
                    ) : (
                      <span>{filter.placeholder || "Selecione a data"}</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={filter.value}
                    onSelect={filter.onChange}
                    initialFocus
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>
            )}
            {filter.type === "select" && filter.options && (
              <Select
                value={filter.value as string}
                onValueChange={(value) => filter.onChange(value as any)}
              >
                <SelectTrigger id={`filter-${filter.label}`} className="w-full">
                  <SelectValue placeholder={filter.placeholder || ""} />
                </SelectTrigger>
                <SelectContent>
                  {filter.options.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value as string}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {filter.type === "custom" &&
              filter.render &&
              filter.render({
                value: filter.value,
                onChange: filter.onChange,
                placeholder: filter.placeholder,
                options: filter.options,
                // Add other relevant props
              })}
          </div>
        ))}
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
