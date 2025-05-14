"use client"

import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, Search, X } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui"
import { Calendar } from "../ui/calendar"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

// Define the structure for status options
export interface StatusOption<T> {
  label: string
  value: T
}

export interface FilterConfig<T> {
  type: "search" | "date" | "select" | "custom" | "date-filter"
  label: string
  accessorKey?: keyof T
  placeholder?: string
  options?: StatusOption<any>[]
  render?: (props: any) => React.ReactNode
  onChange: (value: any) => void
  onClick?: () => void
  value: any
}

export interface TableFiltersProps<T> {
  filters: FilterConfig<T>[]
  hasActiveFilters: boolean
  onClearFilters: () => void
}

export function TableFilters<T>({ filters, hasActiveFilters, onClearFilters }: TableFiltersProps<T>) {
  return (
    <div className="space-y-4 mb-4">
      <div className="flex flex-wrap items-end gap-4">
        {filters.map((filter) => (
          <div
            key={filter.label}
            className={`flex-grow min-w-[200px] ${
              filter.type === "date" || filter.type === "select" ? "flex-shrink-0 w-full sm:w-auto" : ""
            }`}
          >
            <label htmlFor={`filter-${filter.label}`} className="mb-1 block text-sm font-medium">
              {filter.label}
            </label>
            {filter.type === "search" && (
              <div className="flex-1 relative">
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
                      <span>{filter.placeholder || "Selecione uma Data"}</span>
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
            {filter.type === "date-filter" && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex items-start justify-start gap-2 w-full font-normal">
                    <CalendarIcon className="h-4 w-4" />
                    {filter.value ? (
                      <span>{filter.value}</span>
                    ) : (
                      <span>{filter.placeholder || "Selecione uma Data"}</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <DateFilterPopoverContent
                    onApply={(value) => {
                      filter.onChange(value)
                    }}
                    onClear={() => filter.onChange(null)}
                  />
                </PopoverContent>
              </Popover>
            )}
            {filter.type === "select" && filter.options && (
              <Select value={filter.value as string} onValueChange={(value) => filter.onChange(value as any)}>
                <SelectTrigger id={`filter-${filter.label}`} className="w-full">
                  <SelectValue placeholder={filter.placeholder || ""} />
                </SelectTrigger>
                <SelectContent>
                  {filter.options.map((option) => (
                    <SelectItem key={option.value} value={option.value as string}>
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
      </div>
        {hasActiveFilters && (
          <div className="flex-shrink-0 self-end">
            <Button variant="outline" size="sm" onClick={onClearFilters} className="flex items-center gap-1">
              <X className="h-4 w-4" />
              Limpar filtros
            </Button>
          </div>
        )}
    </div>
  )
}

interface DateFilterPopoverProps {
  onApply: (value: any) => void
  onClear: () => void
}

export function DateFilterPopoverContent({ onApply, onClear }: DateFilterPopoverProps) {
  const [selectedOption, setSelectedOption] = useState("all")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const handleApply = () => {
    const value = selectedOption === "custom" ? { type: "custom", startDate, endDate } : { type: selectedOption }
    onApply(value)
  }

  return (
    <div className="p-4 space-y-3 w-[300px]">
      <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
        {[
          { value: "all", label: "Todos" },
          { value: "7days", label: "Até 7 dias" },
          { value: "15days", label: "Até 15 dias" },
          { value: "30days", label: "Até 30 dias" },
          { value: "more30days", label: "Mais de 30 dias" },
          { value: "custom", label: "Personalizado" },
        ].map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={option.value} />
            <Label htmlFor={option.value}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>

      {selectedOption === "custom" && (
        <div className="space-y-2 pt-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="startDate" className="w-10">
              de
            </Label>
            <Input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="endDate" className="w-10">
              a
            </Label>
            <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
        </div>
      )}

      <div className="flex justify-between pt-3">
        <Button variant="outline" size="sm" onClick={onClear}>
          Limpar Seleção
        </Button>
        <Button size="sm" onClick={handleApply}>
          Filtrar
        </Button>
      </div>
    </div>
  )
}
