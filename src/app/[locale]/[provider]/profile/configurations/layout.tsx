"use client"

import { BackButton } from "@/components/common"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMobile } from "@/hooks/use-mobile"
import { getActiveTabFromPath } from "@/lib/utils"
import { TabItemType } from "@/types"
import { ChevronRightIcon, CircleDollarSignIcon, FolderIcon, ReceiptIcon, UserRoundIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import { useRouter } from "nextjs-toploader/app"
import { useEffect, useState } from "react"

const enum ConfigurationTabOptions {
  DataRegistration = "Dados cadastrais",
  Documents = "Ficheiros",
  PaymentDetails = "Dados de pagamento",
  Signature = "Minha assinatura",
}

const tabItems: TabItemType<ConfigurationTabOptions>[] = [
  {
    value: ConfigurationTabOptions.DataRegistration,
    icon: <UserRoundIcon />,
    label: "Dados Cadastrais",
    href: "/professional/profile/configurations/personal",
  },
  {
    value: ConfigurationTabOptions.Documents,
    icon: <FolderIcon />,
    label: "Ficheiros",
    href: "/professional/profile/configurations/files",
  },
  {
    value: ConfigurationTabOptions.PaymentDetails,
    icon: <CircleDollarSignIcon />,
    label: "Dados de pagamento",
    href: "/professional/profile/configurations/payment-details",
  },
  {
    value: ConfigurationTabOptions.Signature,
    icon: <ReceiptIcon />,
    label: "Minha assinatura",
    href: "/professional/profile/configurations/signature",
  },
]

export default function ProfileConfigurationsLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<ConfigurationTabOptions>(ConfigurationTabOptions.DataRegistration)
  const isMobile = useMobile()
  const tabOrientation = isMobile ? "horizontal" : "vertical"

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
        <BackButton text="Configurações" onClick={() => router.push("/professional/profile")} />
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
