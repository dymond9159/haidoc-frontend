"use client"

import { BackButton } from "@/components/common"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function PaymentSummaryPage() {
  const router = useRouter()
  const { toast } = useToast()

  const handleNext = () => {
    toast({
      title: "Success",
      description: "Seu cadastro e pagamento foram concluídos!",
      variant: "default",
    })

    // Redirect to home page after successful payment
    setTimeout(() => {
      router.push("/professional")
    }, 1500)
  }

  return (
    <div>
      <BackButton text="Revisão" />

      <Card className="mt-4 border-0 p-0 sm:border-1 sm:p-6">
        <CardContent>
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-medium text-gray-500">Plano escolhido</h2>
              <p className="text-lg font-medium text-secondary">HaiDoc Business Plus</p>
            </div>

            <div>
              <h2 className="text-sm font-medium text-gray-500">Valor total</h2>
              <p className="text-xl font-bold">90 MZN / Mês</p>
            </div>

            <div>
              <h2 className="text-sm font-medium text-gray-500">Forma de pagamento</h2>
              <p className="text-base">Cartão de crédito terminando em 3228</p>
            </div>

            <Button onClick={handleNext} className="w-full">
              Próximo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
