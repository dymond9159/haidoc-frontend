import { MainLayout } from "@/components/layouts/main-layout"
import type { ReactNode } from "react"

export default function MainRootLayout({ children }: { children: ReactNode }) {
  return <MainLayout>{children}</MainLayout>
}
