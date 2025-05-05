export enum UserRole {
  Patient = "patient",
  Professional = "professional",
  Admin = "admin",
  Clinic = "clinic",
  Laboratory = "laboratory",
  Pharmacy = "pharmacy",
}

export interface User {
  id: string
  name: string
  email?: string
  profile?: string
  isCurrentUser?: boolean
  createdAt?: string
  role?: UserRole
}
