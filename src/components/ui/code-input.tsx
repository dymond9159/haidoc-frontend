"use client"

import type * as React from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface CodeInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChangeCode: (value: string) => void
}

export function CodeInput({
  className,
  onChangeCode,
  ...props
}: CodeInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only letters and numbers
    let value = e.target.value.replace(/[^A-Za-z0-9]/g, "").toUpperCase()

    // Limit to 6 characters
    if (value.length > 6) {
      value = value.substring(0, 6)
    }

    onChangeCode(value)
  }

  return (
    <Input
      className={cn("font-mono tracking-wider uppercase", className)}
      onChange={handleChange}
      maxLength={6}
      {...props}
    />
  )
}
