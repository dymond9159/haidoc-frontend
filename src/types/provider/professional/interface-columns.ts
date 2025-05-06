import { ConsultationCategory, ConsultationStatus, ConsultationType } from "./types"

export interface ConsultationColumns {
  id: string
  name: string
  category: ConsultationCategory
  consultationType: ConsultationType
  date: string
  time: string
  isAccepted?: boolean
}

export interface RequestConsultationColumns {
  id: string
  name: string
  category: ConsultationCategory
  date: string
  time: string
  isAccepted?: boolean
}

export interface ConsultationHistoryColumns {
  id: string
  consultationType: ConsultationType
  value: number
  status?: ConsultationStatus
  date: string
  time: string
}
