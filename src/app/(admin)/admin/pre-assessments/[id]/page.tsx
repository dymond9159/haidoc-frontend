"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { Loader2 } from "lucide-react"

import { ProblemReportDialog } from "@/components/admin/pre-assessments/problem-report-dialog"
import {
  BackButton,
  Loading,
  NotFoundDetails,
  StatusDropdown,
} from "@/components/common"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PatientStatusList } from "@/lib/constants"

import { useToast } from "@/hooks/use-toast"

import { mockPatient } from "@/lib/mock-data/patients"
import { PatientColumns, PatientStatus } from "@/types/admin"

export default function PatientDetailsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [patient, setPatient] = useState<PatientColumns | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isReportingProblem, setIsReportingProblem] = useState(false)
  const [isChangingStatus, setIsChangingStatus] = useState(false)

  const params = useParams<{ id: string }>()
  const id = params.id

  useEffect(() => {
    const fetchDeliveryDetails = async () => {
      setIsLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data based on ID
        setPatient(mockPatient)
      } catch (error) {
        console.log(error)
        toast?.({
          title: "Erro",
          description: "Não foi possível carregar os detalhes da entrega.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchDeliveryDetails()
  }, [id])

  const handleBack = () => {
    router.back()
  }

  const handleRefuse = () => {
    setIsReportingProblem(true)
  }

  const handleStatusChange = async (newStatus: PatientStatus) => {
    if (!patient) return

    setIsChangingStatus(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const updatedItem = {
        ...patient,
        status: newStatus,
      }

      setPatient(updatedItem)

      toast({
        title: "Status atualizado",
        description: `Entrega #${patient.id} atualizada para "${newStatus}"`,
      })
    } catch (error) {
      console.log(error)
      toast({
        title: "Erro ao atualizar status",
        description: "Ocorreu um erro ao atualizar o status da entrega.",
      })
    } finally {
      setIsChangingStatus(false)
    }
  }

  const handleConfirm = async () => {
    if (!patient) return

    setIsChangingStatus(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const updatedItem = {
        ...patient,
        status: PatientStatus.Completed,
      }

      setPatient(updatedItem)

      // Show success message
      toast({
        title: "Sucesso",
        description: `Pré-avaliação confirmada! O paciente será notificado.`,
      })

      // Hide success message after 3 seconds
      setTimeout(() => {
        // Navigate back after showing success
        router.push("/admin/pre-assessments")
      }, 3000)
    } catch (error) {
      console.log(error)
      toast({
        title: "Erro",
        description:
          "Ocorreu um erro ao confirmar a pré-avaliação. Tente novamente.",
      })
    } finally {
      setIsChangingStatus(false)
    }
  }

  if (isLoading) {
    return <Loading text="Carregando detalhes da pré-avaliação..." />
  }

  if (!patient) {
    return <NotFoundDetails />
  }

  return (
    <div className="space-y-6">
      <BackButton onClick={handleBack} />
      <div className="max-w-xl mx-auto">
        <Card className="space-y-0">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Solicitação {id}</h2>
          </div>

          <div className="space-y-6">
            <section>
              <h3 className="font-medium">Informações da solicitação</h3>
              <div className="mt-2 space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground">ID do pedido</p>
                  <p className="text-sm">{patient.id}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Profissional de saúde responsável
                  </p>
                  <p className="text-sm">{"Mário Santana Abreu"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Data da pedido
                  </p>
                  <p className="text-sm">{patient.date}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <div className="mt-1">
                    <StatusDropdown
                      status={patient.status as PatientStatus}
                      availableStatus={PatientStatusList}
                      onStatusChange={(newStatus) =>
                        handleStatusChange(newStatus)
                      }
                    />
                  </div>
                </div>
              </div>
            </section>
            <section>
              <h3 className="font-medium">Informações do paciente</h3>
              <div className="mt-2 space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground">
                    ID do paciente
                  </p>
                  <p className="text-sm">{patient.patientId}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Nome do paciente
                  </p>
                  <p className="text-sm">{patient.patientName}</p>
                </div>
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground">Plano</p>
                  <p className="text-sm">{patient.plan}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Endereço</p>
                  <p className="text-sm">{patient.patientAddress}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Número de telefone
                  </p>
                  <p className="text-sm">{patient.patientPhone}</p>
                </div>
              </div>
            </section>
          </div>
        </Card>
        <div className="flex justify-end space-x-4 mt-4">
          <Button variant="outline" onClick={handleRefuse}>
            Recusar
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isChangingStatus}
            className="bg-primary-9 text-white"
          >
            {isChangingStatus ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Confirmando...
              </>
            ) : (
              "Confirmar"
            )}
          </Button>
        </div>
      </div>

      <ProblemReportDialog
        open={isReportingProblem}
        onOpenChange={setIsReportingProblem}
        orderId={patient.id}
      />
    </div>
  )
}
