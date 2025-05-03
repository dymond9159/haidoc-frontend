import { Logo } from "@/components/logo"
import { Separator } from "@/components/ui/separator"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"

export default function RegisterLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-2xl space-y-8 rounded-lg bg-system-1 p-8 shadow-md">
      <div className="auth-verification">
        <div className="flex justify-center mb-12">
          <Logo size="md" />
        </div>

        <div className="flex items-center mb-4">
          <Link href="/login" className="flex items-center text-md font-bold text-system-12 hover:text-system-12">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Cadastro
          </Link>
        </div>
        <Separator className="my-5" />

        {children}
      </div>
    </div>
  )
}
