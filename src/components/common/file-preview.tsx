"use client"

import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface FilePreviewProps {
  file: {
    id: string
    name: string
    type: string
    preview?: string
  }
  onRemove: (id: string) => void
}

export function FilePreview({ file, onRemove }: FilePreviewProps) {
  return (
    <div className="flex items-center justify-between p-2 border rounded-md">
      <div className="flex items-center space-x-2">
        {file.preview ? (
          <img src={file.preview || "/placeholder.svg"} alt="Preview" className="h-10 w-10 object-cover rounded" />
        ) : (
          <div className="h-10 w-10 bg-gray-100 flex items-center justify-center rounded text-xs font-medium">
            {file.type.includes("pdf") ? "PDF" : "Arquivo"}
          </div>
        )}
        <span className="text-sm truncate max-w-[200px]">{file.name}</span>
      </div>
      <Button type="button" variant="ghost" size="sm" onClick={() => onRemove(file.id)}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}
