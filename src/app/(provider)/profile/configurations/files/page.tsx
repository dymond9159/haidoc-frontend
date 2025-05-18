"use client"

import { Asterisk } from "@/components/common"
import { Document, DocumentList } from "@/components/common/document-list"
import { FileUploadBox, UploadedFile } from "@/components/common/file-upload-box"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
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
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadedStampFiles, setUploadedStampFiles] = useState<UploadedFile[]>([])
  const [uploadedDigitalSignatureFiles, setUploadedDigitalSignatureFiles] = useState<UploadedFile[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleFileUpload = (type: "stamp" | "digitalSignature", files: FileList) => {
    if (files.length > 0) {
      const newFiles: UploadedFile[] = []

      Array.from(files).forEach((file) => {
        if (
          type === "stamp"
            ? uploadedStampFiles.length + newFiles.length < 5
            : uploadedDigitalSignatureFiles.length + newFiles.length < 5
        ) {
          newFiles.push({
            id: Math.random().toString(36).substring(2, 9),
            name: file.name,
            size: file.size,
          })
        }
      })

      if (type === "stamp") {
        setUploadedStampFiles([...uploadedStampFiles, ...newFiles])
      } else {
        setUploadedDigitalSignatureFiles([...uploadedDigitalSignatureFiles, ...newFiles])
      }

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

  const handleRemoveFile = (type: "stamp" | "digitalSignature", id: string) => {
    if (type === "stamp") {
      setUploadedStampFiles(uploadedStampFiles.filter((file) => file.id !== id))
    } else {
      setUploadedDigitalSignatureFiles(uploadedDigitalSignatureFiles.filter((file) => file.id !== id))
    }
  }

  const handleStampFileUpload = (files: FileList) => {
    handleFileUpload("stamp", files)
  }

  const handleStampFileRemove = (id: string) => {
    handleRemoveFile("stamp", id)
  }

  const handleDigitalSignatureFileUpload = (files: FileList) => {
    handleFileUpload("digitalSignature", files)
  }

  const handleDigitalSignatureFileRemove = (id: string) => {
    handleRemoveFile("digitalSignature", id)
  }

  const handleCancel = () => {
    setUploadedStampFiles([])
    setUploadedDigitalSignatureFiles([])
  }

  const handleSave = () => {
    toast({
      title: "Arquivos salvos com sucesso",
    })
  }

  return (
    <div className="space-y-6">
      <DocumentList documents={mockDocuments} />
      <Card className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-secondary">
            Cadastro de assinatura para prescrição de receita digital
          </h3>
        </div>
        <div className="space-y-2">
          <Label>
            Carimbo <Asterisk />
          </Label>
          <FileUploadBox
            multiple
            className="stamp"
            uploadedFiles={uploadedStampFiles}
            onUpload={handleStampFileUpload}
            onRemove={handleStampFileRemove}
            error={errors?.files}
          />
        </div>
        <div className="space-y-2">
          <Label>
            Assinatura digital <Asterisk />
          </Label>
          <p className="text-sm text-muted-foreground">
            Cartão da Ordem dos Médicos, Carteira Profissional, ou Alvará da Instutuição
          </p>
          <FileUploadBox
            className="digitalSignature"
            uploadedFiles={uploadedDigitalSignatureFiles}
            onUpload={handleDigitalSignatureFileUpload}
            onRemove={handleDigitalSignatureFileRemove}
            error={errors?.files}
          />
        </div>
        <div className="flex gap-2 items-center justify-end">
          <Button variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Salvar</Button>
        </div>
      </Card>
    </div>
  )
}
