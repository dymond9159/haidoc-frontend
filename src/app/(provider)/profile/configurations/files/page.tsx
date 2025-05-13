"use client"

import { Document, DocumentList } from "@/components/common/document-list"
import { FileUploadBox, UploadedFile } from "@/components/common/file-upload-box"
import { Button } from "@/components/ui"
import { PlusIcon } from "lucide-react"
import { useRef, useState } from "react"

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Cartão-ordem-dos-médicos.jpeg",
    type: "image",
    uploadedAt: "09/07/2024",
    url: "",
  },
  {
    id: "2",
    name: "Cartão-ordem-dos-médicos.pdf",
    type: "pdf",
    uploadedAt: "09/07/2024",
    url: "",
  },
  {
    id: "3",
    name: "Cartão-ordem-dos-médicos1.pdf",
    type: "pdf",
    uploadedAt: "09/07/2024",
    url: "",
  },
]

export default function FilesConfigurationsPage() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleFileUpload = (files: FileList) => {
    if (files.length > 0) {
      const newFiles: UploadedFile[] = []

      Array.from(files).forEach((file) => {
        if (uploadedFiles.length + newFiles.length < 5) {
          newFiles.push({
            id: Math.random().toString(36).substring(2, 9),
            name: file.name,
            size: file.size,
          })
        }
      })

      setUploadedFiles([...uploadedFiles, ...newFiles])

      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

      // Clear error if files are uploaded
      if (errors.files && newFiles.length > 0) {
        const newErrors = { ...errors }
        delete newErrors.files
        setErrors(newErrors)
      }
    }
  }

  const handleRemoveFile = (id: string) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-secondary">Ficheiros</h3>
        <Button className="gap-2">
          <PlusIcon className="w-4 h-4" />
          Novo ficheiro
        </Button>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <FileUploadBox
            multiple
            uploadedFiles={uploadedFiles}
            onUpload={handleFileUpload}
            onRemove={handleRemoveFile}
            error={errors?.files}
          />
        </div>
        <DocumentList documents={mockDocuments} />
      </div>
    </div>
  )
}
