"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { RejectApplicationDialog } from "@/components/admin/applications/reject-application-dialog"
import { ApproveApplicationDialog } from "@/components/admin/applications/approve-application-dialog"
import { RequestDocumentDialog } from "@/components/admin/applications/request-document-dialog"
import { SuspendApplicationDialog } from "@/components/admin/applications/suspend-application-dialog"
import { CancelApplicationDialog } from "@/components/admin/applications/cancel-application-dialog"
import { BackButton } from "@/components/common"
import { DocumentList } from "@/components/admin/document-list"

interface Document {
  id: string
  name: string
  type: string
  url: string
}

interface DocumentRequest {
  type: string
  description: string
}

export default function ApplicationDetailPage() {
  const router = useRouter()
  const { toast } = useToast()

  const params = useParams<{ id: string }>()
  const id = params.id

  const searchParams = useSearchParams()
  const applicationStatus = searchParams.get("status")

  useEffect(() => {
    console.log("Application ID (from useParams):", id)
    console.log("Application Status (from useSearchParams):", applicationStatus)
  }, [id, applicationStatus])

  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false)
  const [isRequestDocumentDialogOpen, setIsRequestDocumentDialogOpen] =
    useState(false)
  const [isSuspendDialogOpen, setIsSuspendDialogOpen] = useState(false)
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false)

  // Mock application data
  const application = {
    id,
    businessName:
      "Farmácia com nome muuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuito grande",
    date: "08/07/2024",
    providerType: "Farmácia",
    nuit: "401701826",
    plan: "Plus",
    address:
      "Rua do Dão, nº49, 2º Andar, Bairro Central, Cidade de Maputo, Moçambique",
    contact: {
      email: "Email@exemplo.com",
      phone: "(00) 00000-0000",
    },
    documents: [
      { id: "1", name: "NIRE OU ALVARÁ", type: "pdf", url: "#" },
      { id: "2", name: "CNPJ", type: "pdf", url: "#" },
      { id: "3", name: "nuit", type: "pdf", url: "#" },
    ],
  }

  // Handle back button
  const handleBack = () => {
    router.back()
  }

  // Handle reject application
  const handleRejectApplication = (reason: string) => {
    // In a real app, you would call an API to reject the application
    console.log(`Rejecting application ${id} with reason: ${reason}`)

    toast({
      title: "Aplicação reprovada",
      description: "A aplicação foi reprovada com sucesso.",
    })

    router.push("/admin/applications")
  }

  // Handle approve application
  const handleApproveApplication = () => {
    // In a real app, you would call an API to approve the application
    console.log(`Approving application ${id}`)

    toast({
      title: "Aplicação aprovada",
      description: "A aplicação foi aprovada com sucesso.",
    })

    router.push("/admin/applications")
  }

  // Handle request additional documents
  const handleRequestDocuments = (documents: DocumentRequest[]) => {
    // In a real app, you would call an API to request additional documents
    console.log(
      `Requesting additional documents for application ${id}:`,
      documents,
    )

    toast({
      title: "Solicitação enviada",
      description:
        "A solicitação de documentos adicionais foi enviada com sucesso.",
    })
  }

  // Handle suspend application
  const handleSuspendApplication = (reason: string, documentType: string) => {
    // In a real app, you would call an API to suspend the application
    console.log(
      `Suspending application ${id} with reason: ${reason} and document type: ${documentType}`,
    )

    toast({
      title: "Aplicação suspensa",
      description: "A aplicação foi suspensa com sucesso.",
    })

    router.push("/admin/applications")
  }

  // Handle cancel application
  const handleCancelApplication = (reason: string) => {
    // In a real app, you would call an API to cancel the application
    console.log(`Canceling application ${id} with reason: ${reason}`)

    toast({
      title: "Aplicação cancelada",
      description: "A aplicação foi cancelada com sucesso.",
    })

    router.push("/admin/applications")
  }

  // Render action buttons based on application status
  const renderActionButtons = () => {
    switch (applicationStatus) {
      case "pending":
        return (
          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() => setIsRejectDialogOpen(true)}
            >
              Reprovar
            </Button>
            <Button onClick={() => setIsApproveDialogOpen(true)}>
              Aprovar
            </Button>
          </div>
        )
      case "approved":
        return (
          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() => setIsSuspendDialogOpen(true)}
            >
              Suspender aplicação
            </Button>
            <Button onClick={() => setIsCancelDialogOpen(true)}>
              Cancelar aplicação
            </Button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <BackButton onClick={handleBack} />
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-6">Detalhes da aplicação</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm text-system-10">Nome</h3>
              <p className="font-medium">{application.businessName}</p>
            </div>

            <div>
              <h3 className="text-sm text-system-10">Data da aplicação</h3>
              <p className="font-medium">{application.date}</p>
            </div>

            <div>
              <h3 className="text-sm text-system-10">Tipo de provedor</h3>
              <p className="font-medium">{application.providerType}</p>
            </div>

            <div>
              <h3 className="text-sm text-system-10">NUIT</h3>
              <p className="font-medium">{application.nuit}</p>
            </div>

            <div>
              <h3 className="text-sm text-system-10">Plano</h3>
              <p className="font-medium">{application.plan}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm text-system-10">Endereço</h3>
              <p className="font-medium">{application.address}</p>
            </div>

            <div>
              <h3 className="text-sm text-system-10">Contato</h3>
              <p className="font-medium">{application.contact.email}</p>
              <p className="font-medium">{application.contact.phone}</p>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Documentos enviados</h3>
            <Button
              variant="link"
              size="sm"
              className="text-red-500 text-xs p-0 h-auto"
              onClick={() => setIsRequestDocumentDialogOpen(true)}
            >
              Solicitar documento adicional
            </Button>
          </div>

          <div className="space-y-4">
            <DocumentList
              documents={(application?.documents as Document[]) || []}
            />
          </div>
        </div>
      </Card>

      {renderActionButtons()}

      {/* Dialogs for pending applications */}
      <RejectApplicationDialog
        open={isRejectDialogOpen}
        onOpenChange={setIsRejectDialogOpen}
        onConfirm={handleRejectApplication}
        businessName={application.businessName}
      />

      <ApproveApplicationDialog
        open={isApproveDialogOpen}
        onOpenChange={setIsApproveDialogOpen}
        onConfirm={handleApproveApplication}
        businessName={application.businessName}
      />

      {/* Dialog for requesting additional documents (available for all statuses) */}
      <RequestDocumentDialog
        open={isRequestDocumentDialogOpen}
        onOpenChange={setIsRequestDocumentDialogOpen}
        onSubmit={handleRequestDocuments}
        businessName={application.businessName}
      />

      {/* Dialogs for approved applications */}
      <SuspendApplicationDialog
        open={isSuspendDialogOpen}
        onOpenChange={setIsSuspendDialogOpen}
        onConfirm={handleSuspendApplication}
        businessName={application.businessName}
      />

      <CancelApplicationDialog
        open={isCancelDialogOpen}
        onOpenChange={setIsCancelDialogOpen}
        onConfirm={handleCancelApplication}
        businessName={application.businessName}
      />
    </div>
  )
}
