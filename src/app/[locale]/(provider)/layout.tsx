import { Header, Loading, Sidebar } from "@/components/common"
import type { Metadata } from "next"
import { Suspense, type ReactNode } from "react"

export const metadata: Metadata = {
  title: {
    template: "%s | HaiDoc Profissional",
    default: "HaiDoc Profissional | Portal Profissional",
  },
  description:
    "Acesso profissional à plataforma HaiDoc para gerenciamento de usuários, aplicações, finanças, saúde e operações clínicas.",
  keywords: "haidoc, saúde, plataforma médica, painel profissional, gestão clínica, administrativo, médico, enfermeiro",
  authors: [{ name: "HaiDoc Team" }],
  creator: "HaiDoc",
  publisher: "HaiDoc",
}

const homeLink = "/professional"

export default async function ProfessionalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-row min-h-screen bg-system-2">
      <Sidebar homeLink={homeLink} bottomCanvasImage="/images/side-bottom-canvas.svg" />
      <div className="w-screen h-screen flex-1 flex flex-col">
        <Header />
        <Suspense fallback={<Loading text="Carregando..." />}>
          <main className="flex-1 p-6 overflow-y-auto">{children}</main>
        </Suspense>
      </div>
    </div>
  )
}
