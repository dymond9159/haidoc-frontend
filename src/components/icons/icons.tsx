import { cn } from "@/lib/utils"
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  Heart,
  Home,
  Info,
  LogOut,
  LucideProps,
  Menu,
  MessageSquare,
  Moon,
  MoreVertical,
  Plus,
  Search,
  Settings,
  Sun,
  User,
  X,
  ChevronUp,
} from "lucide-react"
import {
  AppointmentIcon,
  DoctorIcon,
  LabResultIcon,
  NotificationIcon,
  PatientIcon,
  PrescriptionIcon,
} from "./hidoc-icons"

export type IconProps = LucideProps & {
  name: IconName
}

export type IconName =
  | "alert-circle"
  | "calendar"
  | "check-circle"
  | "chevron-up"
  | "chevron-down"
  | "chevron-left"
  | "chevron-right"
  | "clock"
  | "file-text"
  | "heart"
  | "home"
  | "info"
  | "logout"
  | "menu"
  | "message-square"
  | "moon"
  | "more-vertical"
  | "plus"
  | "search"
  | "settings"
  | "sun"
  | "user"
  | "x"
  | "doctor"
  | "patient"
  | "appointment"
  | "prescription"
  | "notification"
  | "lab-result"

// Define the type for the icon map more explicitly for clarity
// This maps IconName keys to React components accepting LucideProps
type IconMapType = {
  [key in IconName]: React.ComponentType<LucideProps>
}

export function Icon({ name, className, ...props }: IconProps) {
  const iconMap: IconMapType = {
    "alert-circle": AlertCircle,
    calendar: Calendar,
    "check-circle": CheckCircle,
    "chevron-up": ChevronUp,
    "chevron-down": ChevronDown,
    "chevron-left": ChevronLeft,
    "chevron-right": ChevronRight,
    clock: Clock,
    "file-text": FileText,
    heart: Heart,
    home: Home,
    info: Info,
    logout: LogOut,
    menu: Menu,
    "message-square": MessageSquare,
    moon: Moon,
    "more-vertical": MoreVertical,
    plus: Plus,
    search: Search,
    settings: Settings,
    sun: Sun,
    user: User,
    x: X,
    doctor: DoctorIcon,
    patient: PatientIcon,
    appointment: AppointmentIcon,
    prescription: PrescriptionIcon,
    notification: NotificationIcon,
    "lab-result": LabResultIcon,
  }

  const IconComponent = iconMap[name]

  if (!IconComponent) {
    return null
  }

  return <IconComponent className={cn("h-6 w-6", className)} {...props} />
}
