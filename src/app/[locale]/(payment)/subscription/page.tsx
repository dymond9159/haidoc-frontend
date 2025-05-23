"use client"

import { BackButton } from "@/components/common"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useState } from "react"

type RecurrenceOption = "monthly" | "semiannual" | "annual"

interface PriceOption {
  label: string
  value: RecurrenceOption
  price: number
  displayPrice: string
  period: string
}

export default function SubscriptionPage() {
  const router = useRouter()
  const [selectedOption, setSelectedOption] = useState<RecurrenceOption>("monthly")
  const t = useTranslations("pages.subscription")
  const tCta = useTranslations("cta")

  const priceOptions: PriceOption[] = [
    {
      label: t("recurrence.monthly"),
      value: "monthly",
      price: 1499,
      displayPrice: "1.499",
      period: t("recurrence.shortMonthly"),
    },
    {
      label: t("recurrence.semiannual"),
      value: "semiannual",
      price: 8000,
      displayPrice: "8.000",
      period: t("recurrence.shortSemiannual"),
    },
    {
      label: t("recurrence.annual"),
      value: "annual",
      price: 15200,
      displayPrice: "15.200",
      period: t("recurrence.shortAnnual"),
    },
  ]

  const selectedPrice = priceOptions.find((option) => option.value === selectedOption)

  const handleNext = () => {
    router.push("/subscription/payment-method")
  }

  return (
    <div>
      <BackButton text={t("chooseRecurrence")} />

      <Card className="mt-4 border-0 p-0 sm:border-1 sm:p-6">
        <CardContent>
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-medium text-gray-500">{t("selectedPlan")}</h2>
              <p className="text-lg font-medium text-secondary">HaiDoc Business Plus</p>
            </div>

            <div>
              <h2 className="text-sm font-medium text-gray-500">{t("totalValue")}</h2>
              <p className="text-xl font-bold">
                {selectedPrice?.displayPrice} {t("currency")}/{selectedPrice?.period}
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-sm font-medium text-gray-500">{t("selectRecurrence")}</h2>
              <RadioGroup
                value={selectedOption}
                onValueChange={(value) => setSelectedOption(value as RecurrenceOption)}
                className="space-y-3"
              >
                {priceOptions.map((option) => (
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
