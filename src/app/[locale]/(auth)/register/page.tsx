"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRoutes } from "@/hooks/use-localized-routes"
import { AccountType } from "@/types"
import { BriefcaseMedicalIcon, CircleUserRoundIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useRouter } from "nextjs-toploader/app"
import { useState } from "react"

export default function RegisterPage() {
  const router = useRouter()
  const routes = useRoutes()
  const t = useTranslations("pages.auth.register")
  const tCta = useTranslations("cta")

  const [selectedType, setSelectedType] = useState<AccountType>(AccountType.Patient)

  const handleNext = () => {
    router.push(routes.basicData(selectedType))
  }

  return (
    <div>
      <h2 className="text-lg font-medium mb-2">{t("chooseAccountType")}</h2>
      <div className="space-y-3 mb-6">
        <Tabs defaultValue={AccountType.Patient} onValueChange={(value) => setSelectedType(value as AccountType)}>
          <TabsList className="bg-transparent w-full h-full py-4 flex flex-col gap-4">
            <TabsTrigger value={AccountType.Patient} variant="button" size="xl" className="w-full">
              <CircleUserRoundIcon />
              {t("patientFor")}
            </TabsTrigger>
            <TabsTrigger value={AccountType.Provider} variant="button" size="xl" className="w-full">
              <BriefcaseMedicalIcon />
              {t("providerFor")}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Button
        onClick={handleNext}
        disabled={!selectedType}
        className="w-full bg-primary-9 hover:bg-primary-10 text-white"
      >
        {tCta("next")}
      </Button>

      <div className="text-center mt-4 text-sm">
        {t("alreadyHaveAccount")}{" "}
        <Link href="/login" className="text-secondary-11 hover:text-secondary-10 font-medium">
          {t("loginHere")}
        </Link>
      </div>
    </div>
  )
}
