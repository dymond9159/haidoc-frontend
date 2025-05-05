import { PatientStatus } from "@/types/admin"

import { DeliverStatus } from "@/types/admin"

export const DeliverStatusList = [
  DeliverStatus.WaitingDriver,
  DeliverStatus.OnWay,
  DeliverStatus.WaitingSeparation,
  DeliverStatus.Canceled,
  DeliverStatus.Delivered,
  DeliverStatus.OrderPlaced,
]

export const PatientStatusList = [
  PatientStatus.Pending,
  PatientStatus.Waiting,
  PatientStatus.Completed,
  PatientStatus.Rejected,
]
