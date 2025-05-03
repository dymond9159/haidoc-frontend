import { DeliverStatus, HarvestType, PatientStatus } from "./enum-status"

/*
 *  Status Color
 */
export const statusColorMap: Record<string, string> = {
  // Deliver Status Colors
  [DeliverStatus.WaitingDriver]: "bg-rating-2 text-rating-6",
  [DeliverStatus.OnWay]: "bg-warning-2 text-warning-5",
  [DeliverStatus.WaitingSeparation]: "bg-info-2 text-info-5",
  [DeliverStatus.Delivered]: "bg-success-2 text-success-6",
  [DeliverStatus.Canceled]: "bg-error-2 text-error-5",
  [DeliverStatus.OrderPlaced]: "bg-system-3 text-system-11",

  // Patient Status Colors
  [PatientStatus.Pending]: "bg-warning-2 text-warning-5",
  [PatientStatus.Waiting]: "bg-info-2 text-info-5",
  [PatientStatus.Rejected]: "bg-error-2 text-error-5",
  [PatientStatus.Completed]: "bg-success-2 text-success-6",

  [HarvestType.Laboratory]: "bg-warning-2 text-warning-5",
  [HarvestType.Home]: "bg-success-2 text-success-6",
}
