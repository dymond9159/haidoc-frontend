import { Button } from "@/components/ui/button" // Assuming these are your UI components
import { cn } from "@/lib/utils"
import { PlanType, PlanTypeForPatient } from "@/types"
import { CheckCircle } from "lucide-react"
import { useTranslations } from "next-intl"
import React from "react"
import { Badge } from "../ui/badge"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Separator } from "../ui/separator"

interface FeatureItemProps {
  text: string
  type: string
}

export const FeatureItem: React.FC<FeatureItemProps> = ({ text, type }) => {
  return (
    <>
      {type === "freeServices" ? (
        <div className="flex flex-col items-start gap-2">
          <Separator />
          <span className="text-sm text-primary font-medium">{text}</span>
        </div>
      ) : (
        <div className="flex items-start gap-2">
          <CheckCircle className="flex-shrink-0 w-3 h-3 text-secondary-11 mt-1" />
          <span className="text-sm">{text}</span>
        </div>
      )}
    </>
  )
}

interface PlanCardProps {
  type: PlanType | PlanTypeForPatient
  featured?: string
  titleKey: string
  priceKey: string
  currencyKey?: string
  periodKey?: string
  featuresKeys: string[]
  ctaKey: string
  onContinue: () => void
  priceColor?: string // Optional prop for price color
}

export const PlanCard: React.FC<PlanCardProps> = ({
  type,
  featured = undefined,
  titleKey,
  priceKey,
  currencyKey,
  periodKey,
  featuresKeys,
  ctaKey,
  onContinue,
  priceColor = "text-foreground",
}) => {
  const t = useTranslations("pricing")

  return (
    <Card className="flex flex-col p-6 bg-white rounded-lg max-w-[320px] mx-auto md:w-full md:h-fit">
      <CardHeader className="mb-4 px-0">
        <h3 className="text-xl font-bold text-secondary mb-3">{t(titleKey)}</h3>
        {featured && <Badge className="w-fit text-xs">{t(featured)}</Badge>}
        {(type === PlanType.Business || type === PlanTypeForPatient.Individual) && (
          <div className={cn("mt-2 text-xl font-bold text-primary")}>{t(priceKey)}</div>
        )}
        {type !== PlanType.Business && type !== PlanTypeForPatient.Individual && (
          <div className={cn("mt-2 text-xl font-bold", priceColor)}>
            {t(priceKey)} <span className="text-md">{t(currencyKey || "")}</span>/
            <span className="text-sm">{t(periodKey || "")}</span>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-3 px-0">
        <div className="space-y-3">
          {featuresKeys.map((featureKey, index) => (
            <FeatureItem key={index} type={featureKey} text={t(featureKey)} />
          ))}
        </div>
        <div className="mt-auto pt-6">
          <Button onClick={onContinue} className="w-full">
            {t(ctaKey)}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
