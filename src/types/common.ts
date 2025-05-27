import { ReactElement } from "react"

export type AllowedFileType = "pdf" | "docx" | "image" | "txt" | "xls" | "other" | string

export enum AccountType {
  Provider = "provider",
  Patient = "patient",
}

export enum Provider {
  Professional = "professional",
  Clinic = "clinic",
  Laboratory = "laboratory",
  Pharmacy = "pharmacy",
}

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

export enum Gender {
  Female = "female",
  Male = "male",
  NoIdendification = "other",
}

export enum GenderLabel {
  Female = "Feminino",
  Male = "Masculino",
  NoIdendification = "Prefiro Não Identificar",
}

export interface UploadedFile {
  id: string
  name: string
  size: number
}
