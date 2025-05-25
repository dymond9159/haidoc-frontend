"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CreditCardIcon, EllipsisIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import { ReactNode, useState } from "react"
import { Button } from "../ui"

interface PaymentMethodCardProps {
  id: string
  cardName: string
  cardNumber?: string
  brandIcon?: ReactNode
  isDefault?: boolean
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onSetDefault?: (id: string) => void
}

export function PaymentMethodCard({
  id,
  cardName,
  cardNumber = "",
  brandIcon = <CreditCardIcon className="h-5 w-5 text-muted-foreground" />,
  isDefault,
  onEdit,
  onDelete,
  onSetDefault,
}: PaymentMethodCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const tCta = useTranslations("cta")

  return (
    <Card className={isDefault ? "border-secondary ring-1 ring-secondary" : ""}>
      <CardContent className="p-0 md:p-4">
        <div className="flex flex-row gap-4 items-center">
          <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center flex-shrink-0">
            {brandIcon}
          </div>
          <div className="flex-1 flex flex-row items-center">
            <div className="flex-1 flex flex-col">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium">{cardName}</h3>
                {isDefault && (
                  <span className="text-xs bg-secondary text-primary-foreground px-1.5 py-0.5 rounded-sm">Padrão</span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{cardNumber}</p>
            </div>
            <div>
              <DropdownMenu onOpenChange={setIsOpen} open={isOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <EllipsisIcon className="cursor-pointer h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => {
                      setIsOpen(false)
                      onEdit(id)
                    }}
                  >
                    {tCta("edit")}
                  </DropdownMenuItem>
                  {onSetDefault && !isDefault && (
                    <DropdownMenuItem onClick={() => onSetDefault(id)}>{tCta("defineAsDefault")}</DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      setIsOpen(false)
                      onDelete(id)
                    }}
                    className="text-destructive focus:text-destructive focus:bg-destructive/10"
                  >
                    {tCta("delete")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
