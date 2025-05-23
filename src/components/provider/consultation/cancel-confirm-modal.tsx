import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useTranslations } from "next-intl"
import { useState } from "react"

interface CancelConfirmModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onCancel: () => void
  onConfirm: (reason: string) => void
  title: string
  description: string
  cancelButtonText?: string
  confirmButtonText?: string
}

export function CancelConfirmModal({
  isOpen,
  onOpenChange,
  onCancel,
  onConfirm,
  title,
  description,
  cancelButtonText,
  confirmButtonText,
}: CancelConfirmModalProps) {
  const tCta = useTranslations("cta")
  const [reason, setReason] = useState("")
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>
          <textarea
            className="w-full border border-system-5 rounded-md p-2 text-sm resize-none"
            rows={4}
            placeholder="Digite aqui"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={onCancel}>
            {cancelButtonText || tCta("cancel")}
          </Button>
          <Button variant="destructive" onClick={() => onConfirm(reason)}>
            {confirmButtonText || tCta("submit")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
