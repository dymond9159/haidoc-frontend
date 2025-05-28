import { Header, Loading, NavItem, Sidebar } from "@/components/common"
import { ScrollArea } from "@/components/ui"
import { ScrollBar } from "@/components/ui/scroll-area"
import { AccountType } from "@/types"
import type { Metadata } from "next"
import { Suspense, type ReactNode } from "react"

export const metadata: Metadata = {
  title: {
    template: "%s | Patient Portal",
    default: "HaiDoc Patient Portal",
  },
  description:
    "Acesso profissional à plataforma HaiDoc para gerenciamento de usuários, aplicações, finanças, saúde e operações clínicas.",
  keywords: "haidoc, saúde, plataforma médica, painel profissional, gestão clínica, administrativo, médico, enfermeiro",
  authors: [{ name: "HaiDoc Team" }],
  creator: "HaiDoc",
  publisher: "HaiDoc",
}

export default async function PatientLayout({ children }: { children: ReactNode }) {
  // nav items at sidebar
  const navItems: NavItem[] = [
    { iconName: "HomeIcon", label: "home", href: "/patient" },
    { iconName: "StethoscopeIcon", label: "consultations", href: "/patient/consultations" },
    { iconName: "MicroscopeIcon", label: "exams", href: "/patient/exams" },
    { iconName: "TruckIcon", label: "orders", href: "/patient/orders" },
    { iconName: "ReceiptIcon", label: "healthPlan", href: "/patient/health-plan" },
    { iconName: "MessageSquareTextIcon", label: "quickChat", href: "/patient/chat" },
    { iconName: "SupportAgentIcon", label: "support", href: "/support" },
  ]

  return (
    <div className="flex flex-col h-screen bg-system-0">
      <Sidebar accountType={AccountType.Patient} navItems={navItems} />
      <div className="w-screen h-screen flex-1 flex flex-col">
        <Header />
        <Suspense fallback={<Loading />}>
          <main className="overflow-y-hidden">
            <ScrollArea className="h-full">
              {children}
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </main>
        </Suspense>
      </div>
    </div>
  )
}
