"use client"

import { LoginBenefits, LoginForm } from "@/components/auth"

export default function LoginPage() {
  return (
    <div className="w-full h-screen overflow-y-auto">
      <div className="flex w-full h-full flex-col items-center md:flex-row">
        <div className="flex-1 w-full h-full md:w-1/2 flex justify-center items-center md:px-10">
          <div className="w-full space-y-8 p-6 py-20 sm:p-8 max-w-sm md:max-w-md md:rounded-lg md:border md:shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <LoginForm />
          </div>
        </div>
        <div className="w-full h-full md:w-1/2">
          <LoginBenefits />
        </div>
      </div>
    </div>
  )
}
