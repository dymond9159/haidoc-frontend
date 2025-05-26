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

export const Specialites = [
  "general-practice",
  "cardiology",
  "pediatrics",
  "gynecology-obstetrics",
  "neurology",
  "psychology",
  "psychiatry",
  "nutrition",
  "endocrinology",
  "dermatology",
  "gastroenterology",
  "infectious-disease",
  "orthopedics",
  "ent",
  "urology",
  "hematology",
  "oncology",
  "pulmonology",
  "nephrology",
  "radiology",
  "anesthesiology",
  "physical-medicine",
  "occupational-medicine",
  "sports-medicine",
  "surgery",
  "emergency-medicine",
  "immunology-allergology",
  "public-health",
]
