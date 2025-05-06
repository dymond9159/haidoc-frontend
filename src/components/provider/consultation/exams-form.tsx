"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

interface ExamsFormProps {
  onClose?: () => void
}

interface ExamCategory {
  id: string
  name: string
  exams: {
    id: string
    name: string
    isSelected: boolean
  }[]
}

export function ExamsForm({ onClose }: ExamsFormProps) {
  const [examCategories, setExamCategories] = useState<ExamCategory[]>([
    {
      id: "biochemistry",
      name: "Bioquímica",
      exams: [
        { id: "arterial-gasometry", name: "Gasometria arterial", isSelected: true },
        { id: "venous-gasometry", name: "Gasometria venosa", isSelected: false },
        { id: "glucose", name: "Glicose", isSelected: true },
      ],
    },
    {
      id: "hematology",
      name: "Hematologia",
      exams: [
        { id: "complete-blood-count", name: "Hemograma completo", isSelected: false },
        { id: "coagulation", name: "Coagulação", isSelected: false },
      ],
    },
    {
      id: "allergy",
      name: "Alergia",
      exams: [{ id: "allergy-test", name: "Teste de alergia", isSelected: false }],
    },
    {
      id: "hormones",
      name: "Hormônios",
      exams: [
        { id: "thyroid", name: "Tireoide", isSelected: false },
        { id: "cortisol", name: "Cortisol", isSelected: false },
      ],
    },
    {
      id: "tumor-markers",
      name: "Marcadores tumorais",
      exams: [
        { id: "psa", name: "PSA", isSelected: false },
        { id: "cea", name: "CEA", isSelected: false },
      ],
    },
    {
      id: "microbiology",
      name: "Microbiologia",
      exams: [
        { id: "culture", name: "Cultura", isSelected: false },
        { id: "antibiogram", name: "Antibiograma", isSelected: false },
      ],
    },
    {
      id: "immunology",
      name: "Imunologia",
      exams: [
        { id: "hiv", name: "HIV", isSelected: false },
        { id: "hepatitis", name: "Hepatite", isSelected: false },
      ],
    },
    {
      id: "urinalysis",
      name: "Urinálise",
      exams: [
        { id: "urinalysis", name: "Urinálise", isSelected: false },
        { id: "urine-culture", name: "Urocultura", isSelected: false },
      ],
    },
  ])

  const [instructions, setInstructions] = useState("")

  const toggleExam = (categoryId: string, examId: string) => {
    setExamCategories((categories) =>
      categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              exams: category.exams.map((exam) =>
                exam.id === examId ? { ...exam, isSelected: !exam.isSelected } : exam,
              ),
            }
          : category,
      ),
    )
  }

  const handleSubmit = () => {
    const selectedExams = examCategories.flatMap((category) =>
      category.exams.filter((exam) => exam.isSelected).map((exam) => ({ category: category.name, name: exam.name })),
    )

    console.log("Selected exams:", selectedExams)
    console.log("Instructions:", instructions)
    // In a real app, you would send this data to your backend
    if (onClose) onClose()
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4">
        <h3 className="text-base font-medium mb-4">Exames</h3>

        <Accordion type="multiple" className="w-full space-y-2" defaultValue={["biochemistry"]}>
          {examCategories.map((category) => (
            <AccordionItem key={category.id} value={category.id} className="border rounded-md overflow-hidden">
              <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-gray-50">
                <span className="font-medium text-blue-600">{category.name}</span>
              </AccordionTrigger>
              <AccordionContent className="px-4 py-2 border-t space-y-2">
                {category.exams.map((exam) => (
                  <div key={exam.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={exam.id}
                      checked={exam.isSelected}
                      onCheckedChange={() => toggleExam(category.id, exam.id)}
                    />
                    <label
                      htmlFor={exam.id}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {exam.name}
                    </label>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="p-4 border-t">
        <label className="text-sm font-medium mb-1 block">
          Instrução de uso<span className="text-red-500">*</span>
        </label>
        <Textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Default"
          rows={4}
        />
        <p className="text-xs text-gray-500 mt-1">1000 caracteres</p>
      </div>

      <div className="p-4 border-t">
        <Button onClick={handleSubmit} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
          Enviar
        </Button>
      </div>
    </div>
  )
}
