"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ProblemReportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
  orderId: string
}

export function ProblemReportDialog({
  open,
  onOpenChange,
  orderId,
}: ProblemReportDialogProps) {
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { toast } = useToast()
  const maxCharacters = 5000

  const handleSubmit = async () => {
    if (!message.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, informe o problema antes de enviar.",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Sucesso",
        description: "Problema reportado com sucesso!",
      })

      setIsSubmitting(false)
      setMessage("")
      onOpenChange(false)
    } catch (error) {
      console.log(error)
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao reportar o problema. Tente novamente.",
      })
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-6">
        <div className="">
          <DialogTitle>Reportar problema - {orderId}</DialogTitle>
          <DialogDescription>Informe o ocorrido</DialogDescription>
          <p className="mb-1 text-xs text-muted-foreground">
            Mensagem ao usuário <span>*</span>
          </p>
          <textarea
            className="min-h-[100px] w-full rounded-md border p-2 text-sm"
            placeholder="Digite aqui"
            value={message}
            onChange={(e) => {
              if (e.target.value.length <= maxCharacters) {
                setMessage(e.target.value)
              }
            }}
          ></textarea>
          <div className="text-right text-xs text-muted-foreground">
            {message.length}/{maxCharacters} caracteres
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              "Enviar"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
