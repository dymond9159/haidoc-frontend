"use client"

import type React from "react"

import { Asterisk } from "@/components/common"
import { Button } from "@/components/ui/button"
import { CodeInput } from "@/components/ui/code-input"
import { useRouter } from "nextjs-toploader/app"
import { useEffect, useState } from "react"

export default function VerificationStep3() {
  const router = useRouter()
  const [method, setMethod] = useState<"email" | "sms" | null>(null)
  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    // Get the verification method from sessionStorage
    const storedMethod = sessionStorage.getItem("verificationMethod") as "email" | "sms" | null
    setMethod(storedMethod)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate code format (3 letters + 3 numbers)
    const codeRegex = /^[A-Za-z]{3}\d{3}$/
    if (!codeRegex.test(code)) {
      setError("O código deve conter 3 letras seguidas de 3 números.")
      return
    }

    setIsLoading(true)

    // For demo purposes, we'll consider "ABC123" as the correct code
    // In a real app, you would validate the code against what was sent
    setTimeout(() => {
      setIsLoading(false)

      if (code === "ABC123") {
        router.push("/login/verification/success")
      } else {
        setError("O código digitado está incorreto.")
      }
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        {method === "email" ? (
          <p className="text-md text-system-12">Digite abaixo o código enviado para o seu e-mail.</p>
        ) : method === "sms" ? (
          <p className="text-md text-system-12">Digite abaixo o código enviado para o seu número de telefone.</p>
        ) : (
          <p className="text-md text-system-12">Digite abaixo o código enviado.</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="code" className="block text-sm font-medium">
            Código <Asterisk />
          </label>
          <CodeInput id="code" placeholder="Ex: ABC123" value={code} onChangeCode={setCode} required />
          {error && <p className="text-xs text-error-5">{error}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading || code.length !== 6}>
          {isLoading ? "Verificando..." : "Próximo"}
        </Button>
      </form>
    </div>
  )
}
