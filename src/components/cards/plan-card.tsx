import { Button } from "@/components/ui/button" // Assuming these are your UI components
import { cn } from "@/lib/utils"
import { CheckCircle } from "lucide-react"
import { useTranslations } from "next-intl"
import React from "react"
import { Badge } from "../ui/badge"
import { Card, CardContent, CardHeader } from "../ui/card"

interface FeatureItemProps {
  text: string
}

export const FeatureItem: React.FC<FeatureItemProps> = ({ text }) => {
  return (
    <div className="flex items-start gap-2">
      <CheckCircle className="flex-shrink-0 w-3 h-3 text-secondary-11 mt-1" />
      <span className="text-sm">{text}</span>
    </div>
  )
}

interface PlanCardProps {
  titleKey: string
  priceKey: string
  currencyKey?: string
  periodKey?: string
  featuresKeys: string[]
  onContinue: () => void
  priceColor?: string // Optional prop for price color
}

export const PlanCard: React.FC<PlanCardProps> = ({
  titleKey,
  priceKey,
  currencyKey,
  periodKey,
  featuresKeys,
  onContinue,
  priceColor = "text-foreground",
}) => {
  const t = useTranslations()
  const tCta = useTranslations("cta")
  return (
    <Card className="flex flex-col p-6 bg-white rounded-lg max-w-[320px] mx-auto md:w-full md:h-fit">
      <CardHeader className="mb-4 px-0">
        <h3 className="text-xl font-bold text-secondary mb-3">{t(titleKey)}</h3>
        {t(priceKey) !== t("pages.plans.free") && <Badge className="w-fit text-xs">{t("pages.plans.featured")}</Badge>}
        {t(priceKey) === t("pages.plans.free") && (
          <div className={cn("mt-2 text-xl font-bold text-primary")}>{t("pages.plans.free")}</div>
        )}
        {t(priceKey) !== t("pages.plans.free") && (
          <div className={cn("mt-2 text-xl font-bold", priceColor)}>
            {t(priceKey)} <span className="text-md">{t(currencyKey || "")}</span>/
            <span className="text-sm">{t(periodKey || "")}</span>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-3 px-0">
        <div className="space-y-3">
          {featuresKeys.map((featureKey, index) => (
            <FeatureItem key={index} text={t(featureKey)} />
          ))}
        </div>
        <div className="mt-auto pt-6">
          <Button onClick={onContinue} className="w-full">
            {tCta("continue")}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
