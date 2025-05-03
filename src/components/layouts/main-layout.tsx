"use client"

import type { ReactNode } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { useMobile } from "../../hooks/use-mobile"

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const isMobile = useMobile()

  return (
    <div className="flex min-h-screen flex-col bg-system-2">
      <Header />
      <div className="flex flex-1">
        {!isMobile && <Sidebar />}
        <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
      </div>
      <Footer />
    </div>
  )
}
