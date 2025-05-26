"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ExamCategories } from "@/lib/constants/exam"
import { useState } from "react"

interface ExamsFormProps {
  onClose?: () => void
}

export interface ExamCategory {
  id: string
  name: string
  exams: {
    id: string
    name: string
    isSelected: boolean
  }[]
}

export interface ExamCategory {
  id: string
  name: string
  exams: {
    id: string
    name: string
    isSelected: boolean
  }[]
}

export interface SpecialtyCategory {
  id: string
  name: string
  specialties: {
    id: string
    name: string
    isSelected: boolean
  }[]
}

export function ExamsForm({ onClose }: ExamsFormProps) {
  const [examCategories, setExamCategories] = useState<ExamCategory[]>(ExamCategories || [])

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
    // In a real app, you would send this data to your backend
    if (onClose) onClose()
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4">
        <h3 className="text-sm font-medium mb-2">Exames</h3>

        <Accordion type="multiple" className="w-full space-y-2" defaultValue={["biochemistry"]}>
          {examCategories.map((category) => (
            <AccordionItem key={category.id} value={category.id} className="border rounded-md overflow-hidden">
              <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-gray-50">
                <span className="font-medium text-secondary">{category.name}</span>
              </AccordionTrigger>
              <AccordionContent className="px-0 py-2 border-t space-y-2">
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

      <div className="p-4 ">
        <Button onClick={handleSubmit} className="w-full">
          Enviar
        </Button>
      </div>
    </div>
  )
}
