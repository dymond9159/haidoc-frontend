"use client"

import { CheckCircle } from "lucide-react"
import { useRouter } from "nextjs-toploader/app"

import { Button } from "@/components/ui/button"

export default function RegisterProviderSuccess() {
  const router = useRouter()

  const handleAccess = () => {
    // In a real app, you would set authentication tokens here
    router.push("/professional")
  }

  return (
    <div className="space-y-6 flex flex-col items-center justify-center h-full mt-5">
      <div className="flex flex-col items-center space-y-4">
        <CheckCircle className="h-16 w-16 text-success-5" />
        <h2 className="text-xl font-semibold text-system-13">Cadastro concluído com sucesso!</h2>
        <p className="text-center text-md text-system-12 max-w-md">
          Parabéns! Seu cadastro como prestador de serviços foi concluído com sucesso. Agora você pode acessar todas as
          funcionalidades da plataforma.
        </p>
      </div>

      <Button className="w-1/3" onClick={handleAccess}>
        Acessar
      </Button>
    </div>
  )
}
