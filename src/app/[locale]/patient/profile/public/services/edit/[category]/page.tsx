"use client"

import { ServiceCategoryCard } from "@/components/cards/service-category-card"
import { Asterisk, BackButton } from "@/components/common"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { useRouter } from "nextjs-toploader/app"
import { useState } from "react"

enum ServiceTabOptions {
  OnlineConsultation = "teleconsulta",
  HomeConsultation = "domicilio",
}

export default function EditServiceCategoryPage() {
  const { toast } = useToast()
  const router = useRouter()
  const t = useTranslations("pages.provider.profile.public.services.edit")
  const tForm = useTranslations("form")
  const tCta = useTranslations("cta")

  const params = useParams()
  const [activeTab, setActiveTab] = useState<ServiceTabOptions>(ServiceTabOptions.OnlineConsultation)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [price, setPrice] = useState("100,00 MZN")

  const daysOfWeek = [
    {
      id: "1",
      name: tForm("category.weekDays.sunday"),
      value: "sunday",
      enabled: false,
      startTime: "00:00",
      endTime: "00:00",
    },
    {
      id: "2",
      name: tForm("category.weekDays.monday"),
      value: "monday",
      enabled: true,
      startTime: "00:00",
      endTime: "00:00",
    },
    {
      id: "3",
      name: tForm("category.weekDays.tuesday"),
      value: "tuesday",
      enabled: true,
      startTime: "00:00",
      endTime: "00:00",
    },
    {
      id: "4",
      name: tForm("category.weekDays.wednesday"),
      value: "wednesday",
      enabled: true,
      startTime: "00:00",
      endTime: "00:00",
    },
    {
      id: "5",
      name: tForm("category.weekDays.thursday"),
      value: "thursday",
      enabled: true,
      startTime: "00:00",
      endTime: "00:00",
    },
    {
      id: "6",
      name: tForm("category.weekDays.friday"),
      value: "friday",
      enabled: true,
      startTime: "00:00",
      endTime: "00:00",
    },
    {
      id: "7",
      name: tForm("category.weekDays.saturday"),
      value: "saturday",
      enabled: true,
      startTime: "00:00",
      endTime: "00:00",
    },
  ]

  // Days of week with availability settings
  const [days, setDays] = useState(daysOfWeek)

  const categoryName = decodeURIComponent(params.category as string)

  const handleSave = () => {
    toast({
      title: t("notification.success.title"),
      description: t("notification.success.description"),
      variant: "success",
    })
  }

  const handleCancel = () => {
    setIsConfirmDialogOpen(true)
  }

  const confirmCancel = () => {
    setIsConfirmDialogOpen(false)
    router.back()
    // Navigate back
  }

  const handleDayToggle = (dayId: string) => {
    setDays(
      days.map((day) => {
        if (day.id === dayId) {
          return { ...day, enabled: !day.enabled }
        }
        return day
      }),
    )
  }

  const handleTimeChange = (dayId: string, field: "startTime" | "endTime", value: string) => {
    setDays(
      days.map((day) => {
        if (day.id === dayId) {
          return { ...day, [field]: value }
        }
        return day
      }),
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <BackButton text={t("cta.backButton", { category: categoryName })} />
      </div>

      <div>
        <Tabs
          defaultValue={ServiceTabOptions.OnlineConsultation}
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as ServiceTabOptions)}
          className="w-full"
        >
          <TabsList className="mb-6 grid grid-cols-2">
            <TabsTrigger value={ServiceTabOptions.OnlineConsultation}>{t("tabs.teleconsulta")}</TabsTrigger>
            <TabsTrigger value={ServiceTabOptions.HomeConsultation}>{t("tabs.domicilio")}</TabsTrigger>
          </TabsList>

          <TabsContent value={ServiceTabOptions.OnlineConsultation} className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Switch id="allow-teleconsulta" defaultChecked />
                <Label htmlFor="allow-teleconsulta" className="ml-2">
                  {tForm("label.allowTeleconsulta")}
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="flex items-center">
                {tForm("label.priceOfConsultation")} <Asterisk />
              </Label>
              <Input
                id="price"
                value={price}
                placeholder={tForm("placeholder.priceOfConsultation", { currency: "MZN" })}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {days.map((day) => (
                <ServiceCategoryCard
                  key={day.id}
                  day={day}
                  onDayToggle={handleDayToggle}
                  onTimeChange={handleTimeChange}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value={ServiceTabOptions.HomeConsultation} className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Switch id="allow-teleconsulta" defaultChecked />
                <Label htmlFor="allow-teleconsulta" className="ml-2">
                  {tForm("label.allowHomeConsultation")}
                </Label>
              </div>
            </div>

            {/* Similar content for domicilio tab */}
            <div className="space-y-2">
              <Label htmlFor="price-domicilio" className="flex items-center">
                {tForm("label.priceOfConsultation")} <Asterisk />
              </Label>
              <Input
                id="price-domicilio"
                value={price}
                placeholder={tForm("placeholder.priceOfConsultation", { currency: "MZN" })}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {days.map((day) => (
                <ServiceCategoryCard
                  key={day.id}
                  day={day}
                  onDayToggle={handleDayToggle}
                  onTimeChange={handleTimeChange}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-end space-x-4">
          <Button variant="outline" onClick={handleCancel}>
            {tCta("cancel")}
          </Button>
          <Button onClick={handleSave} className="bg-red-500 hover:bg-red-600">
            {tCta("save")}
          </Button>
        </div>
      </div>

      <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("alertDialog.title")}</AlertDialogTitle>
            <AlertDialogDescription>{t("alertDialog.description")}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("alertDialog.cta.cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={confirmCancel}>{t("alertDialog.cta.confirm")}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
