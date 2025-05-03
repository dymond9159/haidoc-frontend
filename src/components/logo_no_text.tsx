"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { LogoNoTextIcon } from "./icons/hidoc-icons"

interface LogoProps {
  className?: string
  size?: "xs" | "sm" | "md" | "lg"
  href?: string
  onClick?: () => void
}

export function LogoNoText({
  className,
  size = "md",
  href = "/",
  onClick,
}: LogoProps) {
  const sizeClasses = {
    xs: "h-8",
    sm: "h-10",
    md: "h-13",
    lg: "h-14",
  }

  const LogoContent = (
    <div className={cn("flex items-center", className)}>
      <div className="relative flex items-center">
        <div className={cn("text-primary-9", sizeClasses[size])}>
          <LogoNoTextIcon className={cn(sizeClasses[size])} />
        </div>
      </div>
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="focus:outline-none">
        {LogoContent}
      </Link>
    )
  }

  return (
    <div
      onClick={onClick}
      className={cn("cursor-pointer", { "cursor-default": !onClick })}
    >
      {LogoContent}
    </div>
  )
}
