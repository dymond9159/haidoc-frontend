"use client"

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

interface EndChatModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function EndChatModal({ isOpen, onClose, onConfirm }: EndChatModalProps) {
  const t = useTranslations("modal.quickChat.endChat")
  const tCta = useTranslations("cta")
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{t("description")}</DialogDescription>
        <DialogFooter className="flex justify-between sm:justify-end">
          <Button variant="outline" onClick={onClose}>
            {t("cta.cancel")}
          </Button>
          <Button onClick={onConfirm}>{t("cta.endChat")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
