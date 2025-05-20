"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "nextjs-toploader/app"
import { useState } from "react"

export default function ForgotPassword() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // In a real app, you would send a password reset email here
    setTimeout(() => {
      setIsLoading(false)
      setSubmitted(true)
    }, 1000)
  }

  return (
    <div className="w-full space-y-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-system-13">Esqueci minha senha</h2>

        {submitted ? (
          <div className="space-y-4">
            <p className="text-sm text-system-12">
              Enviamos um e-mail com instruções para redefinir sua senha. Por favor, verifique sua caixa de entrada.
            </p>

            <Button onClick={() => router.push("/login")} className="w-full bg-primary-9 hover:bg-primary-10">
              Voltar para o Login
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm text-system-12">
                Digite seu e-mail abaixo e enviaremos instruções para redefinir sua senha.
              </p>

              <label htmlFor="email" className="block text-sm font-medium">
                E-mail
                <Asterisk />
              </label>
              <Input
                id="email"
                type="email"
                placeholder="mail.example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full bg-primary-9 hover:bg-primary-10" disabled={isLoading}>
              {isLoading ? "Enviando..." : "Enviar instruções"}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
