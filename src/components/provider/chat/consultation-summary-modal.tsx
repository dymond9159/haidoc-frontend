"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

interface ConsultationSummaryModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
}

export function ConsultationSummaryModal({ isOpen, onClose, onSubmit }: ConsultationSummaryModalProps) {
  const [summary, setSummary] = useState("")
  const maxLength = 500

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Resumo da Consulta</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="mb-4 text-sm">Digite o resumo da consulta:</p>
          <Textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            maxLength={maxLength}
            className="min-h-[120px]"
            placeholder="Digite aqui..."
          />
          <div className="text-right text-xs text-gray-500 mt-1">
            {summary.length}/{maxLength} caracteres
          </div>
        </div>
        <DialogFooter className="flex justify-between sm:justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={onSubmit}>Enviar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
