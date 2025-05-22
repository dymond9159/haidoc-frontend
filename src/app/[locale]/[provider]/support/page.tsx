"use client"

import type React from "react"

import { Asterisk } from "@/components/common"
import { FileUploadBox } from "@/components/common/file-upload-box"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useRef, useState, type ChangeEvent, type FormEvent } from "react"

interface FileWithPreview extends File {
  id: string
  preview?: string
}

export default function SupportPage() {
  const [occurrenceType, setOccurrenceType] = useState("")
  const [description, setDescription] = useState("")
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [errors, setErrors] = useState({
    occurrenceType: "",
    description: "",
    files: "",
  })
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const validateOccurrenceType = (value: string) => {
    if (!value.trim()) {
      return "O tipo de ocorrência é obrigatório."
    }
    if (!/^[a-zA-ZÀ-ÖØ-öø-ÿ\s]*$/.test(value)) {
      return "O tipo de ocorrência deve conter apenas letras e espaços."
    }
    if (value.length < 3 || value.length > 255) {
      return "O tipo de ocorrência deve ter no mínimo 3 caracteres e no máximo 255 caracteres."
    }
    return ""
  }

  const validateDescription = (value: string) => {
    if (!value.trim()) {
      return "O campo descrição é obrigatório."
    }
    if (value.length < 10) {
      return "A descrição deve ter no mínimo 10 caracteres."
    }
    if (value.length > 500) {
      return "A descrição deve ter no máximo 500 caracteres."
    }
    return ""
  }

  const handleOccurrenceTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setOccurrenceType(value)
    setErrors((prev) => ({ ...prev, occurrenceType: validateOccurrenceType(value) }))
  }

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setDescription(value)
    setErrors((prev) => ({ ...prev, description: validateDescription(value) }))
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    addFiles(e.target.files)
  }

  const addFiles = (fileList: FileList | null) => {
    if (!fileList) return

    const newFiles = Array.from(fileList).map((file) => ({
      ...file,
      id: crypto.randomUUID(),
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
    }))

    if (files.length + newFiles.length > 5) {
      setErrors((prev) => ({ ...prev, files: "Apenas 5 arquivos são permitidos." }))
      return
    }

    const invalidFiles = newFiles.filter((file) => {
      const isValidType = ["image/jpeg", "application/pdf"].includes(file.type)
      const isValidSize = file.size <= 5 * 1024 * 1024 // 5MB
      return !isValidType || !isValidSize
    })

    if (invalidFiles.length > 0) {
      setErrors((prev) => ({ ...prev, files: "Apenas arquivos JPEG e PDF com tamanho máximo de 5MB são permitidos." }))
      return
    }

    setFiles((prev) => [...prev, ...newFiles])
    setErrors((prev) => ({ ...prev, files: "" }))
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    addFiles(e.dataTransfer.files)
  }

  const removeFile = (id: string) => {
    setFiles(files.filter((file) => file.id !== id))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    // Validate all fields
    const occurrenceTypeError = validateOccurrenceType(occurrenceType)
    const descriptionError = validateDescription(description)

    setErrors({
      occurrenceType: occurrenceTypeError,
      description: descriptionError,
      files: "",
    })

    if (occurrenceTypeError || descriptionError) {
      return
    }

    // Submit form logic would go here
    // For now, we'll just show a success toast
    toast({
      title: "Solicitação enviada",
      description: "Sua solicitação de suporte foi enviada com sucesso.",
      duration: 5000,
    })

    // Reset form
    setOccurrenceType("")
    setDescription("")
    setFiles([])
  }

  const handleCancel = () => {
    setOccurrenceType("")
    setDescription("")
    setFiles([])
    setErrors({
      occurrenceType: "",
      description: "",
      files: "",
    })
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="occurrenceType" className="block text-sm font-medium">
            Tipo de ocorrência <Asterisk />
          </label>
          <Input
            id="occurrenceType"
            placeholder="Exemplo: Dúvida sobre o pagamento"
            value={occurrenceType}
            onChange={handleOccurrenceTypeChange}
            className={`w-full ${errors.occurrenceType ? "border-error-5" : ""}`}
          />
          {errors.occurrenceType && <p className="text-sm text-error-5">{errors.occurrenceType}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium">
            Descrição <Asterisk />
          </label>
          <Textarea
            id="description"
            placeholder="Digite sua pergunta ou relate seu problema..."
            value={description}
            onChange={handleDescriptionChange}
            className={`w-full min-h-[150px] ${errors.description ? "border-error-5" : ""}`}
          />
          <div className="flex justify-end text-xs text-gray-500">{description.length}/500 caracteres</div>
          {errors.description && <p className="text-sm text-error-5">{errors.description}</p>}
        </div>

        <div className="space-y-2">
          <p className="block text-sm font-medium">Adicionar arquivo</p>
          <p className="text-xs text-gray-500">Apenas 5 arquivos permitidos</p>

          <FileUploadBox
            uploadedFiles={files}
            onUpload={addFiles}
            onRemove={removeFile}
            error={errors.files}
            uploadLabel="Adicionar arquivos (máximo 5 MB)"
          />
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button type="submit">Enviar</Button>
        </div>
      </form>
    </div>
  )
}
