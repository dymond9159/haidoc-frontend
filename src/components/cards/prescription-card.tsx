"use client"

import { Icon } from "@/components/icons/icons"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface PrescriptionCardProps {
  medication: string
  dosage: string
  frequency: string
  prescribedBy: string
  prescribedDate: string
  expiryDate: string
  status: "active" | "expired" | "refill-requested"
  className?: string
  onRequestRefill?: () => void
  onViewDetails?: () => void
}

export function PrescriptionCard({
  medication,
  dosage,
  frequency,
  prescribedBy,
  prescribedDate,
  expiryDate,
  status,
  className,
  onRequestRefill,
  onViewDetails,
}: PrescriptionCardProps) {
  const statusStyles = {
    active: "bg-success-2 text-success-6",
    expired: "bg-error-2 text-error-5",
    "refill-requested": "bg-warning-2 text-warning-6",
  }

  const statusLabels = {
    active: "Active",
    expired: "Expired",
    "refill-requested": "Refill Requested",
  }

  return (
    <Card className={cn("", className)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium">{medication}</h3>
            <p className="text-sm text-system-10">{dosage}</p>
          </div>
          <Badge className={statusStyles[status]}>{statusLabels[status]}</Badge>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center">
            <Icon name="clock" className="mr-2 h-4 w-4 text-system-10" />
            <span className="text-sm">{frequency}</span>
          </div>
          <div className="flex items-center">
            <Icon name="doctor" className="mr-2 h-4 w-4 text-system-10" />
            <span className="text-sm">Dr. {prescribedBy}</span>
          </div>
          <div className="flex items-center">
            <Icon name="calendar" className="mr-2 h-4 w-4 text-system-10" />
            <span className="text-sm">Prescribed: {prescribedDate}</span>
          </div>
          <div className="flex items-center">
            <Icon name="alert-circle" className="mr-2 h-4 w-4 text-system-10" />
            <span className="text-sm">Expires: {expiryDate}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-system-5 px-4 py-3">
        <Button variant="outline" size="sm" className="w-full" onClick={onViewDetails}>
          View Details
        </Button>
        {status !== "refill-requested" && (
          <Button
            variant="default"
            size="sm"
            className="ml-2 w-full"
            onClick={onRequestRefill}
            disabled={status === "expired"}
          >
            Request Refill
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
