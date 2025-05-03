"use client"
import { useState } from "react"

import { Pencil, Plus, Trash2Icon } from "lucide-react"

import { DeleteProfileDialog } from "@/components/admin/users/delete-profile-dialog"
import { ProfileFormDialog } from "@/components/admin/users/profile-form-dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Pagination } from "@/components/ui/pagination"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

import { useToast } from "@/hooks/use-toast"
import { mockProfiles } from "@/lib/mock-data/users"

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

export function ProfilesTab() {
  const { toast } = useToast()
  const [currentPage, setCurrentPage] = useState(1)
  const [profiles, setProfiles] = useState<Profile[]>(mockProfiles)

  // State for create/edit dialog
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false)
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null)

  // State for delete dialog
  const [profileToDelete, setProfileToDelete] = useState<Profile | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // Handle create new profile
  const handleCreateProfile = () => {
    setEditingProfile(null)
    setIsProfileDialogOpen(true)
  }

  // Handle edit profile
  const handleEditProfile = (profile: Profile) => {
    setEditingProfile(profile)
    setIsProfileDialogOpen(true)
  }

  // Handle delete profile
  const handleDeleteProfile = (profile: Profile) => {
    setProfileToDelete(profile)
    setIsDeleteDialogOpen(true)
  }

  // Save profile (create or update)
  const handleSaveProfile = (profile: Profile) => {
    if (editingProfile) {
      // Update existing profile
      setProfiles(profiles.map((p) => (p.id === profile.id ? profile : p)))
      toast({
        title: "Perfil atualizado",
        description: "As alterações foram salvas com sucesso.",
      })
    } else {
      // Create new profile
      const newProfile = {
        ...profile,
        id: (profiles.length + 1).toString(),
      }
      setProfiles([...profiles, newProfile])
      toast({
        title: "Perfil criado",
        description: "O novo perfil foi criado com sucesso.",
      })
    }
  }

  // Delete profile
  const handleConfirmDelete = () => {
    if (profileToDelete) {
      setProfiles(
        profiles.filter((profile) => profile.id !== profileToDelete.id),
      )
      toast({
        title: "Perfil excluído",
        description: "O perfil foi excluído com sucesso.",
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={handleCreateProfile}>
          <Plus className="mr-2 h-4 w-4" />
          Novo perfil
        </Button>
      </div>
      <Accordion type="multiple" className="w-full">
        {profiles.map((profile) => (
          <AccordionItem key={profile.id} value={profile.id} className="w-full">
            <AccordionTrigger
              className="w-full py-4 flex items-center hover:no-underline"
            >
              <div className="flex-1 flex items-center justify-between">
                <span className="font-medium">{profile.name}</span>
                <div className="flex gap-2 pr-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEditProfile(profile)
                      }}
                      aria-label={`Editar perfil ${profile.name}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost-destructive"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteProfile(profile)
                      }}
                      aria-label={`Excluir perfil ${profile.name}`}
                    >
                      <Trash2Icon className="h-4 w-4" />
                    </Button>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <Separator className="mt-2 mb-4" />
              <div className="space-y-4">
                {profile.permissions.map((permission) => (
                  <div
                    key={permission.id}
                    className="flex items-start gap-3 p-3"
                  >
                    <Switch
                      id={`permission-${profile.id}-${permission.id}`}
                      checked={permission.enabled}
                      className="mt-0.5"
                      disabled
                    />
                    <div className="flex-1">
                      <label
                        htmlFor={`permission-${profile.id}-${permission.id}`}
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
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Separator className="my-4" />
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onPageChange={setCurrentPage}
      />

      {/* Profile Form Dialog */}
      <ProfileFormDialog
        profile={editingProfile}
        open={isProfileDialogOpen}
        onOpenChange={setIsProfileDialogOpen}
        onSave={handleSaveProfile}
      />

      {/* Delete Profile Dialog */}
      {profileToDelete && (
        <DeleteProfileDialog
          profile={profileToDelete}
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  )
}
