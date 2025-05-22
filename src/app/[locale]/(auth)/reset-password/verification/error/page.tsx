"use client"

import { Button } from "@/components/ui/button"
import { XCircle } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRouter } from "nextjs-toploader/app"

export default function VerificationError() {
  const router = useRouter()
  const t = useTranslations("pages.auth.forgotPassword.verification")
  const tCta = useTranslations("cta")

  const handleTryAgain = () => {
    router.push("/reset-password/verification/step1")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <XCircle className="h-16 w-16 text-error-5" />
        <p className="text-center text-sm text-system-12">{t("failed")}</p>
      </div>

      <Button className="w-full" onClick={handleTryAgain}>
        {tCta("tryAgain")}
      </Button>
    </div>
  )
}
