"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"
import { useState } from "react"

interface MedicalReportModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

export function MedicalReportModal({ isOpen, onClose, onSubmit }: MedicalReportModalProps) {
  const [formData, setFormData] = useState({
    provisionalDiagnosis: "",
    suspectedDiagnosis: "",
    finalDiagnosis: "",
    consultationSummary: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleSubmit = () => {
    onSubmit(formData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-md p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Relatório médico</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">
              Diagnóstico provisório<span className="text-red-500">*</span>
            </label>
            <Input
              value={formData.provisionalDiagnosis}
              onChange={(e) => handleChange("provisionalDiagnosis", e.target.value)}
              placeholder="Digite aqui"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">
              Diagnóstico suspeito<span className="text-red-500">*</span>
            </label>
            <Input
              value={formData.suspectedDiagnosis}
              onChange={(e) => handleChange("suspectedDiagnosis", e.target.value)}
              placeholder="Digite aqui"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Diagnóstico final (opcional)</label>
            <Input
              value={formData.finalDiagnosis}
              onChange={(e) => handleChange("finalDiagnosis", e.target.value)}
              placeholder="Digite aqui"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Resumo da consulta</label>
            <Textarea
              value={formData.consultationSummary}
              onChange={(e) => handleChange("consultationSummary", e.target.value)}
              placeholder="Digite aqui"
              rows={4}
            />
          </div>
        </div>

        <Button onClick={handleSubmit} className="w-full bg-red-500 hover:bg-red-600 text-white">
          Encerrar
        </Button>
      </div>
    </div>
  )
}
