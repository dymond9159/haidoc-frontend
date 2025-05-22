"use client"

import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { useRouter } from "nextjs-toploader/app"
import { useEffect, useState } from "react"

export default function VerificationStep2() {
  const router = useRouter()
  const t = useTranslations("auth.forgotPassword.verification")
  const tCta = useTranslations("cta")
  const [method, setMethod] = useState<"email" | "sms" | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Get the verification method from sessionStorage
    const storedMethod = sessionStorage.getItem("verificationMethod") as "email" | "sms" | null
    setMethod(storedMethod)
  }, [])

  const handleNext = () => {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      router.push("/reset-password/verification/step3")
    }, 500)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        {method === "email" ? (
          <p className="text-md text-system-12">{t("codeSentEmail")}</p>
        ) : method === "sms" ? (
          <p className="text-md text-system-12">{t("codeSentSMS")}</p>
        ) : (
          <p className="text-md text-system-12">{t("codeSentGeneric")}</p>
        )}
      </div>

      <Button className="w-full" onClick={handleNext} disabled={isLoading}>
        {isLoading ? tCta("loading") : tCta("next")}
      </Button>
    </div>
  )
}
