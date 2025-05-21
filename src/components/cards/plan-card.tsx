import { Button } from "@/components/ui/button" // Assuming these are your UI components
import { cn } from "@/lib/utils"
import { CheckCircle } from "lucide-react"
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
  title: string
  price: string
  features: string[]
  onContinue: () => void
  priceColor?: string // Optional prop for price color
}

export const PlanCard: React.FC<PlanCardProps> = ({
  title,
  price,
  features,
  onContinue,
  priceColor = "text-foreground",
}) => {
  return (
    <Card className="flex flex-col p-6 bg-white rounded-lg max-w-[320px] mx-auto md:w-full md:h-fit">
      <CardHeader className="mb-4 px-0">
        <h3 className="text-xl font-bold text-secondary mb-3">{title}</h3>
        {price !== "GRATUITO" && <Badge className="w-fit text-xs">{"EM DESTAQUE"}</Badge>}
        {price == "GRATUITO" && <div className={cn("mt-2 text-xl font-bold text-primary")}>{"GRATUITO"}</div>}
        {price !== "GRATUITO" && <div className={cn("mt-2 text-xl font-bold", priceColor)}>{price}</div>}
      </CardHeader>
      <CardContent className="space-y-3 px-0">
        <div className="space-y-3">
          {features.map((feature, index) => (
            <FeatureItem key={index} text={feature} />
          ))}
        </div>

        <div className="mt-auto pt-6">
          <Button onClick={onContinue} className="w-full">
            Continuar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
