"use client"

import { Asterisk } from "@/components/common"
import { Button } from "@/components/ui"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  showPasswordConfirmation?: boolean // To toggle the second type of modal
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Sim, excluir",
  cancelText = "Cancelar",
  showPasswordConfirmation = false,
}: ConfirmationModalProps) {
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const handleConfirm = () => {
    if (showPasswordConfirmation) {
      if (password === "123") {
        onConfirm()
        setPassword("")
        setPasswordError("")
      } else {
        setPasswordError("Senha incorreta.")
      }
    } else {
      onConfirm()
    }
  }

  const handleModalClose = () => {
    setPassword("")
    setPasswordError("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleModalClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {showPasswordConfirmation && (
          <div className="space-y-2 py-2">
            <Label htmlFor="passwordConfirm">
              Senha <Asterisk />
            </Label>
            <Input
              id="passwordConfirm"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (passwordError) setPasswordError("")
              }}
              placeholder="Digite sua senha"
            />
            {passwordError && <p className="text-xs text-destructive mt-1">{passwordError}</p>}
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={handleModalClose}>
            {cancelText}
          </Button>
          <Button onClick={handleConfirm}>{confirmText}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
