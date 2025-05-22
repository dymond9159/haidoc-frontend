"use client"

import { BackButton } from "@/components/common"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"

export default function PaymentSummaryPage() {
  const router = useRouter()
  const { toast } = useToast()
  const t = useTranslations("pages.subscription")
  const tCta = useTranslations("cta")

  const handleNext = () => {
    toast({
      title: "Success",
      description: t("success"),
      variant: "default",
    })

    // Redirect to home page after successful payment
    setTimeout(() => {
      router.push("/professional")
    }, 1500)
  }

  return (
    <div>
      <BackButton text={t("review")} />

      <Card className="mt-4 border-0 p-0 sm:border-1 sm:p-6">
        <CardContent>
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-medium text-gray-500">{t("selectedPlan")}</h2>
              <p className="text-lg font-medium text-secondary">HaiDoc Business Plus</p>
            </div>

            <div>
              <h2 className="text-sm font-medium text-gray-500">{t("totalValue")}</h2>
              <p className="text-xl font-bold">90 MZN / Mês</p>
            </div>

            <div>
              <h2 className="text-sm font-medium text-gray-500">{t("paymentType")}</h2>
              <p className="text-base">{t("cardEnding", { lastDigits: "3228" })}</p>
            </div>

            <Button onClick={handleNext} className="w-full">
              {tCta("next")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
