"use client"

import type * as React from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChangeNumber: (value: string) => void
}

export function PhoneInput({
  className,
  onChangeNumber,
  ...props
}: PhoneInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "")

    // Format the phone number as +XX (XX) XXXXX-XXXX
    if (value.length > 0) {
      // Country code
      if (value.length <= 2) {
        value = `+${value}`
      }
      // Country code and area code
      else if (value.length <= 4) {
        value = `+${value.substring(0, 2)} (${value.substring(2)})`
      }
      // Country code, area code, and first part of number
      else if (value.length <= 9) {
        value = `+${value.substring(0, 2)} (${value.substring(2, 4)}) ${value.substring(4)}`
      }
      // Complete number
      else {
        value = `+${value.substring(0, 2)} (${value.substring(2, 4)}) ${value.substring(4, 9)}-${value.substring(9, 13)}`
      }
    }

    onChangeNumber(value)
  }

  return (
    <Input
      type="tel"
      className={cn("", className)}
      onChange={handleChange}
      {...props}
    />
  )
}
