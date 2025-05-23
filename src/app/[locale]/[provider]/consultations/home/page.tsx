"use client"

import { Chatbot } from "@/components/provider/chat/chatbot"
import { ConsultationFeatureBar } from "@/components/provider/consultation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useMobile } from "@/hooks/use-mobile"
import { LucideCheckCircle2, MapPin } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useState } from "react"

export default function ConsultaDomicilioPage() {
  const isMobile = useMobile()
  const t = useTranslations("pages.provider.consultation.consultationHome")
  const tCta = useTranslations("cta")

  const [isFeatureBarOpen, setIsFeatureBarOpen] = useState(false)

  return (
    <div className="space-y-8">
      <div className="flex flex-row gap-6">
        <div className="flex-1">
          <Card className="gap-6">
            <Alert variant="info">
              <div>
                <AlertTitle className="flex items-center gap-2">
                  <LucideCheckCircle2 className="h-6 w-6" fill="var(--info-5)" color="white" />
                  {t("alert.title")}
                </AlertTitle>
                <AlertDescription>{t("alert.description")}</AlertDescription>
              </div>
            </Alert>

            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border">
                <AvatarImage src="/images/placeholder.svg?height=64&width=64" alt="Nome do Paciente" />
                <AvatarFallback>NP</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-medium">Nome do Paciente</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 gap-2">
                <h3 className="text-sm  mb-1">{t("label.day")}</h3>
                <p className="text-base font-medium">03 Setembro, 2024</p>
              </Card>
              <Card className="p-4 gap-2">
                <h3 className="text-sm  mb-1">{t("label.hour")}</h3>
                <p className="text-base font-medium">09:00 - 10:00</p>
              </Card>
            </div>

            <div>
              <h3 className="text-sm  mb-1">{t("label.address")}</h3>
              <Link
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-secondary"
              >
                <MapPin className="h-4 w-4" />
                Rua do Dão, nº49, 2º Andar, Bairro Central
              </Link>
            </div>

            <div>
              <h3 className="text-sm  mb-1">{t("label.contact")}</h3>
              <p className="text-base flex items-center gap-1">+258 00 00 0000</p>
            </div>
            <div className="flex justify-end gap-2">
              {isMobile && <Button onClick={() => setIsFeatureBarOpen(true)}>{tCta("viewDetails")}</Button>}
              <Button variant="outline">{tCta("endConsultation")}</Button>
            </div>
          </Card>
        </div>
        <ConsultationFeatureBar isOpenFeatureBar={isFeatureBarOpen} onOpenFeatureBarChange={setIsFeatureBarOpen} />
        <Chatbot />
      </div>
    </div>
  )
}
