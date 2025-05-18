import { AuthLayout } from "@/components/layouts/auth-layout"
import type { ReactNode } from "react"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    template: "%s | HaiDoc Admin", // Consider a more specific title if you have one
    default: "Login | HaiDoc Admin",
  },
  description: "Authentication pages for the HaiDoc platform, including login, registration, and password recovery.",
}

export default function AuthRootLayout({ children }: { children: ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>
}
