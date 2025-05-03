"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { z } from "zod"
import type { User } from "@/types/user"
import { useToast } from "@/hooks/use-toast"
import { MessageCircleQuestionIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Asterisk } from "@/components/common"

// Form validation schema
const userFormSchema = z.object({
  name: z.string().min(1, "Nome completo é obrigatório"),
  email: z.string().email("E-mail inválido").min(1, "E-mail é obrigatório"),
  profile: z.string().min(1, "Perfil atribuído é obrigatório"),
})

type UserFormValues = z.infer<typeof userFormSchema>

interface UserFormDialogProps {
  mode: "create" | "edit"
  user?: User
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave?: (user: User) => void
}

export function UserFormDialog({
  mode,
  user,
  open,
  onOpenChange,
  onSave,
}: UserFormDialogProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState<UserFormValues>({
    name: "",
    email: "",
    profile: "",
  })
  const [errors, setErrors] = useState<
    Partial<Record<keyof UserFormValues, string>>
  >({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize form data when user changes (for edit mode)
  useEffect(() => {
    if (mode === "edit" && user) {
      setFormData({
        name: user.name,
        email: user.email || "",
        profile: user.profile || "",
      })
    } else if (mode === "create") {
      // Reset form for create mode
      setFormData({
        name: "",
        email: "",
        profile: "",
      })
    }
  }, [mode, user, open])

  // Handle input change
  const handleChange = (field: keyof UserFormValues, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  // Validate form
  const validateForm = (): boolean => {
    try {
      userFormSchema.parse(formData)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof UserFormValues, string>> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof UserFormValues] = err.message
          }
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)

      if (mode === "create") {
        // Show success toast for create
        toast({
          title: "Usuário criado com sucesso",
          description:
            "Um e-mail será enviado para o usuário, para que ele possa criar a sua senha de acesso.",
        })
      } else if (mode === "edit" && user && onSave) {
        // Update user with form data
        const updatedUser: User = {
          ...user,
          name: formData.name,
          email: formData.email,
          profile: formData.profile,
        }
        onSave(updatedUser)

        // Show success toast for edit
        toast({
          title: "Usuário atualizado com sucesso",
          description: "As informações do usuário foram atualizadas.",
        })
      }

      onOpenChange(false)
    }, 1000)
  }

  const title = mode === "create" ? "Novo usuário" : "Editar usuário"
  const submitText =
    mode === "create"
      ? isSubmitting
        ? "Cadastrando usuário..."
        : "Cadastrar usuário"
      : isSubmitting
        ? "Salvando alterações..."
        : "Salvar alterações"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Nome completo
                <Asterisk />
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={
                  errors.name ? "border-destructive ring-destructive" : ""
                }
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p id="name-error" className="text-xs text-destructive">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                E-mail
                <Asterisk />
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={
                  errors.email ? "border-destructive ring-destructive" : ""
                }
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="text-xs text-destructive">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile" className="text-sm font-medium">
                Perfil
                <Asterisk />
              </Label>
              <Select
                value={formData.profile}
                onValueChange={(value) => handleChange("profile", value)}
              >
                <SelectTrigger
                  id="profile"
                  className={cn(
                    "w-full",
                    errors.profile ? "border-destructive ring-destructive" : "",
                  )}
                  aria-invalid={!!errors.profile}
                  aria-describedby={
                    errors.profile ? "profile-error" : undefined
                  }
                >
                  <SelectValue placeholder="Selecione um perfil" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="manager">Gerente</SelectItem>
                  <SelectItem value="user">Usuário</SelectItem>
                  <SelectItem value="Perfil X">Perfil X</SelectItem>
                </SelectContent>
              </Select>
              {errors.profile && (
                <p id="profile-error" className="text-xs text-destructive">
                  {errors.profile}
                </p>
              )}
            </div>

            {mode === "create" && (
              <div className="flex flex-row gap-2 text-xs text-secondary-9">
                <MessageCircleQuestionIcon size="16" />
                <p>
                  Um e-mail será enviado para o usuário, para que ele possa
                  criar a sua senha de acesso.
                </p>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {submitText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
