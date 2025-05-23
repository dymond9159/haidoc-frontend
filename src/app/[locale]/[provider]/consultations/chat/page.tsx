"use client"

import { useRouter } from "nextjs-toploader/app"

export default function ConsultationChatPage() {
  const router = useRouter()
  router.push("/professional/chat")
}
