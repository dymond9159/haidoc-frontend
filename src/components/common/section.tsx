"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface SectionProps {
  className?: string
  children: React.ReactNode
}

export function Section({ className, children }: SectionProps) {
  return <div className={cn("section", className)}>{children}</div>
}
