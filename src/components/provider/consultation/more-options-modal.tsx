"use client"

import { FileBarChart, FileText, Stethoscope } from "lucide-react"

interface MoreOptionsModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenHistory: () => void
  onOpenPrescription: () => void
  onOpenExams: () => void
}

export function MoreOptionsModal({
  isOpen,
  onClose,
  onOpenHistory,
  onOpenPrescription,
  onOpenExams,
}: MoreOptionsModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="bg-white rounded-t-xl w-full max-w-md p-4 space-y-4" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-medium text-center">Opções</h2>

        <div className="grid grid-cols-3 gap-4">
          <button onClick={onOpenHistory} className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-100">
            <div className="w-12 h-12 rounded-full bg-secondary-1 flex items-center justify-center text-secondary-11">
              <FileText className="h-6 w-6" />
            </div>
            <span className="text-sm font-medium">Histórico</span>
          </button>

          <button
            onClick={onOpenPrescription}
            className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-100"
          >
            <div className="w-12 h-12 rounded-full bg-primary-1 flex items-center justify-center text-primary-11">
              <Stethoscope className="h-6 w-6" />
            </div>
            <span className="text-sm font-medium">Prescrição</span>
          </button>

          <button onClick={onOpenExams} className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-100">
            <div className="w-12 h-12 rounded-full bg-success-1 flex items-center justify-center text-success-5">
              <FileBarChart className="h-6 w-6" />
            </div>
            <span className="text-sm font-medium">Exames</span>
          </button>
        </div>
      </div>
    </div>
  )
}
