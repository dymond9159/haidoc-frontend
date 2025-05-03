import { ApplicationColumns } from "@/types/admin"
import { addDays } from "date-fns"

const mockStatuses = ["pending", "approved", "rejected"] as const
type Status = (typeof mockStatuses)[number]

export const mockApplications: ApplicationColumns[] = Array.from(
  { length: 20 },
  (_, i) => {
    const status: Status =
      mockStatuses[Math.floor(Math.random() * mockStatuses.length)]
    const rejectionCount =
      status === "rejected" ? Math.floor(Math.random() * 3) + 1 : undefined

    return {
      id: `app-${i + 1}`,
      businessName: `Farmácia com nome muito grande ${i + 1}`,
      date: addDays(new Date(2024, 6, 1), i).toISOString(),
      plan: i % 3 === 0 ? "Plus" : "Normal",
      status,
      rejectionCount,
    }
  },
)
