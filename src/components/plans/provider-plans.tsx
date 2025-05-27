import { useRoutes } from "@/hooks/use-localized-routes"
import { PlanListForProvider } from "@/lib/constants"
import { PlanType, ProviderOptions } from "@/types"
import { useTranslations } from "next-intl"
import { useRouter } from "nextjs-toploader/app"
import { PlanCard } from "../cards"

export const ProviderPlans = () => {
  const router = useRouter()
  const routes = useRoutes()

  const t = useTranslations("pricing.provider")

  const handleContinue = (type: PlanType) => {
    switch (type) {
      case PlanType.Business:
        const targetHome = ProviderOptions.Professional
        router.push(routes.providerHome(targetHome))
        break
      case PlanType.BusinessPlus:
        router.push(routes.subscription())
        break
      case PlanType.Company:
        router.push(routes.proposal())
        break
    }
  }
  return (
    <div className="space-y-0">
      <div className="h-[200px] md:h-[240px] py-10 px-2 md:px-10 bg-secondary-4 bg-[url(/images/haidoc-banner.svg)] bg-cover bg-center">
        <div className="relative z-10 text-center">
          <h1 className="mb-4 text-xl sm:text-2xl md:text-3xl font-bold">{t("pageTitle")}</h1>
          <p className="mx-auto max-w-2xl text-center font-medium">{t("pageDescription")}</p>
        </div>
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y md:grid-cols-3 md:divide-x md:divide-y gap-5 p-6 -mt-[50px] md:-mt-[95px]">
        {PlanListForProvider.map((plan, index) => (
          <PlanCard
            key={index}
            type={plan.type}
            titleKey={plan.titleKey}
            priceKey={plan.priceKey}
            featured={plan.featured}
            currencyKey={plan?.currency}
            periodKey={plan?.period}
            featuresKeys={plan.featuresKeys}
            ctaKey={plan.ctaKey}
            onContinue={() => handleContinue(plan.type)}
          />
        ))}
      </div>
    </div>
  )
}
