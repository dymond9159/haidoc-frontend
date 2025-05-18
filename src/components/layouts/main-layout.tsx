"use client"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Suspense, type ReactNode } from "react"
import { Loading } from "../common"

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-system-2">
      <Header />
      <Suspense fallback={<Loading text="Carregando..." />}>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </Suspense>
      <Footer />
    </div>
  )
}
