"use client"

import { Button } from "@/components/ui/button"
import { formatFileSize } from "@/lib/utils"
import { FileTextIcon, Plus, UploadIcon, X } from "lucide-react"
import { useRef } from "react"

type UploadedFile = {
  id: string
  name: string
  size: number
}

interface FileUploadBoxProps {
  uploadedFiles: UploadedFile[]
  maxFiles?: number
  accept?: string
  error?: string
  onUpload: (files: FileList) => void
  onRemove: (fileId: string) => void
  uploadLabel?: string
}

export const FileUploadBox = ({
  uploadedFiles,
  maxFiles = 5,
  accept = ".pdf,.jpg,.jpeg,.png",
  error,
  onUpload,
  onRemove,
  uploadLabel = "Adicionar arquivos (máximo 5 MB)",
}: FileUploadBoxProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClickUpload = () => {
    if (uploadedFiles.length < maxFiles) {
      fileInputRef.current?.click()
    }
  }

  return (
    <div className="space-y-3">
      {/* Drop Zone */}
      <div className="border border-dashed border-system-5 rounded-md p-6 text-center">
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => e.target.files && onUpload(e.target.files)}
          className="hidden"
          multiple
          accept={accept}
        />
        <div className="mb-2">
          <UploadIcon className="h-6 w-6 mx-auto text-system-9" />
        </div>
        <p className="text-sm text-system-11 mb-1">Arraste e solte arquivos aqui!</p>
        <p className="text-xs text-system-9 mb-3">Ou, se preferir...</p>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="text-xs border-secondary"
          onClick={handleClickUpload}
        >
          {uploadLabel}
        </Button>
      </div>

      {/* Error */}
      {error && <p className="text-xs text-error-5 mt-1">{error}</p>}

      {/* Uploaded files list */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          {uploadedFiles.map((file) => (
            <div key={file.id} className="flex items-center justify-between bg-system-2 p-2 rounded-md">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-system-5 rounded-md flex items-center justify-center mr-2">
                  <FileTextIcon size={20} />
                </div>
                <div>
                  <p className="text-xs font-medium truncate max-w-[180px]">{file.name}</p>
                  <p className="text-xs text-system-9">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <Button variant="ghost-destructive" size="icon" onClick={() => onRemove(file.id)}>
                <X size={16} />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Add more button if limit not reached */}
      {uploadedFiles.length > 0 && uploadedFiles.length < maxFiles && (
        <Button variant="link" className="flex items-center text-xs text-primary-9 mt-2" onClick={handleClickUpload}>
          <Plus className="h-3 w-3 mr-1" />
          Adicionar mais documentos
        </Button>
      )}
    </div>
  )
}
