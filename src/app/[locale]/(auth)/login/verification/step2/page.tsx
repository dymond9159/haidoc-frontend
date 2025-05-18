"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "nextjs-toploader/app"
import { useEffect, useState } from "react"

export default function VerificationStep2() {
  const router = useRouter()
  const [method, setMethod] = useState<"email" | "sms" | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Get the verification method from sessionStorage
    const storedMethod = sessionStorage.getItem("verificationMethod") as "email" | "sms" | null
    setMethod(storedMethod)
  }, [])

  const handleNext = () => {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      router.push("/login/verification/step3")
    }, 500)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        {method === "email" ? (
          <p className="text-md text-system-12">
            Enviamos um código de autenticação para o seu e-mail cadastrado. Por favor, verifique a sua caixa de entrada
            e a pasta de spam, se necessário.
          </p>
        ) : method === "sms" ? (
          <p className="text-md text-system-12">
            Enviamos um código de autenticação para o seu número cadastrado. Por favor, verifique a sua caixa de entrada
            e a pasta de spam, se necessário.
          </p>
        ) : (
          <p className="text-md text-system-12">
            Enviamos um código de autenticação. Por favor, verifique a sua caixa de entrada.
          </p>
        )}
      </div>

      <Button className="w-full" onClick={handleNext} disabled={isLoading}>
        {isLoading ? "Carregando..." : "Próximo"}
      </Button>
    </div>
  )
}
