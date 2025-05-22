"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRouter } from "nextjs-toploader/app"

export default function VerificationSuccess() {
  const router = useRouter()
  const t = useTranslations("auth.forgotPassword.verification")
  const tCta = useTranslations("cta")

  const handleLogin = () => {
    // In a real app, you would set authentication tokens here
    router.push("/login")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <CheckCircle className="h-16 w-16 text-success-5" />
        <p className="text-center text-md text-system-12">{t("success")}</p>
      </div>

      <Button className="w-full" onClick={handleLogin}>
        {tCta("login")}
      </Button>
    </div>
  )
}
