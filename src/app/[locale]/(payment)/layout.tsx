import { Loading } from "@/components/common/loading-page"
import { PaymentHeader } from "@/components/common/payment-header"
import type React from "react"
import { Suspense } from "react"

export default function PaymentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen h-screen flex-1 flex flex-col">
      <PaymentHeader />
      <Suspense fallback={<Loading />}>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </Suspense>
    </div>
  )
}
