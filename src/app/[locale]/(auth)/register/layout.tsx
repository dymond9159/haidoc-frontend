import { BackButton } from "@/components/common"
import { Logo } from "@/components/logo"
import { Separator } from "@/components/ui/separator"
import type { ReactNode } from "react"

export default function RegisterLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-2xl space-y-8 rounded-lg bg-system-1 p-8 shadow-md py-10">
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
    </div>
  )
}
