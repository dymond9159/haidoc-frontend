"use client"

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
import { useState } from "react"

interface EditServiceModalProps {
  service: any
  isOpen: boolean
  onClose: () => void
  onSave: (service: any) => void
}

export function EditServiceModal({ service, isOpen, onClose, onSave }: EditServiceModalProps) {
  const [price, setPrice] = useState(service?.price || service?.teleconsulta?.price || "")
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)

  const handleSave = () => {
    if (service.id === 4) {
      onSave({ ...service, price })
    } else {
      onSave({
        ...service,
        teleconsulta: { ...service.teleconsulta, price },
      })
    }
  }

  const handleCancel = () => {
    setIsConfirmDialogOpen(true)
  }

  const confirmCancel = () => {
    setIsConfirmDialogOpen(false)
    onClose()
  }

  if (!service) return null

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Editar {service.id === 4 ? "Chat rápido" : service.name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="price" className="flex items-center">
                Preço da consulta
                <span className="ml-1 text-red-500">*</span>
              </Label>
              <Input id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
          </div>
          <DialogFooter className="flex justify-between sm:justify-between">
            <Button variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button onClick={handleSave} className="bg-red-500 hover:bg-red-600">
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancelar edição</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja cancelar? Todas as alterações serão perdidas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Voltar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmCancel}>Sim, cancelar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
