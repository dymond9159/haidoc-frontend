"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { useRef } from "react"

interface FileUploadAreaProps {
  isDragging: boolean
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void
  onFileSelect: () => void
}

export function FileUploadArea({ isDragging, onDragOver, onDragLeave, onDrop, onFileSelect }: FileUploadAreaProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <div
      className={`border-2 border-dashed rounded-md p-6 text-center ${
        isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="flex flex-col items-center justify-center space-y-2">
        <Upload className="h-8 w-8 text-gray-400" />
        <p className="text-sm text-gray-500">Arraste e solte os arquivos aqui!</p>
        <p className="text-sm text-gray-500">Ou, se preferir...</p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            fileInputRef.current?.click()
            onFileSelect()
          }}
          className="mt-2"
        >
          Adicionar arquivo (máximo 5 MB)
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".jpg,.jpeg,.pdf"
          onChange={(e) => {
            // This is handled in the parent component
          }}
          multiple
        />
      </div>
    </div>
  )
}
