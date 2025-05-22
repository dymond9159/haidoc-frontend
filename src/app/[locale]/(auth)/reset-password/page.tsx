"use client"

import type React from "react"

import { Asterisk } from "@/components/common"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTranslations } from "next-intl"
import { useRouter } from "nextjs-toploader/app"
import { useState } from "react"

export default function ForgotPassword() {
  const t = useTranslations("auth.forgotPassword")
  const tForm = useTranslations("form")
  const tCta = useTranslations("cta")
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // In a real app, you would send a password reset email here
    setTimeout(() => {
      setIsLoading(false)
      setSubmitted(true)
    }, 1000)
  }

  return (
    <div className="w-full space-y-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-system-13">{t("title")}</h2>

        {submitted ? (
          <div className="space-y-4">
            <p className="text-sm text-system-12">{t("emailSent")}</p>

            <Button onClick={() => router.push("/login")} className="w-full bg-primary-9 hover:bg-primary-10">
              {tCta("backToLogin")}
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm text-system-12">{t("instructions")}</p>

              <label htmlFor="email" className="block text-sm font-medium">
                {tForm("label.email")} <Asterisk />
              </label>
              <Input
                id="email"
                type="email"
                placeholder={tForm("placeholder.email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full bg-primary-9 hover:bg-primary-10" disabled={isLoading}>
              {isLoading ? tCta("sending") : tCta("sendInstructions")}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
