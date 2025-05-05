import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "../ui"

interface AppointmentCardProps {
  patientName: string
  doctorName?: string
  startTime: string
  endTime: string
  className?: string
}

export function AppointmentCard1({ patientName, doctorName, startTime, endTime, className }: AppointmentCardProps) {
  return (
    <Card className={cn("", className)}>
      <CardContent className="p-0">
        <p className="border-l-4 border-l-secondary-9 bg-secondary-1 px-3 py-1 rounded-xs font-medium text-sm truncate mb-3">
          {patientName}
        </p>
        <div className="flex flex-row items-center gap-2 justify-between">
          <div className="flex flex-row items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={`/images/placeholder.svg?text=${doctorName}`} alt={doctorName} />
              <AvatarFallback>{doctorName}</AvatarFallback>
            </Avatar>
            {doctorName && <p className="text-xs text-system-9 mb-1">{doctorName}</p>}
          </div>
          <p className="text-xs text-system-9">
            {startTime} - {endTime}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
