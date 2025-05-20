import { BackButton } from "@/components/common"
import { Logo } from "@/components/logo"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { ReactNode } from "react"

export default function RegisterLayout({ children }: { children: ReactNode }) {
  return (
    <Card className="w-full max-w-md px-4 py-15 sm:p-8 sm:py-20 border-0 sm:border-1 sm:shadow-md">
      <div className="auth-verification">
        <div className="flex justify-center mb-12">
          <Logo size="md" />
        </div>

        <div className="flex items-center mb-4">
          <BackButton text="Cadastro" />
        </div>
        <Separator className="my-5" />

        {children}
      </div>
    </Card>
  )
}
