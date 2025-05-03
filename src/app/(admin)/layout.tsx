import { Header, Loading, Sidebar } from "@/components/common"
import type { Metadata } from "next"
import { Suspense, type ReactNode } from "react"

export const metadata: Metadata = {
  title: {
    template: "%s | HaiDoc Admin",
    default: "HaiDoc Admin | Painel Administrativo",
  },
  description:
    "Painel administrativo da plataforma HaiDoc para gerenciamento de usuários, aplicações, finanças e operações.",
  keywords: "haidoc, admin, painel administrativo, gestão de saúde",
  authors: [{ name: "HaiDoc" }],
  creator: "HaiDoc",
  publisher: "HaiDoc",
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-row min-h-screen bg-system-2">
      <Sidebar />
      <div className="w-screen h-screen flex-1 flex flex-col">
        <Header />
        <Suspense fallback={<Loading text="Carregando..." />}>
          <main className="flex-1 p-6 overflow-y-auto">{children}</main>
        </Suspense>
      </div>
    </div>
  )
}
