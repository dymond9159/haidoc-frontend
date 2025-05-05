import { ConsultationType, RequestConsultationCategory } from "./types"

export interface RequestConsultationColumns {
  id: string
  name: string
  category: RequestConsultationCategory
  date: string
  time: string
  isAccepted?: boolean
}

export interface ConsultationHistoryColumns {
  id: string
  consultationType: ConsultationType
  value: number
  date: string
  time: string
}
