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
import { Asterisk } from "@/components/common"

interface InactivePlanDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
  planId: string
}

export function InactivePlanDialog({
  open,
  onOpenChange,
  planId,
}: InactivePlanDialogProps) {
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { toast } = useToast()
  const maxCharacters = 5000

  const handleSubmit = async () => {
    if (!message.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira uma mensagem antes de prosseguir.",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log(planId)
      toast({
        title: "Sucesso",
        description: "Sua ação foi realizada com sucesso!",
      })

      setIsSubmitting(false)
      setMessage("")
      onOpenChange(false)
    } catch (error) {
      console.log(error)
      toast({
        title: "Erro",
        description: "Ocorreu um erro. Tente novamente.",
      })
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-6">
        <div className="">
          <DialogTitle>Você realmente deseja inativar este plano?</DialogTitle>
          <DialogDescription>
            O plano será movido para a seção Inativos e não ficará disponível
            para assinatura.
          </DialogDescription>
          <p className="mb-1 text-md font-semibold">
            Mensagem ao usuário <Asterisk />
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
                Inativando...
              </>
            ) : (
              "Inativar"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
