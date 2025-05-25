"use client"

import { BackButton } from "@/components/common"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMobile } from "@/hooks/use-mobile"
import { getActiveTabFromPath } from "@/lib/utils"
import { TabItemType } from "@/types"
import { ChevronRightIcon, CircleDollarSignIcon, FolderIcon, ReceiptIcon, UserRoundIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import { useRouter } from "nextjs-toploader/app"
import { useEffect, useState } from "react"

const enum ConfigurationTabOptions {
  DataRegistration = "Dados cadastrais",
  Documents = "Ficheiros",
  PaymentDetails = "Dados de pagamento",
  Signature = "Minha assinatura",
}

export default function ProfileConfigurationsLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const t = useTranslations("pages.provider.profile.configurations")

  const [activeTab, setActiveTab] = useState<ConfigurationTabOptions>(ConfigurationTabOptions.DataRegistration)
  const isMobile = useMobile()
  const tabOrientation = isMobile ? "horizontal" : "vertical"

  const tabItems: TabItemType<ConfigurationTabOptions>[] = [
    {
      value: ConfigurationTabOptions.DataRegistration,
      icon: <UserRoundIcon />,
      label: t("tabs.dataRegistration"),
      href: "/professional/profile/configurations/personal",
    },
    {
      value: ConfigurationTabOptions.Documents,
      icon: <FolderIcon />,
      label: t("tabs.documents"),
      href: "/professional/profile/configurations/files",
    },
    {
      value: ConfigurationTabOptions.PaymentDetails,
      icon: <CircleDollarSignIcon />,
      label: t("tabs.paymentDetails"),
      href: "/professional/profile/configurations/payment-details",
    },
    {
      value: ConfigurationTabOptions.Signature,
      icon: <ReceiptIcon />,
      label: t("tabs.signature"),
      href: "/professional/profile/configurations/signature",
    },
  ]

  const currentPath = usePathname()
  const initialTab = getActiveTabFromPath(tabItems, currentPath)

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab as ConfigurationTabOptions)
    }
  }, [initialTab])

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <BackButton text={t("cta.backButton")} onClick={() => router.push("/professional/profile")} />
      </div>
      <Tabs
        defaultValue={ConfigurationTabOptions.DataRegistration}
        value={activeTab}
        onValueChange={(value) => {
          setActiveTab(value as ConfigurationTabOptions)
          router.push(tabItems.find((tab) => tab.value === value)?.href || "")
        }}
        orientation={tabOrientation}
      >
        <TabsList variant="card" className="mb-3" orientation={tabOrientation}>
          {tabItems.map(({ value, icon, label }) => (
            <TabsTrigger key={value} value={value} className="w-full">
              <div className="w-full flex flex-row items-center justify-between gap-2">
                <div className="flex flex-row gap-2 items-center">
                  {icon}
                  <span>{label}</span>
                </div>
                {!isMobile && <ChevronRightIcon />}
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={activeTab}>
          <Card>{children}</Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
