"use client"

import { BackButton } from "@/components/common"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { PaymentMethod } from "@/types"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface PaymentOption {
  label: string
  value: PaymentMethod
}

export default function PaymentMethodPage() {
  const router = useRouter()
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(PaymentMethod.Card)
  const t = useTranslations("pages.subscription")
  const tCta = useTranslations("cta")

  const paymentOptions: PaymentOption[] = [
    { label: t("paymentMethodOptions.card"), value: PaymentMethod.Card },
    { label: t("paymentMethodOptions.mpesa"), value: PaymentMethod.Mpesa },
    { label: t("paymentMethodOptions.emola"), value: PaymentMethod.Emola },
    { label: t("paymentMethodOptions.paypal"), value: PaymentMethod.Paypal },
  ]

  const handleNext = () => {
    if (selectedMethod === PaymentMethod.Card) {
      router.push("/subscription/pre-payment")
    } else {
      // Handle other payment methods
      router.push("/subscription/payment-summary")
    }
  }

  return (
    <div>
      <BackButton text={t("paymentMethod")} />

      <Card className="mt-4 border-0 p-0 sm:border-1 sm:p-6">
        <CardContent>
          <div className="space-y-6">
            <RadioGroup
              value={selectedMethod}
              onValueChange={(value) => setSelectedMethod(value as PaymentMethod)}
              className="space-y-3"
            >
              {paymentOptions.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center rounded-md border border-gray-200 bg-gray-50 px-4 py-3"
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer pl-2">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <Button onClick={handleNext} className="w-full">
              {tCta("next")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
