import { Header, Loading, NavItem, Sidebar } from "@/components/common"
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

const navItems: NavItem[] = [
  { iconName: "HomeIcon", label: "Home", href: "/professional" },
  { iconName: "CalendarDaysIcon", label: "Agenda", href: "/professional/agenda" },
  { iconName: "StethoscopeIcon", label: "Consultas", href: "/professional/consultations" },
  { iconName: "MessageSquareTextIcon", label: "Chat rápido ", href: "/professional/chat" },
  { iconName: "SupportAgentIcon", label: "Suporte", href: "/professional/support" },
]

const homeLink = "/professional"

export default async function ProfessionalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-row min-h-screen bg-system-2">
      <Suspense fallback={<Loading text="Carregando..." />}>
        <Sidebar navItems={navItems} homeLink={homeLink} bottomCanvasImage="/images/side-bottom-canvas.svg" />
        <div className="w-screen h-screen flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 overflow-y-auto">{children}</main>
        </div>
      </Suspense>
    </div>
  )
}
