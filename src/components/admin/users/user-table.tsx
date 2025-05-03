"use client"
import { useCallback, useMemo, useState } from "react"

import { Pencil, Trash2 } from "lucide-react"

import { DeleteUserDialog } from "@/components/admin/users/delete-user-dialog"
import { UserFormDialog } from "@/components/admin/users/user-form-dialog"
import { ColumnDef } from "@/components/common/data-table"
import { EnhancedTable } from "@/components/common/enhanced-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { useToast } from "@/hooks/use-toast"

import { mockUsers } from "@/lib/mock-data/users"
import type { User } from "@/types/user"

export function UserTable() {
  const { toast } = useToast()
  const [users, setUsers] = useState<User[]>(mockUsers || [])

  // State for edit dialog
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  // State for delete dialog
  const [userToDelete, setUserToDelete] = useState<User | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleEditUser = useCallback((user: User) => {
    setEditingUser(user)
    setIsEditDialogOpen(true)
  }, [])

  const handleDeleteUser = useCallback((user: User) => {
    setUserToDelete(user)
    setIsDeleteDialogOpen(true)
  }, [])

  // Update user
  const handleUpdateUser = (updatedUser: User) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
    )
  }

  // Delete user
  const handleConfirmDelete = () => {
    if (userToDelete) {
      setUsers(users.filter((user) => user.id !== userToDelete.id))
      toast({
        title: "Usuário excluído com sucesso",
        description: "O usuário foi removido do sistema.",
      })
    }
  }

  // Define Columns for Users
  const columns: ColumnDef<User>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "NOME DO USUÁRIO",
        className: "w-[40%]",
      },
      {
        accessorKey: "email",
        header: "E-MAIL",
        className: "w-[35%] truncate max-w-[200px]",
      },
      {
        accessorKey: "profile",
        header: "PERFIL",
        className: "w-[15%] text-center",
        cell: (row) => (
          <Badge className="bg-secondary-9 text-white">{row.profile}</Badge>
        ),
      },
      {
        id: "actions",
        accessorKey: "actions",
        header: "AÇÕES",
        className: "w-[10%] text-center",
        cell: (row) => (
          <div className="flex gap-2 items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleEditUser(row)}
              aria-label={`Editar usuário ${row.name}`}
            >
              <Pencil size="18" />
            </Button>
            <Button
              variant="ghost-destructive"
              size="icon"
              onClick={() => handleDeleteUser(row)}
              aria-label={`Excluir usuário ${row.name}`}
              disabled={row.isCurrentUser}
            >
              <Trash2 size="18" />
            </Button>
          </div>
        ),
      },
    ],
    [handleEditUser, handleDeleteUser],
  )

  return (
    <div className="space-y-4">
      <EnhancedTable
        data={users}
        columns={columns}
        filterConfigs={[]}
        isLoading={false} // Assuming data is already loaded
        getRowId={(row) => row.id}
      />

      {/* Edit User Dialog */}
      {editingUser && (
        <UserFormDialog
          mode="edit"
          user={editingUser}
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSave={handleUpdateUser}
        />
      )}

      {/* Delete User Dialog */}
      {userToDelete && (
        <DeleteUserDialog
          user={userToDelete}
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  )
}
