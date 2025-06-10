"use client"

import { MetricCard } from "@/components/cards/metric-card"
import { BackButton } from "@/components/common"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMobile } from "@/hooks/use-mobile"
import { getActiveTabFromPath } from "@/lib/utils"
import { TabItemType } from "@/types"
import { BriefcaseMedicalIcon, ChevronRightIcon, Star, StethoscopeIcon, UserRoundIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import { useRouter } from "nextjs-toploader/app"
import { useEffect, useState } from "react"

export enum PublicProfileTabOptions {
  About = "Sobre",
  Services = "Serviços",
}

export default function PublicProfileLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const t = useTranslations("pages.provider.profile.public")

  const [activeTab, setActiveTab] = useState<PublicProfileTabOptions>(PublicProfileTabOptions.About)
  const isMobile = useMobile()
  const tabOrientation = isMobile ? "horizontal" : "vertical"

  const tabItems: TabItemType<PublicProfileTabOptions>[] = [
    {
      value: PublicProfileTabOptions.About,
      icon: <UserRoundIcon />,
      label: t("tabs.about"),
      href: "/professional/profile/public",
    },
    {
      value: PublicProfileTabOptions.Services,
      icon: <BriefcaseMedicalIcon />,
      label: t("tabs.services"),
      href: "/professional/profile/public/services",
    },
  ]

  const currentPath = usePathname()
  const initialTab = getActiveTabFromPath(tabItems, currentPath)

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab as PublicProfileTabOptions)
    }
  }, [initialTab])

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <BackButton text={t("cta.backButton")} />
      </div>
      <div className="relative h-25 mb-6 rounded-lg bg-secondary-9 bg-[url('/images/public-profile-banner.svg')] bg-center p-6"></div>
      <div className="relative px-6 -mt-12">
        <div className="space-y-4 flex flex-row gap-6 justify-between">
          <div className="flex flex-row gap-6 items-center">
            <div className="flex-shrink-0 h-24 w-24 relative">
              <Avatar className="w-full h-full rounded-full object-cover border-1 border-secondary-10">
                <AvatarImage src="/images/placeholder.svg?height=120&width=120" />
                <AvatarFallback>
                  <UserRoundIcon />
                </AvatarFallback>
              </Avatar>
              {/* <div className="absolute right-1 top-1 flex flex-col gap-1">
                <Button size="icon" variant="outline" className="h-7 w-7 rounded-full bg-white text-primary">
                  <Pencil className="h-3.5 w-3.5" />
                  <span className="sr-only">Substituir imagem</span>
                </Button>
              </div> */}
            </div>
            <div>
              <h3 className="text-lg font-medium">Dr. João da Silva</h3>
              <p className="text-sm text-gray-500">Cardiologista</p>
            </div>
          </div>
          <div className="mb-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              title="Consultas"
              reverse
              value={10}
              icon={<StethoscopeIcon />}
              className="border-secondary-9"
            />
            <MetricCard title="Avaliação" reverse value={5.0} icon={<Star />} className="border-secondary-9" />
          </div>
        </div>
      </div>
      <Tabs
        defaultValue={PublicProfileTabOptions.About}
        value={activeTab}
        onValueChange={(value) => {
          setActiveTab(value as PublicProfileTabOptions)
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
