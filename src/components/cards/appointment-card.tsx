"use client"

import { Icon } from "@/components/icons/icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface AppointmentCardProps {
  patient: {
    name: string
    avatar?: string
    initials: string
  }
  date: string
  time: string
  type: string
  status: "upcoming" | "completed" | "cancelled"
  className?: string
  onReschedule?: () => void
  onCancel?: () => void
}

export function AppointmentCard({
  patient,
  date,
  time,
  type,
  status,
  className,
  onReschedule,
  onCancel,
}: AppointmentCardProps) {
  const statusStyles = {
    upcoming: "bg-info-2 text-info-6",
    completed: "bg-success-2 text-success-6",
    cancelled: "bg-error-2 text-error-5",
  }

  const statusLabels = {
    upcoming: "Upcoming",
    completed: "Completed",
    cancelled: "Cancelled",
  }

  return (
    <Card className={cn("", className)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={patient.avatar} alt={patient.name} />
              <AvatarFallback>{patient.initials}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{patient.name}</h3>
              <p className="text-sm text-system-10">{type}</p>
            </div>
          </div>
          <Badge className={statusStyles[status]}>{statusLabels[status]}</Badge>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <Icon name="calendar" className="mr-2 h-4 w-4 text-system-10" />
            <span className="text-sm">{date}</span>
          </div>
          <div className="flex items-center">
            <Icon name="clock" className="mr-2 h-4 w-4 text-system-10" />
            <span className="text-sm">{time}</span>
          </div>
        </div>
      </CardContent>
      {status === "upcoming" && (
        <CardFooter className="flex justify-between border-t border-system-5 px-4 py-3">
          <Button variant="outline" size="sm" onClick={onReschedule}>
            Reschedule
          </Button>
          <Button variant="ghost" size="sm" className="text-error-5" onClick={onCancel}>
            Cancel
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
