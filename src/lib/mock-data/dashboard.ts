import { ProjectionChartDataType } from "@/components/admin/dashboard/chart-section"
import { TimeframeOptions } from "@/types"
import {
  HarvestsColumns,
  HarvestType,
  MedicalAppointmentColumns,
  OnlineConsultationColumns,
  PersonConsultationColumns,
  PharmacyDeliveriesColumns,
} from "@/types/admin"

const generatedIds = new Set<string>()
let sequenceNumber = 1 // Keep track of the sequence number
const generateId = () => {
  const today = new Date()
  const yearPart = today.getFullYear().toString().slice(-2) // Get last two digits of year
  const monthPart = String(today.getMonth() + 1).padStart(2, "0") // Months are 0-indexed
  const dayPart = String(today.getDate()).padStart(2, "0")
  const sequencePart = String(sequenceNumber).padStart(4, "0") // 4-digit sequence
  const id = yearPart + monthPart + dayPart + sequencePart
  generatedIds.add(id)
  sequenceNumber++ // Increment the sequence number
  return id
}

// Helper function to generate a random date string
const generateDate = (start: Date, end: Date) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  )
    .toISOString()
    .split("T")[0]
}

// Helper function to generate a random time string
const generateTime = () => {
  const hour = Math.floor(Math.random() * 24)
  const minute = Math.floor(Math.random() * 60)
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
}

// Mock data for Consultation
const mockConsultations: MedicalAppointmentColumns[] = []
for (let i = 0; i < 30; i++) {
  const id = generateId()
  mockConsultations.push({
    id: id,
    patientId: id,
    value: (Math.random() * 100 + 50).toFixed(2), // Random value between 50 and 150
    date: generateDate(new Date(2024, 0, 1), new Date()), // Random date from 2024-01-01 to today
    time: generateTime(),
  })
}

// Mock data for OnlineConsultation (inherits from Consultation)
const mockOnlineConsultations: OnlineConsultationColumns[] =
  mockConsultations.map((consultation) => ({
    ...consultation,
    professional: `Professional ${Math.floor(Math.random() * 5) + 1}`, // Random professional
    doctor: `Doctor ${String.fromCharCode(65 + Math.floor(Math.random() * 3))}`, // Random doctor (A, B, or C)
  }))

// Mock data for PersonConsultation (inherits from Consultation)
const mockPersonConsultations: PersonConsultationColumns[] =
  mockConsultations.map((consultation) => ({
    ...consultation,
    professional: `Professional ${Math.floor(Math.random() * 5) + 1}`, // Random professional
    doctor: `Doctor ${String.fromCharCode(65 + Math.floor(Math.random() * 3))}`, // Random doctor (A, B, or C)
    clinica: `Clinica ${String.fromCharCode(65 + Math.floor(Math.random() * 3))}`, // Random clinica (A, B, or C)
  }))

// Mock data for PharmacyDeliveries (inherits from Consultation)
const mockPharmacyDeliveries: PharmacyDeliveriesColumns[] =
  mockConsultations.map((consultation) => ({
    ...consultation,
    pharmacy: `Pharmacy ${String.fromCharCode(65 + Math.floor(Math.random() * 3))}`,
  }))

// Mock data for Harvests (inherits from Consultation)
const mockHarvests: HarvestsColumns[] = mockConsultations.map(
  (consultation) => ({
    ...consultation,
    harvestType:
      Math.random() < 0.5 ? HarvestType.Laboratory : HarvestType.Home,
    laboratory: `Laboratory ${String.fromCharCode(65 + Math.floor(Math.random() * 3))}`,
  }),
)

export {
  mockConsultations,
  mockHarvests,
  mockOnlineConsultations,
  mockPersonConsultations,
  mockPharmacyDeliveries,
}

const generateRandomValue = () => {
  return Math.floor(Math.random() * (800 - 100 + 1)) + 100
}

const allMonths: ProjectionChartDataType[] = [
  {
    month: "Jan",
    optimistic: generateRandomValue(),
    expected: generateRandomValue(),
    pessimistic: generateRandomValue(),
  },
  {
    month: "Feb",
    optimistic: generateRandomValue(),
    expected: generateRandomValue(),
    pessimistic: generateRandomValue(),
  },
  {
    month: "Mar",
    optimistic: generateRandomValue(),
    expected: generateRandomValue(),
    pessimistic: generateRandomValue(),
  },
  {
    month: "Apr",
    optimistic: generateRandomValue(),
    expected: generateRandomValue(),
    pessimistic: generateRandomValue(),
  },
  {
    month: "May",
    optimistic: generateRandomValue(),
    expected: generateRandomValue(),
    pessimistic: generateRandomValue(),
  },
  {
    month: "Jun",
    optimistic: generateRandomValue(),
    expected: generateRandomValue(),
    pessimistic: generateRandomValue(),
  },
  {
    month: "Jul",
    optimistic: generateRandomValue(),
    expected: generateRandomValue(),
    pessimistic: generateRandomValue(),
  },
  {
    month: "Aug",
    optimistic: generateRandomValue(),
    expected: generateRandomValue(),
    pessimistic: generateRandomValue(),
  },
  {
    month: "Sep",
    optimistic: generateRandomValue(),
    expected: generateRandomValue(),
    pessimistic: generateRandomValue(),
  },
  {
    month: "Oct",
    optimistic: generateRandomValue(),
    expected: generateRandomValue(),
    pessimistic: generateRandomValue(),
  },
  {
    month: "Nov",
    optimistic: generateRandomValue(),
    expected: generateRandomValue(),
    pessimistic: generateRandomValue(),
  },
  {
    month: "Dec",
    optimistic: generateRandomValue(),
    expected: generateRandomValue(),
    pessimistic: generateRandomValue(),
  },
]

export const mockProjectionData = (
  timeframe: TimeframeOptions,
): ProjectionChartDataType[] => {
  const today = new Date()
  const currentMonth = today.getMonth()

  switch (timeframe) {
    case TimeframeOptions.SixMonths:
      const startMonth = Math.max(0, currentMonth - 5)
      return allMonths.slice(startMonth, currentMonth + 1)
    case TimeframeOptions.Annual:
      return allMonths
    default:
      return []
  }
}
