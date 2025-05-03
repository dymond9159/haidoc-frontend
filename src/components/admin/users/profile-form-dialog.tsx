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
import { Switch } from "@/components/ui/switch"
import { z } from "zod"
import { Asterisk } from "@/components/common"

// Profile type definition
interface Permission {
  id: string
  name: string
  description: string
  enabled: boolean
}

interface Profile {
  id: string
  name: string
  permissions: Permission[]
}

// Form validation schema
const profileFormSchema = z.object({
  name: z.string().min(1, "Nome do perfil é obrigatório"),
})

interface ProfileFormDialogProps {
  profile: Profile | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (profile: Profile) => void
}

export function ProfileFormDialog({
  profile,
  open,
  onOpenChange,
  onSave,
}: ProfileFormDialogProps) {
  const [name, setName] = useState("")
  const [nameError, setNameError] = useState("")
  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: "1",
      name: "Aplicações de usuários business",
      description:
        "O usuário pode visualizar, aprovar, reprovar e cancelar as solicitações dos usuários.",
      enabled: false,
    },
    {
      id: "2",
      name: "Finanças",
      description:
        "O usuário pode visualizar, aprovar, reprovar e cancelar as solicitações dos usuários.",
      enabled: false,
    },
    {
      id: "3",
      name: "Entregas",
      description:
        "O usuário pode visualizar, aprovar, reprovar e cancelar as solicitações dos usuários.",
      enabled: false,
    },
    {
      id: "4",
      name: "Pré-avaliações",
      description:
        "O usuário pode visualizar, aprovar, reprovar e cancelar as solicitações dos usuários.",
      enabled: false,
    },
    {
      id: "5",
      name: "Log de atividades",
      description:
        "O usuário pode visualizar as informações de usuários pacientes e usuários business.",
      enabled: false,
    },
  ])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize form data when profile changes
  useEffect(() => {
    if (profile) {
      setName(profile.name)
      // Map existing permissions with profile's permission states
      setPermissions(
        permissions.map((permission) => {
          const existingPermission = profile.permissions.find(
            (p) => p.id === permission.id,
          )
          return existingPermission
            ? { ...permission, enabled: existingPermission.enabled }
            : permission
        }),
      )
    } else {
      // Reset form for new profile
      setName("")
      setPermissions(
        permissions.map((permission) => ({ ...permission, enabled: false })),
      )
    }
  }, [profile, open])

  // Handle permission toggle
  const handlePermissionToggle = (id: string, checked: boolean) => {
    setPermissions(
      permissions.map((permission) =>
        permission.id === id ? { ...permission, enabled: checked } : permission,
      ),
    )
  }

  // Validate form
  const validateForm = (): boolean => {
    try {
      profileFormSchema.parse({ name })
      setNameError("")
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const nameError = error.errors.find((err) => err.path[0] === "name")
        if (nameError) {
          setNameError(nameError.message)
        }
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

    // Create profile object
    const updatedProfile: Profile = {
      id: profile?.id || "temp-id",
      name,
      permissions: permissions.filter((permission) => permission.enabled),
    }

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      onSave(updatedProfile)
      onOpenChange(false)
    }, 500)
  }

  const title = profile ? "Editar perfil" : "Novo perfil"
  const submitText = isSubmitting
    ? profile
      ? "Salvando alterações..."
      : "Cadastrando perfil..."
    : profile
    ? "Salvar alterações"
    : "Cadastrar perfil"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="profile-name" className="text-sm font-medium">
                Nome do perfil
                <Asterisk />
              </Label>
              <Input
                id="profile-name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  if (nameError) setNameError("")
                }}
                className={
                  nameError ? "border-destructive ring-destructive" : ""
                }
                aria-invalid={!!nameError}
                aria-describedby={nameError ? "name-error" : undefined}
              />
              {nameError && (
                <p id="name-error" className="text-xs text-destructive">
                  {nameError}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Permissões
                <Asterisk />
              </Label>
              <div className="space-y-3">
                {permissions.map((permission) => (
                  <div
                    key={permission.id}
                    className="flex items-start gap-3 rounded-md border p-3"
                  >
                    <Switch
                      id={`new-permission-${permission.id}`}
                      checked={permission.enabled}
                      onCheckedChange={(checked) =>
                        handlePermissionToggle(permission.id, checked)
                      }
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <label
                        htmlFor={`new-permission-${permission.id}`}
                        className="block font-medium"
                      >
                        {permission.name}
                      </label>
                      <p className="text-sm text-muted-foreground">
                        {permission.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
