/*
 * Applications
 */

import {
  DeliverStatus,
  HarvestType,
  InvoiceStatus,
  PatientStatus,
  PaymentMethod,
  TaxStatus,
} from "./enum-status"
import { Party } from "./type"

export interface ApplicationColumns {
  id: string
  businessName: string
  date: string
  plan: "Normal" | "Plus"
  rejectionCount?: number
}

export interface DeliverColumns {
  id: string
  patientId: string
  patientName: string
  patientPhone: string
  patientEmail: string
  patientAddress: string
  date: string
  value: string
  status: DeliverStatus
  items: any[]
  statusHistory: any[]
  documents: any[]
  paymentMethod: string
}

export interface PatientColumns {
  id: string
  patientId: string
  patientName: string
  patientPhone: string
  patientEmail: string
  patientAddress: string
  date: string
  plan: string
  status: PatientStatus
}

export interface InvoiceColumns {
  id: string
  number: string
  issueDate: string
  unitValue: number
  plansCount: string
  paymentMethod: PaymentMethod
  status: InvoiceStatus
  issuer: Party
  customer: Party
  subtotal: number
  totalWithTaxes: number
  dueDate: string
}

export interface ReceiptColumns {
  id: string
  number: string
  issueDate: string
  unitValue: number
  plansCount: string
  paymentMethod: PaymentMethod
  issuer: Party
  customer: Party
  subtotal: number
  totalWithTaxes: number
  dueDate: string
}

/*
 * MedicalAppointment
 */

export interface MedicalAppointmentColumns {
  id: string
  patientId: string
  value: string
  date: string
  time: string
}

/*
 * Online Consultation
 */

export interface OnlineConsultationColumns extends MedicalAppointmentColumns {
  professional: string
  doctor: string
}

/*
 * Presence Consultation
 */
export interface PersonConsultationColumns extends MedicalAppointmentColumns {
  professional: string
  doctor: string
  clinica: string
}

/*
 * Pharmacy Deliveries
 */
export interface PharmacyDeliveriesColumns extends MedicalAppointmentColumns {
  pharmacy: string
}

/*
 * Harvests
 */
export interface HarvestsColumns extends MedicalAppointmentColumns {
  harvestType: HarvestType
  laboratory: string
}

/*
 * Activity-log
 */
export interface ActivityLogColumns {
  id: string | number
  name: string
  date: string
  time: string
  type: number
  description?: string
  beforeDocument?: string
  afterDocument?: string
}

/*
 * Tax
 */
export interface TaxColumns {
  id: number
  name: string
  percentage: string
  status: TaxStatus
}
