"use client"

import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useRouter } from "nextjs-toploader/app"
import { useCallback, useEffect, useMemo, useState } from "react"

import { DeliverTabOption } from "@/app/(admin)/admin/deliveries/page"
import { StatusDropdown, StatusLabel } from "@/components/common"
import { ColumnDef } from "@/components/common/data-table"
import { EnhancedTable } from "@/components/common/enhanced-table"
import { FilterConfig, StatusOption } from "@/components/common/table-filter"
import { Button } from "@/components/ui/button"
import { mockDeliverHistory, mockDelivers } from "@/lib/mock-data/delivers"

import { useToast } from "@/hooks/use-toast"

import { DeliverStatusList } from "@/lib/constants"
import { DeliverColumns, DeliverStatus } from "@/types/admin"

interface DeliverTableProps {
  mode?: DeliverTabOption
}

export function DeliverTable({ mode = DeliverTabOption.Order }: DeliverTableProps) {
  const router = useRouter()
  const [allData, setAllData] = useState<DeliverColumns[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const [filters, setFilters] = useState<{
    patientId?: string
    patientName?: string
    id?: string
    date?: Date | undefined
    status?: DeliverStatus | null
  }>({})

  const handleFilterChange = useCallback((filterKey: keyof typeof filters, value: any) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterKey]: value }))
  }, [])

  // Fetch data
  useEffect(() => {
    const fetchDatas = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockData = mode === DeliverTabOption.Order ? mockDelivers : mockDeliverHistory

      setAllData(mockData)
      setIsLoading(false)
    }
    fetchDatas()
  }, [mode])

  // Navigation and Status Update Handlers (remain in DeliverTable as they are specific)
  const handleStatusChange = async (id: string, newStatus: DeliverStatus) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API

      const timestamp = new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date())

      const updatedOrders = allData.map((order) =>
        order.id === id
          ? {
              ...order,
              status: newStatus,
              statusHistory: [...order.statusHistory, { status: newStatus, timestamp: timestamp }],
            }
          : order,
      )
      setAllData(updatedOrders)

      toast({
        title: "Status atualizado",
        description: `Pedido #${id} atualizado para "${newStatus}"`,
      })
    } catch (error) {
      console.error("Status update error:", error)
      toast({
        title: "Erro ao atualizar status",
        description: "Ocorreu um erro ao atualizar o status do pedido.",
      })
    }
  }

  const handleViewDetails = (orderId: string) => {
    router.push(`/admin/deliveries/${orderId}`)
  }

  // Define Columns for Deliveries
  const columns: ColumnDef<DeliverColumns>[] = [
    {
      accessorKey: "patientId",
      header: "ID DO PACIENTE",
      className: "font-medium",
    },
    {
      accessorKey: "date",
      header: "DATA DO PEDIDO",
      cell: (row) => format(new Date(row.date), "dd/MM/yyyy", { locale: ptBR }),
    },
    { accessorKey: "value", header: "VALOR" },
    {
      accessorKey: "status",
      header: "STATUS",
      cell: (row) =>
        mode === DeliverTabOption.Order ? (
          <StatusDropdown
            status={row.status}
            availableStatus={DeliverStatusList}
            onStatusChange={(newStatus) => handleStatusChange(row.id, newStatus)}
          />
        ) : (
          <StatusLabel status={row.status} />
        ),
    },
    {
      accessorKey: "actions",
      header: "AÇÕES",
      cell: (row) => (
        <Button variant="link" className="text-primary-9 h-auto p-0" onClick={() => handleViewDetails(row.id)}>
          Visualizar
        </Button>
      ),
    },
  ]

  // Prepare status options for the filter dropdown
  const deliverStatusFilterOptions: StatusOption<DeliverStatus>[] = DeliverStatusList.map((status) => ({
    value: status,
    label: status,
  }))

  // Define Filter Configurations for Deliveries
  const filterConfigs: FilterConfig<DeliverColumns>[] = useMemo(
    () => [
      {
        type: "search",
        label: "Pesquisar",
        accessorKey: "patientId",
        placeholder: "Pesquisar por ID do Paciente...",
        value: filters.patientId,
        onChange: (value) => handleFilterChange("patientId", value),
      },
      {
        type: "date",
        label: "Data",
        accessorKey: "date",
        placeholder: "Selecione uma Data",
        value: filters.date,
        onChange: (date) => handleFilterChange("date", date),
      },
      {
        type: "select",
        label: "Status",
        accessorKey: "status",
        placeholder: "Selecione o status",
        options: deliverStatusFilterOptions,
        value: filters.status,
        onChange: (value) => handleFilterChange("status", value),
      },
    ],
    [deliverStatusFilterOptions, filters, handleFilterChange],
  )

  return (
    <EnhancedTable
      data={allData}
      columns={columns}
      filterConfigs={filterConfigs}
      isLoading={isLoading}
      getRowId={(row) => row.id}
    />
  )
}
