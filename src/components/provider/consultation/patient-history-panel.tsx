"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface PatientHistoryPanelProps {
  onClose?: () => void
}

export function PatientHistoryPanel({ onClose }: PatientHistoryPanelProps) {
  return (
    <div className="h-full overflow-y-auto">
      <Accordion type="single" collapsible defaultValue="history" className="w-full">
        <AccordionItem value="history" className="border-b">
          <AccordionTrigger className="py-4 px-4 hover:no-underline hover:bg-gray-50">
            <span className="font-medium">Histórico médico</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2">
            <div className="mb-4">
              <h3 className="text-sm text-gray-500 mb-1">Preenchido em:</h3>
              <p className="text-sm">12/05/2024 às 14:34</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="text-sm text-gray-500 mb-1">Peso</h3>
                <div className="flex items-center gap-2 bg-blue-50 p-2 rounded-md">
                  <span className="text-blue-500">⚖️</span>
                  <div>
                    <p className="text-sm font-medium">68</p>
                    <p className="text-xs text-gray-500">Kg</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm text-gray-500 mb-1">Altura</h3>
                <div className="flex items-center gap-2 bg-blue-50 p-2 rounded-md">
                  <span className="text-blue-500">📏</span>
                  <div>
                    <p className="text-sm font-medium">165</p>
                    <p className="text-xs text-gray-500">Cm</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="text-sm text-gray-500 mb-1">Sexo</h3>
                <div className="flex items-center gap-2 bg-blue-50 p-2 rounded-md">
                  <span className="text-blue-500">👤</span>
                  <p className="text-sm">Fem</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm text-gray-500 mb-1">IMC</h3>
                <div className="flex items-center gap-2 bg-blue-50 p-2 rounded-md">
                  <span className="text-blue-500">📊</span>
                  <p className="text-sm">20.55</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm text-gray-500 mb-1">Informação adicional</h3>
              <p className="text-sm bg-blue-50 p-3 rounded-md">
                Doenças hereditárias e condições médicas (diabetes, hipertensão, doenças cardíacas, câncer, etc.) de
                pais, irmãos e outros parentes próximos.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="chat" className="border-b">
          <AccordionTrigger className="py-4 px-4 hover:no-underline hover:bg-gray-50">
            <span className="font-medium">Chat rápido</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2">
            <div className="h-[200px] flex items-center justify-center border rounded-md">
              <p className="text-gray-500 text-sm">Nenhuma mensagem ainda</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
