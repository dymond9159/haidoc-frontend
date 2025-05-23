"use client"

import type React from "react"

import { Asterisk } from "@/components/common"
import { FileUploadBox } from "@/components/common/file-upload-box"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useTranslations } from "next-intl"
import { useRef, useState, type ChangeEvent, type FormEvent } from "react"

interface FileWithPreview extends File {
  id: string
  preview?: string
}

export default function SupportPage() {
  const t = useTranslations("pages.provider.support")
  const tCta = useTranslations("cta")
  const tForm = useTranslations("form")

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
  const tCommon = useTranslations("common")

  const validateOccurrenceType = (value: string) => {
    if (!value.trim()) {
      return t("occurrenceTypeRequired")
    }
    if (!/^[a-zA-ZÀ-ÖØ-öø-ÿ\s]*$/.test(value)) {
      return t("occurrenceTypeInvalid")
    }
    if (value.length < 3 || value.length > 255) {
      return t("occurrenceTypeLength")
    }
    return ""
  }

  const validateDescription = (value: string) => {
    if (!value.trim()) {
      return t("descriptionRequired")
    }
    if (value.length < 10) {
      return t("descriptionMinLength")
    }
    if (value.length > 500) {
      return t("descriptionMaxLength")
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
      setErrors((prev) => ({ ...prev, files: t("maxFiles") }))
      return
    }

    const invalidFiles = newFiles.filter((file) => {
      const isValidType = ["image/jpeg", "application/pdf"].includes(file.type)
      const isValidSize = file.size <= 5 * 1024 * 1024 // 5MB
      return !isValidType || !isValidSize
    })

    if (invalidFiles.length > 0) {
      setErrors((prev) => ({ ...prev, files: t("fileTypeError") }))
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
      title: t("submitSuccessTitle"),
      description: t("submitSuccessDesc"),
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
            {tForm("label.occurrenceType")} <Asterisk />
          </label>
          <Input
            id="occurrenceType"
            placeholder={tForm("placeholder.occurrenceType")}
            value={occurrenceType}
            onChange={handleOccurrenceTypeChange}
            className={`w-full ${errors.occurrenceType ? "border-error-5" : ""}`}
          />
          {errors.occurrenceType && <p className="text-sm text-error-5">{errors.occurrenceType}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium">
            {tForm("label.description")} <Asterisk />
          </label>
          <Textarea
            id="description"
            placeholder={tForm("placeholder.supportDescription")}
            value={description}
            onChange={handleDescriptionChange}
            className={`w-full min-h-[150px] ${errors.description ? "border-error-5" : ""}`}
          />
          <div className="flex justify-end text-xs text-gray-500">
            {description.length}/500 {tCommon("characters")}
          </div>
          {errors.description && <p className="text-sm text-error-5">{errors.description}</p>}
        </div>

        <div className="space-y-2">
          <p className="block text-sm font-medium">{tCommon("addFile")}</p>
          <p className="text-xs text-gray-500">{tCommon("maxFiles")}</p>

          <FileUploadBox uploadedFiles={files} onUpload={addFiles} onRemove={removeFile} error={errors.files} />
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <Button type="button" variant="outline" onClick={handleCancel}>
            {tCta("cancel")}
          </Button>
          <Button type="submit">{tCta("submit")}</Button>
        </div>
      </form>
    </div>
  )
}
