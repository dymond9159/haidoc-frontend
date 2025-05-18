"use client"

import type React from "react"

import { Asterisk } from "@/components/common"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useRouter } from "nextjs-toploader/app"
import { useState } from "react"

export default function VerificationStep4() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === "password") {
      setPassword(value)
    } else if (name === "passwordConfirmation") {
      setPasswordConfirmation(value)
    }
    setError("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!password || !passwordConfirmation) return

    if (password !== passwordConfirmation) {
      setError("As novas senhas devem ser iguais.")
      return
    }

    setIsLoading(true)

    // In a real app, you would send a verification code here
    // For now, we'll just simulate sending a code
    setTimeout(() => {
      setIsLoading(false)
      router.push("/reset-password/verification/success")
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-md text-system-12">Insira sua nova senha.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium">
            Senha <Asterisk />
          </label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => handleChange(e)}
              required
              className="h-12"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-system-10"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>
          {error && <p className="text-xs text-error-5">{error}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium">
            Repita a senha <Asterisk />
          </label>
          <div className="relative">
            <Input
              id="passwordConfirmation"
              name="passwordConfirmation"
              type={showPasswordConfirmation ? "text" : "password"}
              placeholder="••••••••"
              value={passwordConfirmation}
              onChange={(e) => handleChange(e)}
              required
              className="h-12"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-system-10"
              onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
            >
              {showPasswordConfirmation ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>
          {error && <p className="text-xs text-error-5">{error}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {"Próximo"}
        </Button>
      </form>
    </div>
  )
}
