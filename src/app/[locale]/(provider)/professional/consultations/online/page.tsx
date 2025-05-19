"use client"

import { useRouter } from "nextjs-toploader/app"

export default function ConsultationOnlinePage() {
  const router = useRouter()
  router.push("/professional/online-consultation")
}
