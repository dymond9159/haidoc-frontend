"use client"

import { cn } from "@/lib/utils"
import { Icon } from "@/components/icons/icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface DoctorCardProps {
  doctor: {
    name: string
    specialty: string
    avatar?: string
    initials: string
    rating: number
    isAvailable: boolean
  }
  className?: string
  onBookAppointment?: () => void
  onViewProfile?: () => void
}

export function DoctorCard({
  doctor,
  className,
  onBookAppointment,
  onViewProfile,
}: DoctorCardProps) {
  return (
    <Card className={cn("", className)}>
      <CardContent className="p-4">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-20 w-20">
            <AvatarImage src={doctor.avatar} alt={doctor.name} />
            <AvatarFallback className="text-lg">
              {doctor.initials}
            </AvatarFallback>
          </Avatar>
          <h3 className="mt-3 font-medium">{doctor.name}</h3>
          <p className="text-sm text-system-10">{doctor.specialty}</p>
          <div className="mt-2 flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Icon
                key={i}
                name="heart"
                className={cn("h-4 w-4", {
                  "text-rating-6": i < doctor.rating,
                  "text-system-5": i >= doctor.rating,
                })}
              />
            ))}
            <span className="ml-1 text-sm text-system-10">
              {doctor.rating.toFixed(1)}
            </span>
          </div>
          <Badge
            className={cn("mt-3", {
              "bg-success-2 text-success-6": doctor.isAvailable,
              "bg-system-3 text-system-10": !doctor.isAvailable,
            })}
          >
            {doctor.isAvailable ? "Available Now" : "Unavailable"}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-system-5 px-4 py-3">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={onViewProfile}
        >
          View Profile
        </Button>
        <Button
          variant="default"
          size="sm"
          className="ml-2 w-full"
          onClick={onBookAppointment}
          disabled={!doctor.isAvailable}
        >
          Book Appointment
        </Button>
      </CardFooter>
    </Card>
  )
}
