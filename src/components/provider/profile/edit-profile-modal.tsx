"use client"

import { Asterisk } from "@/components/common"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useTranslations } from "next-intl"
import { useState } from "react"

interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: () => void
}

export function EditProfileModal({ isOpen, onClose, onSave }: EditProfileModalProps) {
  const t = useTranslations("modal.editProfileModal")
  const tForm = useTranslations("form")
  const tCta = useTranslations("cta")

  const [aboutMe, setAboutMe] = useState(
    "Lorem ipsum dolor sit amet consectetur. Sagittis felis praesent in elit netus quisque aliquam. Amet ut gravida elit vitae feugiat scelerisque mi urna.",
  )
  const [address, setAddress] = useState("Rua do Dão, nº49, 2º Andar, Bairro Central")
  const [otherInfo, setOtherInfo] = useState("NUIT: 000000000000")
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)

  const handleSave = () => {
    // Here you would typically save the data to your backend
    onSave()
  }

  const handleCancel = () => {
    setIsConfirmDialogOpen(true)
  }

  const confirmCancel = () => {
    setIsConfirmDialogOpen(false)
    onClose()
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t("title")}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="about-me" className="flex items-center">
                {tForm("label.aboutMe")} <Asterisk />
              </Label>
              <Textarea
                id="about-me"
                value={aboutMe}
                placeholder={tForm("placeholder.aboutMe")}
                onChange={(e) => setAboutMe(e.target.value)}
                className="min-h-[100px]"
                maxLength={5000}
              />
              <p className="text-xs text-gray-500">Máximo 5000 caracteres</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address" className="flex items-center">
                {tForm("label.address")} <Asterisk />
              </Label>
              <Input
                id="address"
                value={address}
                placeholder={tForm("placeholder.address")}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="other-info">{tForm("label.otherInfo")}</Label>
              <Input
                id="other-info"
                value={otherInfo}
                placeholder={tForm("placeholder.otherInfo")}
                onChange={(e) => setOtherInfo(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="flex justify-between sm:justify-end">
            <Button variant="outline" onClick={handleCancel}>
              {tCta("cancel")}
            </Button>
            <Button onClick={handleSave}>{tCta("save")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("alertDialog.title")}</AlertDialogTitle>
            <AlertDialogDescription>{t("alertDialog.description")}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("alertDialog.cta.cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={confirmCancel}>{t("alertDialog.cta.confirm")}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
