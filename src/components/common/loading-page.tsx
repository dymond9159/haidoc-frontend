"use client"

import { Loader2 } from "lucide-react"
import { useTranslations } from "next-intl"

interface LoadingProps {
  text?: string
}

export function Loading({ text }: LoadingProps) {
  const t = useTranslations("common")
  return (
    <div className="flex h-[calc(100vh-50px)] items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        <p>{text || t("loading")}</p>
      </div>
    </div>
  )
}
