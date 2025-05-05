"use client"

import { Check } from "lucide-react"
import { useRouter } from "nextjs-toploader/app"

import { PlanCard } from "@/components/cards"
import { PlanList } from "@/lib/constants"
import { PlanType } from "@/types/common"

export default function PlansPage() {
  const router = useRouter()

  const handleContinue = (type: PlanType) => {
    switch (type) {
      case PlanType.Business:
        router.push("/professional/home")
        break
      case PlanType.BusinessPlus:
        router.push("/subscription")
        break
      case PlanType.Company:
        router.push("/proposal")
        break
    }
  }

  return (
    <div className="space-y-0">
      {/* Header with background */}
      <div className="h-[200px] md:h-[240px] py-10 px-2 md:px-10 bg-secondary-4 bg-[url(/images/haidoc-banner.svg)] bg-cover bg-center">
        <div className="relative z-10 text-center">
          <h1 className="mb-4 text-3xl font-bold">Conheça Nossos Planos</h1>
          <p className="mx-auto max-w-2xl text-center font-medium">
            Explore soluções personalizadas para otimizar seus serviços e impulsionar seus negócios.
          </p>
        </div>
      </div>
      {/* Plans Grid */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y md:grid-cols-3 md:divide-x md:divide-y gap-5 p-6 -mt-[95px]">
        {PlanList.map((plan, index) => (
          <PlanCard
            key={index}
            title={plan.title}
            price={plan.price}
            features={plan.features}
            onContinue={() => handleContinue(plan.type)}
          />
        ))}
      </div>
    </div>
  )
}

// Simple feature item component for this page
function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 py-2">
      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50">
        <Check className="h-4 w-4 text-blue-500" />
      </div>
      <span className="text-sm text-gray-600">{text}</span>
    </div>
  )
}
