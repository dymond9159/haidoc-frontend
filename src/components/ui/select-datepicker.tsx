"use client"

import { format, Locale } from "date-fns"
import { CalendarIcon, ChevronDownIcon } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

type DateRange = {
  from: Date | undefined
  to: Date | undefined
}

type DateFilterOption = {
  type: "all" | "7days" | "15days" | "30days" | "more30days" | "custom"
  startDate?: string
  endDate?: string
}

interface SelectDatepickerProps extends React.HTMLAttributes<HTMLDivElement> {
  date?: Date
  setDate?: (date: Date | undefined) => void
  dateRange?: DateRange
  setDateRange?: (range: DateRange) => void
  filterValue?: DateFilterOption
  setFilterValue?: (value: DateFilterOption) => void
  placeholder?: string
  locale?: Locale
  variant?: "default" | "range" | "filter"
  className?: string
}

function SelectDatepicker({
  date,
  setDate,
  dateRange,
  setDateRange,
  filterValue,
  setFilterValue,
  placeholder = "Pick a date",
  locale,
  variant = "default",
  className,
  ...props
}: SelectDatepickerProps) {
  const [selectedOption, setSelectedOption] = React.useState<DateFilterOption["type"]>("all")
  const [startDate, setStartDate] = React.useState("")
  const [endDate, setEndDate] = React.useState("")
  const [open, setOpen] = React.useState(false)

  const handleFilterApply = () => {
    if (!setFilterValue) return

    const value: DateFilterOption =
      selectedOption === "custom" ? { type: "custom", startDate, endDate } : { type: selectedOption }

    setFilterValue(value)
  }

  const handleFilterClear = () => {
    setSelectedOption("all")
    setStartDate("")
    setEndDate("")
    setFilterValue?.({ type: "all" })
  }

  const getDisplayValue = () => {
    if (variant === "filter" && filterValue) {
      switch (filterValue.type) {
        case "all":
          return "Todos"
        case "7days":
          return "Até 7 dias"
        case "15days":
          return "Até 15 dias"
        case "30days":
          return "Até 30 dias"
        case "more30days":
          return "Mais de 30 dias"
        case "custom":
          return `${filterValue.startDate} - ${filterValue.endDate}`
        default:
          return placeholder
      }
    }

    if (variant === "range" && dateRange) {
      if (dateRange.from && dateRange.to) {
        return `${format(dateRange.from, "dd/MM/yyyy", { locale })} - ${format(dateRange.to, "dd/MM/yyyy", { locale })}`
      }
      return placeholder
    }

    if (variant === "default" && date) {
      return format(date, "dd/MM/yyyy", { locale })
    }

    return placeholder
  }

  const renderFilterContent = () => (
    <div className="p-4 space-y-3 w-[300px]">
      <RadioGroup
        value={selectedOption}
        onValueChange={(value) => setSelectedOption(value as DateFilterOption["type"])}
      >
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
            <SelectDatepicker
              date={startDate ? new Date(startDate) : undefined}
              placeholder="dd/MM/yyyy"
              setDate={(date) => date && setStartDate(date.toString())}
              locale={locale}
            />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="endDate" className="w-10">
              a
            </Label>
            <SelectDatepicker
              date={endDate ? new Date(endDate) : undefined}
              placeholder="dd/MM/yyyy"
              setDate={(date) => date && setEndDate(date.toString())}
              locale={locale}
            />
          </div>
        </div>
      )}

      <div className="flex justify-between pt-3">
        <Button variant="outline" size="sm" onClick={handleFilterClear}>
          Limpar Seleção
        </Button>
        <Button size="sm" onClick={handleFilterApply}>
          Filtrar
        </Button>
      </div>
    </div>
  )

  return (
    <div className={cn("w-fit", className)} {...props}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-between text-left font-normal",
              !date && !dateRange && !filterValue && "text-muted-foreground",
            )}
          >
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              {getDisplayValue()}
            </div>
            <ChevronDownIcon className={cn("h-4 w-4 transition-transform duration-200")} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          {variant === "filter" ? (
            renderFilterContent()
          ) : variant === "range" ? (
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={(range) => {
                if (range?.from && range?.to) {
                  setDateRange?.({ from: range.from, to: range.to })
                }
              }}
              initialFocus
              locale={locale}
            />
          ) : (
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus locale={locale} />
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}

export { SelectDatepicker }
export type { DateFilterOption, DateRange }
