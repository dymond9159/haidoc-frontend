"use client"

import { ColumnDef } from "@/components/common/data-table"
import { EnhancedTable } from "@/components/common/enhanced-table"
import { FilterConfig } from "@/components/common/table-filter"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { mockFees } from "@/lib/mock-data/tax"
import { TaxColumns } from "@/types/admin"
import { PencilIcon, Trash2 } from "lucide-react"
import { useRouter } from "nextjs-toploader/app"
import { useEffect, useMemo, useState } from "react"
import { DeleteFeeDialog } from "./delete-fee-dialog"

export function TaxesTable() {
  const router = useRouter()
  const { toast } = useToast()
  const [fees, setFees] = useState<TaxColumns[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState<{ name?: string }>({})

  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [feeToDelete, setFeeToDelete] = useState<number | null>(null)

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setFees(mockFees)
      setIsLoading(false)
    }, 500)
  }, [])

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleDeleteClick = (id: number) => {
    setFeeToDelete(id)
    setDeleteModalOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (feeToDelete !== null) {
      // In a real app, you would call an API to delete the fee
      setFees(fees.filter((fee) => fee.id !== feeToDelete))

      toast({
        title: "Sucesso",
        description: "Sua ação foi realizada com sucesso!",
      })

      setDeleteModalOpen(false)
      setFeeToDelete(null)
    }
  }

  const columns: ColumnDef<TaxColumns>[] = [
    {
      accessorKey: "name",
      header: "TAXA",
      cell: (row) => row.name,
    },
    {
      accessorKey: "percentage",
      header: "PORCENTAGEM",
      cell: (row) => row.percentage,
    },
    {
      accessorKey: "status",
      header: "STATUS",
      cell: (row) => (
        <Badge className={row.status === "Ativo" ? "bg-success-2 text-success-6" : "bg-error-2 text-error-5"}>
          {row.status}
        </Badge>
      ),
    },
    {
      accessorKey: "actions",
      header: "AÇÕES",
      className: "w-[150px]",
      cell: (row) => (
        <div className="flex space-x-2 justify-center items-center">
          <Button variant="ghost" size="icon" onClick={() => router.push(`/admin/taxes/edit/${row.id}`)}>
            <PencilIcon size={18} />
          </Button>
          <Button variant="ghost-destructive" size="icon" onClick={() => handleDeleteClick(row.id)}>
            <Trash2 size={18} />
          </Button>
        </div>
      ),
    },
  ]

  const filterConfigs: FilterConfig<TaxColumns>[] = useMemo(
    () => [
      {
        type: "search",
        label: "Pesquisar",
        accessorKey: "name",
        placeholder: "Pesquisar por nome da taxa...",
        value: filters.name,
        onChange: (val) => handleFilterChange("name", val),
      },
    ],
    [filters],
  )

  return (
    <div className="space-y-4">
      <EnhancedTable
        data={fees}
        columns={columns}
        filterConfigs={filterConfigs}
        isLoading={isLoading}
        getRowId={(row) => row.id.toString()}
      />
      <DeleteFeeDialog
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}
