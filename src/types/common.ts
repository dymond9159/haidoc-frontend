import { ReactElement } from "react"

export type AllowedFileType = "pdf" | "docx" | "image" | "txt" | "xls" | "other" | string

export interface ParamProps {
  id: string
}

export type TabItemType<T = string> = {
  label: string
  icon: ReactElement
  value: T
  href: string
}

export interface DayAvailability {
  id: string
  name: string
  enabled: boolean
  startTime: string
  endTime: string
}
