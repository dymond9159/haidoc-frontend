"use client"

import { Asterisk, TermsAndConditions } from "@/components/common"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PaymentMethodDetails } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

export type PaymentMethodFormValues = Omit<PaymentMethodDetails, "id" | "paymentMethod" | "brand"> & {
  termsAccepted: boolean
  cvv: string
  email: string
}

const paymentMethodSchema = z.object({
  cardName: z.string().min(1, "Nome do titular é obrigatório"),
  cardNumber: z
    .string()
    .min(13, "Número do cartão inválido") // Basic length check
    .max(19, "Número do cartão inválido")
    .regex(/^\d+$/, "Número do cartão deve conter apenas dígitos"),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Data de validade inválida (MM/AA)"),
  cvv: z.string().min(3, "CVV inválido").max(4, "CVV inválido").regex(/^\d+$/, "CVV deve conter apenas dígitos"),
  email: z.string().email("E-mail inválido").min(1, "E-mail é obrigatório"),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "Você deve aceitar os termos de uso.",
  }),
})

interface PaymentMethodFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: PaymentMethodFormValues, id?: string) => void
  initialData?: PaymentMethodDetails | null
  mode: "add" | "edit"
}

export function PaymentMethodFormModal({ isOpen, onClose, onSubmit, initialData, mode }: PaymentMethodFormModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PaymentMethodFormValues>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      email: "",
      termsAccepted: false,
    },
  })

  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && initialData) {
        reset({
          cardName: initialData.cardName,
          cardNumber: initialData.cardName,
          expiryDate: initialData.expiryDate || "",
          cvv: initialData.cvv || "",
          email: initialData.email || "",
          termsAccepted: false,
        })
      } else {
        reset({
          cardName: "",
          cardNumber: "",
          expiryDate: "",
          cvv: "",
          email: "",
          termsAccepted: false,
        })
      }
    }
  }, [isOpen, mode, initialData, reset])

  const handleFormSubmit = (data: PaymentMethodFormValues) => {
    console.log(data)
    onSubmit(data, initialData?.id)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Cadastrar Novo Método de Pagamento" : "Editar Método de Pagamento"}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 py-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2 md:col-span-3">
              <Label htmlFor="cardName">
                Nome no cartão
                <Asterisk />
              </Label>
              <Input id="cardName" {...register("cardName")} placeholder="Seu nome como aparece no cartão" />
              {errors.cardName && <p className="text-xs text-destructive mt-1">{errors.cardName.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="cardNumber">
                Número do cartão
                <Asterisk />
              </Label>
              <Input id="cardNumber" {...register("cardNumber")} placeholder="**** **** **** ****" />
              {errors.cardNumber && <p className="text-xs text-destructive mt-1">{errors.cardNumber.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiryDate">
                Data de validade
                <Asterisk />
              </Label>
              <Input id="expiryDate" {...register("expiryDate")} placeholder="MM/AA" />
              {errors.expiryDate && <p className="text-xs text-destructive mt-1">{errors.expiryDate.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">
                CVV
                <Asterisk />
              </Label>
              <Input id="cvv" {...register("cvv")} placeholder="123" type="password" />
              {errors.cvv && <p className="text-xs text-destructive mt-1">{errors.cvv.message}</p>}
            </div>
            <div className="space-y-2 md:col-span-3">
              <Label htmlFor="email">
                E-mail
                <Asterisk />
              </Label>
              <Input id="email" {...register("email")} placeholder="email@example.com" type="email" />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
            </div>
          </div>

          <p className="text-xs text-foreground">
            Sua assinatura será renovada automaticamente, você tem este metodo de pagamento recorrente.
          </p>
          {mode === "add" && <TermsAndConditions {...register("termsAccepted")} />}

          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? mode === "add"
                  ? "Salvando..."
                  : "Atualizando..."
                : mode === "add"
                  ? "Adicionar Cartão"
                  : "Salvar Alterações"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
