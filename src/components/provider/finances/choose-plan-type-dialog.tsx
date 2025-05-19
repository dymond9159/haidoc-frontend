"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

interface ChoosePlanDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function ChoosePlanDialog({ open, onOpenChange }: ChoosePlanDialogProps) {
  const router = useRouter()
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[300px] p-6">
        <DialogTitle className="text-center">Tipo de plano</DialogTitle>
        <Button
          variant="ghost"
          className="w-4/5 mx-auto"
          onClick={() => router.push("/provider/finances/plans/new?type=patient")}
        >
          Paciente
        </Button>
        <Button
          variant="ghost"
          className="w-4/5 mx-auto"
          onClick={() => router.push("/provider/finances/plans/new?type=business")}
        >
          Business
        </Button>
      </DialogContent>
    </Dialog>
  )
}
