"use client"

import { LoginBenefits, LoginForm } from "@/components/auth"
import { Card } from "@/components/ui/card"

export default function LoginPage() {
  return (
    <div className="w-full h-screen overflow-y-auto">
      <div className="flex w-full h-full flex-col items-center md:flex-row">
        <div className="flex-1 w-full h-full md:w-1/2 flex justify-center items-center md:px-10">
          <Card className="w-full p-4 py-15 sm:p-8 sm:py-8 max-w-sm border-0 md:max-w-md md:rounded-lg md:border-1 md:shadow-sm">
            <LoginForm />
          </Card>
        </div>
        <div className="w-full h-full md:w-1/2">
          <LoginBenefits />
        </div>
      </div>
    </div>
  )
}
