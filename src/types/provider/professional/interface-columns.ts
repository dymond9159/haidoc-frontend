import { RequestConsultationCategory } from "./types"

export interface RequestConsultationColumns {
  id: string
  name: string
  category: RequestConsultationCategory
  date: string
  time: string
  isAccepted?: boolean
}
