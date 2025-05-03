"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { useRouter } from "nextjs-toploader/app"

export default function VerificationSuccess() {
  const router = useRouter()

  const handleLogin = () => {
    // In a real app, you would set authentication tokens here
    router.push("/login")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <CheckCircle className="h-16 w-16 text-success-5" />
        <p className="text-center text-md text-system-12">
          Parabéns! Sua nova senha foi redefinida com sucesso. Por favor, faça login novamente.
        </p>
      </div>

      <Button className="w-full" onClick={handleLogin}>
        Login
      </Button>
    </div>
  )
}
