"use client"

import { BackButton } from "@/components/common"
import { ConsultationHistoryTable, PatientProfile } from "@/components/provider/chat"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { useState } from "react"

export default function PatientProfilePage() {
  const params = useParams()
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false)
  const t = useTranslations("pages.provider.quickChat")

  return (
    <div className="h-full space-y-8">
      <div>
        <BackButton text={t("patientProfile")} />
      </div>
      <div>
        <PatientProfile patientId={params.id as string} />
        <div className="mt-8">
          <h2 className="text-lg font-medium mb-4">{t("consultationHistory")}</h2>
          <ConsultationHistoryTable />
        </div>
      </div>
    </div>
  )
}
