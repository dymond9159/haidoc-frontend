"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { useRouter } from "nextjs-toploader/app"

export default function VerificationSuccess() {
  const router = useRouter()

  const handleAccess = () => {
    // In a real app, you would set authentication tokens here
    router.push("/professional")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <CheckCircle className="h-16 w-16 text-success-5" />
        <h2 className="text-xl font-semibold text-system-13">Autenticação</h2>
        <p className="text-center text-md text-system-12">Parabéns! Autenticação efetuada com sucesso!</p>
      </div>

      <Button className="w-full" onClick={handleAccess}>
        Acessar
      </Button>
    </div>
  )
}
