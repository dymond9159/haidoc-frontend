"use client"

import type React from "react"

import { Asterisk } from "@/components/common"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PhoneInput } from "@/components/ui/phone-input"
import { Separator } from "@/components/ui/separator"
import { useTranslations } from "next-intl"
import { useRouter } from "nextjs-toploader/app"
import { useState } from "react"

export default function VerificationStep1() {
  const router = useRouter()
  const t = useTranslations("auth.login")
  const tForm = useTranslations("form")
  const tCta = useTranslations("cta")
  const [method, setMethod] = useState<"email" | "sms" | null>(null)
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!method) return

    setIsLoading(true)

    // In a real app, you would send a verification code here
    // For now, we'll just simulate sending a code
    setTimeout(() => {
      setIsLoading(false)
      // Store the selected method in sessionStorage to use in the next steps
      sessionStorage.setItem("verificationMethod", method)
      router.push("/login/verification/step2")
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-md text-system-12">{t("chooseMethod")}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            {tForm("label.email")} <Asterisk />
          </label>
          <Input
            id="email"
            type="email"
            placeholder={tForm("placeholder.email")}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setMethod("email")
            }}
            required={method === "email"}
            onClick={() => setMethod("email")}
          />
        </div>

        <div className="w-full flex flex-row gap-2 items-center">
          <Separator className="flex-grow !w-1/3" />
          <span className="mx-2 text-xs text-system-10">{t("or")}</span>
          <Separator className="flex-grow !w-1/3" />
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium">
            {tForm("label.sms")} <Asterisk />
          </label>
          <PhoneInput
            id="phone"
            placeholder={tForm("placeholder.phone")}
            value={phone}
            onChangeNumber={(value) => {
              setPhone(value)
              setMethod("sms")
            }}
            required={method === "sms"}
            onClick={() => setMethod("sms")}
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || !method || (method === "email" && !email) || (method === "sms" && !phone)}
        >
          {isLoading ? tCta("sending") : tCta("send")}
        </Button>
      </form>
    </div>
  )
}
