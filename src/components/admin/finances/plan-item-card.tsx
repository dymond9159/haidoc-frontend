"use client"

import { Button } from "@/components/ui/button"
import { MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { RemovePlanDialog } from "./remove-plan-dialog"
import { InactivePlanDialog } from "./inactive-plan-dialog"

interface PlanItemCardProps {
  planId: string
  title: string
  price: string | "Grátis"
  currency?: string
  members?: number
  onEdit?: () => void
  onDeactivate?: () => void
  onRemove?: () => void
}

export function PlanItemCard({
  planId,
  title,
  price,
  currency = "MZN",
  members,
  onEdit,
  onDeactivate,
  onRemove,
}: PlanItemCardProps) {
  const isGratis = price === "Grátis"

  const [isOpenRemovePlanDialog, setIsOpenRemovePlanDialog] = useState(false)
  const [isOpenInactivatePlanDialog, setIsOpenInactivatePlanDialog] =
    useState(false)

  const handleRemove = () => {
    setIsOpenRemovePlanDialog(true)
    onRemove?.()
  }

  const handleInactivate = () => {
    setIsOpenInactivatePlanDialog(true)
    onDeactivate?.()
  }

  return (
    <div className="bg-white rounded-lg border border-system-5 overflow-hidden">
      <div className="flex justify-between items-start p-4">
        <div className="space-y-1">
          <h4 className="font-medium text-sm text-secondary-11">{title}</h4>
          <div className="flex items-baseline">
            {isGratis ? (
              <p className="text-xl font-bold">Grátis</p>
            ) : (
              <div className="flex flex-col gap-2">
                <p className="text-xl font-bold">
                  {price} {currency}
                </p>
                {members && (
                  <p className="text-xs text-system-9">
                    *Até {members} membros
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Opções</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEdit}>Editar</DropdownMenuItem>
            <DropdownMenuItem onClick={handleRemove}>Remover</DropdownMenuItem>
            <DropdownMenuItem onClick={handleInactivate}>
              {isGratis ? "Desativar" : "Inativar"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <RemovePlanDialog
        open={isOpenRemovePlanDialog}
        onOpenChange={setIsOpenRemovePlanDialog}
        planId={planId}
      />
      <InactivePlanDialog
        open={isOpenInactivatePlanDialog}
        onOpenChange={setIsOpenInactivatePlanDialog}
        planId={planId}
      />
    </div>
  )
}
