"use client"

import { useTranslations } from "next-intl"
import { useRouter } from "nextjs-toploader/app"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import Image from "next/image"

import { cn } from "@/lib/utils"

export function LoginBenefits() {
  const router = useRouter()
  const t = useTranslations("pages.auth.login.benefits")
  const tCta = useTranslations("cta")
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">("desktop")

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setScreenSize("mobile")
      } else if (window.innerWidth < 1024) {
        setScreenSize("tablet")
      } else {
        setScreenSize("desktop")
      }
    }

    // Initial check
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="bg-secondary-9 w-full h-full flex flex-col items-center justify-center">
      <div className={cn("flex w-full max-w-lg flex-col items-center justify-center px-6 py-15 text-white")}>
        <div className="relative w-full">
          <Image
            src={`/images/login-benifits-bg-${!["mobile", "tablet"].includes(screenSize) ? "desktop" : "mobile"}.png`}
            alt="Illustration showing the benefits of using HaiDoc"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            width={500}
            height={500}
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        <div className="w-full mt-15 px-5">
          <p className="max-w-sm text-xl font-normal">
            {t.rich("description", {
              bold: (chunks) => <b>{chunks}</b>,
            })}
          </p>
          <Button variant="white" className="mt-6" onClick={() => router.push("/plans")}>
            {tCta("knowMore")}
          </Button>
        </div>
      </div>
    </div>
  )
}
