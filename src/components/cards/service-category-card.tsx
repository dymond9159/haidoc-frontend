import { DayAvailability } from "@/app/(provider)/profile/public/services/edit/[category]/page"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

interface ServiceCategoryCardProps {
  day: DayAvailability
  onDayToggle: (id: string) => void
  onTimeChange: (id: string, type: "startTime" | "endTime", value: string) => void
}

export const ServiceCategoryCard = ({ day, onDayToggle, onTimeChange }: ServiceCategoryCardProps) => {
  return (
    <Card className="grid grid-cols-1 gap-4">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <Label htmlFor={`toggle-${day.id}`} className="font-medium">
            {day.name}
          </Label>
          <Switch id={`toggle-${day.id}`} checked={day.enabled} onCheckedChange={() => onDayToggle(day.id)} />
        </CardTitle>
      </CardHeader>
      <CardContent className={cn("grid grid-cols-2 gap-2", !day.enabled && "opacity-50")}>
        <div className="space-y-2">
          <Label htmlFor={`start-${day.id}`} className="text-xs text-gray-500">
            Horário inicial
          </Label>
          <Input
            id={`start-${day.id}`}
            type="time"
            value={day.startTime}
            onChange={(e) => onTimeChange(day.id, "startTime", e.target.value)}
            disabled={!day.enabled}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`end-${day.id}`} className="text-xs text-gray-500">
            Horário final
          </Label>
          <Input
            id={`end-${day.id}`}
            type="time"
            value={day.endTime}
            onChange={(e) => onTimeChange(day.id, "endTime", e.target.value)}
            disabled={!day.enabled}
          />
        </div>
      </CardContent>
    </Card>
  )
}
