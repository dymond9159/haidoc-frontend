"use client"

import { CheckCircle } from "lucide-react"
import { useRouter } from "nextjs-toploader/app"

import { Button } from "@/components/ui/button"
import { useRoutes } from "@/hooks/use-localized-routes"
import { AccountType } from "@/types"
import { useTranslations } from "next-intl"

export default function RegisterProviderSuccess() {
  const router = useRouter()
  const routes = useRoutes()
  const t = useTranslations("pages.auth.register.success")
  const tCta = useTranslations("cta")

  const handleAccess = () => {
    // In a real app, you would set authentication tokens here
    router.push(routes.plans(AccountType.Provider))
  }

  return (
    <div className="space-y-6 flex flex-col items-center justify-center h-full mt-5">
      <div className="flex flex-col items-center space-y-4">
        <CheckCircle className="h-16 w-16 text-success-5" />
        <h2 className="text-xl font-semibold text-system-13">{t("title")}</h2>
        <p className="text-center text-md text-system-12 max-w-md">
          {t.rich("desc", { bold: (chunks) => <span className="font-bold">{chunks}</span> })}
        </p>
      </div>

      <Button className="w-1/3" onClick={handleAccess}>
        {tCta("access")}
      </Button>
    </div>
  )
}
