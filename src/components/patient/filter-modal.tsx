"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { XIcon } from "lucide-react"
import { useState } from "react"

interface FilterModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onApplyFilters: (filters: FilterValues) => void
}

export interface FilterValues {
  city: string
  minPrice: string
  maxPrice: string
}

export function FilterModal({ open, onOpenChange, onApplyFilters }: FilterModalProps) {
  const [filters, setFilters] = useState<FilterValues>({
    city: "",
    minPrice: "",
    maxPrice: "",
  })

  const handleChange = (field: keyof FilterValues, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }))
  }

  const handleApply = () => {
    onApplyFilters(filters)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0">
        <div className="p-6">
          <DialogHeader className="relative">
            <DialogTitle className="text-left">Filtros</DialogTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="absolute right-0 top-0 p-1 rounded-full hover:bg-system-3"
            >
              <XIcon className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="city" className="text-sm font-medium">
                Cidade<span className="text-haidoc-red">*</span>
              </Label>
              <Select value={filters.city} onValueChange={(value) => handleChange("city", value)}>
                <SelectTrigger id="city">
                  <SelectValue placeholder="Seleciona a cidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sao-paulo">São Paulo</SelectItem>
                  <SelectItem value="rio-de-janeiro">Rio de Janeiro</SelectItem>
                  <SelectItem value="belo-horizonte">Belo Horizonte</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="min-price" className="text-sm font-medium">
                Preço mínimo<span className="text-haidoc-red">*</span>
              </Label>
              <Input
                id="min-price"
                placeholder="Default"
                value={filters.minPrice}
                onChange={(e) => handleChange("minPrice", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-price" className="text-sm font-medium">
                Preço máximo<span className="text-haidoc-red">*</span>
              </Label>
              <Input
                id="max-price"
                placeholder="Default"
                value={filters.maxPrice}
                onChange={(e) => handleChange("maxPrice", e.target.value)}
              />
            </div>
          </div>
          <Button className="w-full bg-haidoc-red hover:bg-primary-11 text-white" onClick={handleApply}>
            Aplicar filtros
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
