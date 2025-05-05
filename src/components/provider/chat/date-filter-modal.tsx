"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react"

interface DateFilterModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DateFilterModal({ isOpen, onClose }: DateFilterModalProps) {
  const [selectedOption, setSelectedOption] = useState("all")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const handleFilter = () => {
    // In a real app, you would apply the filter
    onClose()
  }

  const handleClearSelection = () => {
    setSelectedOption("all")
    setStartDate("")
    setEndDate("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Data</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
            <div className="flex items-center space-x-2 mb-3">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">Todos</Label>
            </div>
            <div className="flex items-center space-x-2 mb-3">
              <RadioGroupItem value="7days" id="7days" />
              <Label htmlFor="7days">Até 7 dias</Label>
            </div>
            <div className="flex items-center space-x-2 mb-3">
              <RadioGroupItem value="15days" id="15days" />
              <Label htmlFor="15days">Até 15 dias</Label>
            </div>
            <div className="flex items-center space-x-2 mb-3">
              <RadioGroupItem value="30days" id="30days" />
              <Label htmlFor="30days">Até 30 dias</Label>
            </div>
            <div className="flex items-center space-x-2 mb-3">
              <RadioGroupItem value="more30days" id="more30days" />
              <Label htmlFor="more30days">Mais de 30 dias</Label>
            </div>
            <div className="flex items-center space-x-2 mb-3">
              <RadioGroupItem value="custom" id="custom" />
              <Label htmlFor="custom">Personalizado</Label>
            </div>
            {selectedOption === "custom" && (
              <div className="ml-6 mt-3 space-y-3">
                <div className="flex items-center gap-2">
                  <Label htmlFor="startDate" className="w-8">
                    de
                  </Label>
                  <Input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="endDate" className="w-8">
                    a
                  </Label>
                  <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
              </div>
            )}
          </RadioGroup>
        </div>
        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="outline" onClick={handleClearSelection}>
            Limpar Seleção
          </Button>
          <Button onClick={handleFilter}>Filtrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
