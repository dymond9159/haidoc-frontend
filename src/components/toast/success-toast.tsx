"use client"

import { Toast, ToastClose, ToastDescription, ToastTitle } from "@/components/ui/toast"
import { CheckCircle } from "lucide-react"

interface SuccessToastProps {
  message: string
}

export function SuccessToast({ message }: SuccessToastProps) {
  return (
    <Toast>
      <div className="flex items-start gap-2">
        <CheckCircle className="h-5 w-5 text-green-500" />
        <div className="grid gap-1">
          <ToastTitle>Sucesso</ToastTitle>
          <ToastDescription>{message}</ToastDescription>
        </div>
      </div>
      <ToastClose />
    </Toast>
  )
}
