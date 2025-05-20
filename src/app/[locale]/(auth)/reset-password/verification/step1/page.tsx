"use client"

import type React from "react"

import { Asterisk } from "@/components/common"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PhoneInput } from "@/components/ui/phone-input"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "nextjs-toploader/app"
import { useState } from "react"

export default function VerificationStep1() {
  const router = useRouter()
  const [method, setMethod] = useState<"email" | "sms" | null>(null)
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!method) return

    setIsLoading(true)

    // In a real app, you would send a verification code here
    // For now, we'll just simulate sending a code
    setTimeout(() => {
      setIsLoading(false)
      // Store the selected method in sessionStorage to use in the next steps
      sessionStorage.setItem("verificationMethod", method)
      router.push("/reset-password/verification/step2")
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-md text-system-12">
          Para alterar sua senha, por favor efetue a autenticação de seus dados. Escolha por qual meio deseja receber o
          código.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            E-mail <Asterisk />
          </label>
          <Input
            id="email"
            type="email"
            placeholder="mail.example@gmail.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setMethod("email")
            }}
            required={method === "email"}
            onClick={() => setMethod("email")}
          />
        </div>

        <div className="w-full flex flex-row gap-2 items-center">
          <Separator className="flex-grow !w-1/3" />
          <span className="mx-2 text-xs text-system-10">ou</span>
          <Separator className="flex-grow !w-1/3" />
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium">
            SMS <Asterisk />
          </label>
          <PhoneInput
            id="phone"
            placeholder="Ex: +55 (71) 99999-9999"
            value={phone}
            onChangeNumber={(value) => {
              setPhone(value)
              setMethod("sms")
            }}
            required={method === "sms"}
            onClick={() => setMethod("sms")}
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || !method || (method === "email" && !email) || (method === "sms" && !phone)}
        >
          {isLoading ? "Enviando..." : "Enviar"}
        </Button>
      </form>
    </div>
  )
}
