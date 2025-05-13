"use client"

import { Button } from "@/components/ui/button"
import { cn, formatFileSize } from "@/lib/utils"
import { FileTextIcon, Plus, UploadIcon, X } from "lucide-react"
import { DragEvent, useRef, useState } from "react"

export type UploadedFile = {
  id: string // Consider using a more robust ID like a UUID if needed
  name: string
  size: number
}

interface FileUploadBoxProps {
  uploadedFiles: UploadedFile[]
  /** Max number of files allowed. If multiple is false, this is effectively 1. */
  maxFiles?: number
  /** Allowed file types (e.g., ".pdf,.jpg,.jpeg,.png"). */
  accept?: string
  /** Maximum file size in bytes. */
  maxSize?: number // Added for client-side size validation
  /** Allow multiple file selection. */
  multiple?: boolean
  /** Error message from parent component (e.g., server-side validation). */
  error?: string
  /** Callback when files are selected or dropped. Receives a FileList. */
  onUpload: (files: FileList) => void
  /** Callback to remove an already uploaded file by its ID. */
  onRemove: (fileId: string) => void
  /** Label for the primary upload button. */
  uploadLabel?: string
  /** Optional class name for the root div */
  className?: string
}

export const FileUploadBox = ({
  uploadedFiles,
  maxFiles: maxFilesProp = 5, // Default to 5
  accept = ".pdf,.jpg,.jpeg,.png", // Default accepted types
  maxSize = 5 * 1024 * 1024, // Default max size: 5MB
  multiple = false,
  error: parentError,
  onUpload,
  onRemove,
  uploadLabel = `Adicionar arquivos (máx ${formatFileSize(maxSize)})`,
  className,
}: FileUploadBoxProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDraggingOver, setIsDraggingOver] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)

  // Determine the actual maxFiles based on the `multiple` prop
  const maxFiles = multiple ? maxFilesProp : 1

  const currentFileCount = uploadedFiles.length

  const handleFileSelection = (selectedFiles: FileList | null) => {
    setLocalError(null) // Clear previous local errors
    if (!selectedFiles || selectedFiles.length === 0) {
      return
    }

    let filesToProcess: File[] = Array.from(selectedFiles)

    // If only single file allowed, take the first one only
    if (!multiple) {
      filesToProcess = filesToProcess.slice(0, 1)
    }

    // Filter based on file size and count limits
    const validFiles: File[] = []
    const errors: string[] = []

    for (const file of filesToProcess) {
      if (currentFileCount + validFiles.length >= maxFiles) {
        errors.push(`Limite de ${maxFiles} arquivo(s) atingido.`)
        break // Stop processing if max files reached
      }
      if (file.size > maxSize) {
        errors.push(`${file.name}: Tamanho excede o limite de ${formatFileSize(maxSize)}.`)
        continue // Skip this file
      }
      // Add more client-side validation if needed (e.g., type checking beyond 'accept')
      validFiles.push(file)
    }

    if (errors.length > 0) {
      setLocalError(errors.join(" "))
    }

    // Only call onUpload if there are valid files to upload
    if (validFiles.length > 0) {
      // Create a new FileList from the valid files array
      const dataTransfer = new DataTransfer()
      validFiles.forEach((file) => dataTransfer.items.add(file))
      onUpload(dataTransfer.files)
    }

    // Reset the file input to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleClickUpload = () => {
    setLocalError(null) // Clear error on new interaction
    if (currentFileCount < maxFiles) {
      fileInputRef.current?.click()
    } else {
      setLocalError(`Limite de ${maxFiles} arquivo(s) já atingido.`)
    }
  }

  // --- Drag and Drop Handlers ---
  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (currentFileCount < maxFiles) {
      setIsDraggingOver(true)
    }
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    // Check if the leave target is outside the dropzone bounds
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDraggingOver(false)
    }
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (currentFileCount < maxFiles) {
      // Explicitly show dropping is allowed
      e.dataTransfer.dropEffect = "copy"
      setIsDraggingOver(true) // Keep active while hovering
    } else {
      e.dataTransfer.dropEffect = "none" // Indicate not allowed
    }
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDraggingOver(false)
    setLocalError(null) // Clear error on new interaction

    if (currentFileCount >= maxFiles) {
      setLocalError(`Limite de ${maxFiles} arquivo(s) já atingido.`)
      return
    }

    const droppedFiles = e.dataTransfer.files
    handleFileSelection(droppedFiles)
  }
  // --- End Drag and Drop Handlers ---

  const hasFiles = uploadedFiles.length > 0
  const canAddMore = currentFileCount < maxFiles

  // Determine border style
  const dropZoneBorderClass = hasFiles
    ? "border-system-5" // Secondary border color when files exist
    : "border-dashed border-system-4" // Default dashed border

  const dropZoneClasses = cn(
    "border rounded-md p-6 text-center transition-colors duration-200 ease-in-out",
    dropZoneBorderClass,
    {
      "bg-system-2 border-primary-7 ring-2 ring-primary-5 ring-offset-1": isDraggingOver && canAddMore, // Highlight when dragging over and can add
      "cursor-not-allowed opacity-60": !canAddMore, // Style when max files reached
    },
    className, // Allow external className override/addition
  )

  return (
    <div className={cn("space-y-3", className)}>
      {/* Drop Zone */}
      <div
        className={dropZoneClasses}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        // Add role and aria attributes for accessibility
        role="group"
        aria-label="Zona de upload de arquivos"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => handleFileSelection(e.target.files)}
          className="hidden"
          multiple={multiple} // Set based on prop
          accept={accept} // Set based on prop
          disabled={!canAddMore} // Disable input if max files reached
        />
        <div className="mb-2">
          <UploadIcon
            className={cn(
              "h-6 w-6 mx-auto text-system-9 transition-colors",
              isDraggingOver && canAddMore && "text-primary-9",
            )}
          />
        </div>
        <p className="text-sm text-system-11 mb-1">
          {isDraggingOver && canAddMore ? "Solte os arquivos aqui!" : "Arraste e solte arquivos aqui!"}
        </p>
        <p className="text-xs text-system-9 mb-3">Ou, se preferir...</p>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={handleClickUpload}
          disabled={!canAddMore} // Disable button if max files reached
        >
          <Plus className={cn("h-3 w-3 mr-1", !multiple && hasFiles && "hidden")} />{" "}
          {/* Hide plus if single and file exists */}
          {uploadLabel}
        </Button>
        {!canAddMore && <p className="text-xs text-system-9 mt-2">Limite de {maxFiles} arquivo(s) atingido.</p>}
      </div>

      {/* Error Display - Prefers local error, falls back to parent error */}
      {(localError || parentError) && <p className="text-xs text-error-5 mt-1">{localError ?? parentError}</p>}

      {/* Uploaded files list */}
      {hasFiles && (
        <div className="space-y-2">
          {uploadedFiles.map((file) => (
            <div
              key={file.id} // Ensure IDs are unique
              className="flex items-center justify-between bg-system-2 p-2 rounded-md border border-system-3"
            >
              <div className="flex items-center overflow-hidden mr-2">
                <div className="flex-shrink-0 w-8 h-8 bg-system-5 rounded-md flex items-center justify-center mr-2">
                  <FileTextIcon size={20} className="text-system-11" />
                </div>
                <div className="overflow-hidden">
                  <p
                    className="text-xs font-medium truncate"
                    title={file.name} // Show full name on hover
                  >
                    {file.name}
                  </p>
                  <p className="text-xs text-system-9">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <Button
                variant="ghost-destructive"
                size="icon"
                onClick={() => {
                  setLocalError(null) // Clear error when removing a file
                  onRemove(file.id)
                }}
                className="flex-shrink-0"
                aria-label={`Remover arquivo ${file.name}`}
              >
                <X size={16} />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Add more button - Only show if multiple=true, files exist, and limit not reached */}
      {multiple && hasFiles && canAddMore && (
        <Button
          variant="link"
          className="flex items-center text-xs text-primary-9 mt-2 p-0 h-auto"
          onClick={handleClickUpload}
        >
          <Plus className="h-3 w-3 mr-1" />
          Adicionar mais documentos
        </Button>
      )}
    </div>
  )
}
