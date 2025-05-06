"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"
import { useState } from "react"

interface PrescriptionFormProps {
  onClose?: () => void
}

export function PrescriptionForm({ onClose }: PrescriptionFormProps) {
  const [medications, setMedications] = useState<any[]>([])
  const [currentMedication, setCurrentMedication] = useState({
    medicationName: "",
    quantity: "2",
    dosageUnit: "mg",
    treatmentDuration: "2",
    durationUnit: "dias",
    administrationRoute: "oral",
    pharmaceuticalForm: "Comprimidos",
    instructions: "",
    signatureAdded: true,
  })

  const handleChange = (field: string, value: any) => {
    setCurrentMedication({
      ...currentMedication,
      [field]: value,
    })
  }

  const handleAddMedication = () => {
    setMedications([...medications, { ...currentMedication, id: Date.now() }])
    setCurrentMedication({
      medicationName: "",
      quantity: "2",
      dosageUnit: "mg",
      treatmentDuration: "2",
      durationUnit: "dias",
      administrationRoute: "oral",
      pharmaceuticalForm: "Comprimidos",
      instructions: "",
      signatureAdded: true,
    })
  }

  const handleSubmit = () => {
    const allMedications = [...medications]
    if (currentMedication.medicationName) {
      allMedications.push({ ...currentMedication, id: Date.now() })
    }

    console.log("Prescription submitted:", allMedications)
    // In a real app, you would send this data to your backend
    if (onClose) onClose()
  }

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4">
      {medications.length > 0 && (
        <Accordion type="multiple" className="w-full mb-4">
          {medications.map((medication, index) => (
            <AccordionItem key={medication.id} value={`medication-${medication.id}`} className="border rounded-md mb-2">
              <AccordionTrigger className="px-3 py-2 hover:no-underline">
                <span className="font-medium">Medicamento {index + 1}</span>
              </AccordionTrigger>
              <AccordionContent className="px-3 pb-3">
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Nome:</span>
                    <span>{medication.medicationName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Dosagem:</span>
                    <span>
                      {medication.quantity} {medication.dosageUnit}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Duração:</span>
                    <span>
                      {medication.treatmentDuration} {medication.durationUnit}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Via:</span>
                    <span>{medication.administrationRoute}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Forma:</span>
                    <span>{medication.pharmaceuticalForm}</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      <div>
        <label className="text-sm font-medium mb-1 block">
          Nome do medicamento<span className="text-red-500">*</span>
        </label>
        <Input
          value={currentMedication.medicationName}
          onChange={(e) => handleChange("medicationName", e.target.value)}
          placeholder="Digite aqui"
        />
        <p className="text-xs text-gray-500 mt-1">Opte por adicionar preferencialmente o nome genérico.</p>
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">Dosagem</label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Quantidade</label>
            <Select value={currentMedication.quantity} onValueChange={(value) => handleChange("quantity", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Dosagem</label>
            <Select value={currentMedication.dosageUnit} onValueChange={(value) => handleChange("dosageUnit", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mg">mg</SelectItem>
                <SelectItem value="ml">ml</SelectItem>
                <SelectItem value="g">g</SelectItem>
                <SelectItem value="mcg">mcg</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">Duração do tratamento</label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Quantidade</label>
            <Select
              value={currentMedication.treatmentDuration}
              onValueChange={(value) => handleChange("treatmentDuration", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="7">7</SelectItem>
                <SelectItem value="14">14</SelectItem>
                <SelectItem value="30">30</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Unidade</label>
            <Select
              value={currentMedication.durationUnit}
              onValueChange={(value) => handleChange("durationUnit", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dias">dias</SelectItem>
                <SelectItem value="semanas">semanas</SelectItem>
                <SelectItem value="meses">meses</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">Via de administração</label>
        <Select
          value={currentMedication.administrationRoute}
          onValueChange={(value) => handleChange("administrationRoute", value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="oral">Oral</SelectItem>
            <SelectItem value="intravenosa">Intravenosa</SelectItem>
            <SelectItem value="intramuscular">Intramuscular</SelectItem>
            <SelectItem value="subcutanea">Subcutânea</SelectItem>
            <SelectItem value="topica">Tópica</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">Forma farmacêutica</label>
        <Select
          value={currentMedication.pharmaceuticalForm}
          onValueChange={(value) => handleChange("pharmaceuticalForm", value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Comprimidos">Comprimidos</SelectItem>
            <SelectItem value="Cápsulas">Cápsulas</SelectItem>
            <SelectItem value="Solução">Solução</SelectItem>
            <SelectItem value="Suspensão">Suspensão</SelectItem>
            <SelectItem value="Pomada">Pomada</SelectItem>
            <SelectItem value="Creme">Creme</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">
          Instrução de uso<span className="text-red-500">*</span>
        </label>
        <Textarea
          value={currentMedication.instructions}
          onChange={(e) => handleChange("instructions", e.target.value)}
          placeholder="Default"
          rows={4}
        />
        <p className="text-xs text-gray-500 mt-1">1000 caracteres</p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
        <div className="flex items-start gap-2">
          <Checkbox
            id="signature"
            checked={currentMedication.signatureAdded}
            onCheckedChange={(checked) => handleChange("signatureAdded", checked)}
          />
          <div>
            <label htmlFor="signature" className="text-sm font-medium">
              Assinatura e carimbo adicionados
            </label>
            <p className="text-xs text-gray-500 mt-1">
              Sua assinatura e seu carimbo serão adicionados automaticamente no momento do envio desta prescrição.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2 pt-4">
        <Button onClick={handleSubmit} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
          Enviar
        </Button>
        <Button variant="outline" className="w-full" onClick={handleAddMedication}>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar outro medicamento
        </Button>
      </div>
    </div>
  )
}
