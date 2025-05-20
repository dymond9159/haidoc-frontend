"use client"

import { ChevronLeftIcon } from "lucide-react"
import { useRouter } from "nextjs-toploader/app"
import { Button } from "../ui"

interface BackButtonProps {
  text?: string
  onClick?: () => void
}

export const BackButton = ({ text = "Detalhes", onClick }: BackButtonProps) => {
  const router = useRouter()
  const handleBack = () => {
    if (onClick) {
      onClick()
    } else {
      router.back()
    }
  }
  return (
    <Button
      variant="link"
      onClick={handleBack}
      className="flex items-center text-foreground hover:text-secondary !pl-0 -ml-1"
    >
      <ChevronLeftIcon className="h-4 w-4" />
      {text}
    </Button>
  )
}
