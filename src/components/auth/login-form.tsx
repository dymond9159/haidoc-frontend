"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "nextjs-toploader/app"
import type React from "react"
import { useState } from "react"

import { Asterisk } from "../common"
import { Logo } from "../logo"

export const LoginForm = () => {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      router.push("/login/verification/step1")
    }, 1000)
  }
  return (
    <div className="login-form">
      <div className="flex justify-center">
        <Logo size="md" />
      </div>

      <h1 className="text-2xl font-bold mt-10 mb-8">Faça seu Login!</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            E-mail <Asterisk />
          </label>
          <Input
            id="email"
            type="email"
            placeholder="mail.example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium">
            Senha <Asterisk />
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-system-10"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <Button variant="primary" className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? "Entrando..." : "Entrar"}
        </Button>

        <div className="flex items-center justify-start">
          <Link
            href="/reset-password/verification/step1"
            className="font-semibold text-primary-9 hover:text-primary-10 text-sm"
          >
            Esqueci minha senha
          </Link>
        </div>

        <div className="flex items-center justify-start gap-2">
          <span className="text-sm">Não tem uma conta?</span>
          <Link href="/register" className="font-semibold text-secondary-11 hover:text-secondary-10 text-sm">
            Cadastre-se
          </Link>
        </div>
      </form>
    </div>
  )
}
