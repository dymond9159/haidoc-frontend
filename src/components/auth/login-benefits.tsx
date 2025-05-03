"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function LoginBenefits() {
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">(
    "desktop",
  )

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
      <div
        className={cn(
          "flex w-full max-w-lg flex-col items-center justify-center px-10 py-20 text-white",
        )}
      >
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
            Planos especialmente feitos para seu{" "}
            <span className="font-semibold">negócio</span> ou para sua{" "}
            <span className="font size-min">família</span>
          </p>

          <Button variant="white" className="mt-6">
            Quero saber mais
          </Button>
        </div>
      </div>
    </div>
  )
}
