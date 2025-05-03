"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Command, CommandItem } from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export interface Option {
  value: string
  label: string
}

interface MultiSelectProps {
  options?: Option[]
  value?: string[]
  onChange?: (value: string[]) => void
  placeholder?: string
  className?: string
  children?: React.ReactNode
  disabled?: boolean
}

// Update the MultiSelect function to support disabled state
export function MultiSelect({
  options = [],
  value = [],
  onChange,
  placeholder = "Selecione opções",
  className = "",
  children,
  disabled = false,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)

  const handleUnselect = (item: string) => {
    if (disabled) return
    onChange?.(value.filter((i) => i !== item))
  }

  return (
    <Popover
      open={disabled ? false : open}
      onOpenChange={disabled ? undefined : setOpen}
    >
      <PopoverTrigger asChild>
        <div
          role="combobox"
          aria-expanded={open}
          className={`flex min-h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ${className} ${
            disabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={() => !disabled && setOpen(!open)}
        >
          <div className="flex flex-wrap gap-1">
            {value && value.length > 0 ? (
              value.map((item) => {
                const option = options?.find((option) => option.value === item)
                return (
                  <Badge key={item} variant="secondary" className="mr-1 mb-1">
                    {option?.label || item}
                    {!disabled && (
                      <button
                        className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleUnselect(item)
                          }
                        }}
                        onMouseDown={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                        }}
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleUnselect(item)
                        }}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </Badge>
                )
              })
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
        </div>
      </PopoverTrigger>
      {!disabled && (
        <PopoverContent
          className="w-[--radix-popover-trigger-width] p-0"
          align="start"
        >
          {children}
        </PopoverContent>
      )}
    </Popover>
  )
}

export const MultiSelectContent = Command

export const MultiSelectItem = React.forwardRef<
  React.ElementRef<typeof CommandItem>,
  React.ComponentPropsWithoutRef<typeof CommandItem> & {
    value: string
  }
>(({ className, children, value, ...props }, ref) => {
  return (
    <CommandItem ref={ref} className={className} {...props}>
      {children}
    </CommandItem>
  )
})
MultiSelectItem.displayName = "MultiSelectItem"

export const MultiSelectTrigger = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  )
})
MultiSelectTrigger.displayName = "MultiSelectTrigger"

export const MultiSelectValue = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, children, ...props }, ref) => {
  return (
    <span ref={ref} className={className} {...props}>
      {children}
    </span>
  )
})
MultiSelectValue.displayName = "MultiSelectValue"
