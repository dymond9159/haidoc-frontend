import { TaxColumns, TaxStatus } from "@/types/admin"

// Mock data for demonstration
export const mockFees: TaxColumns[] = [
  { id: 1, name: "Nome da taxa", percentage: "25%", status: TaxStatus.Active },
  { id: 2, name: "Nome da taxa", percentage: "32%", status: TaxStatus.Active },
  {
    id: 3,
    name: "Nome da taxa",
    percentage: "32%",
    status: TaxStatus.Inactive,
  },
  { id: 4, name: "Nome da taxa", percentage: "15%", status: TaxStatus.Active },
  { id: 5, name: "Nome da taxa", percentage: "32%", status: TaxStatus.Active },
  {
    id: 6,
    name: "Nome da taxa",
    percentage: "32%",
    status: TaxStatus.Inactive,
  },
  { id: 7, name: "Nome da taxa", percentage: "32%", status: TaxStatus.Active },
  { id: 8, name: "Nome da taxa", percentage: "32%", status: TaxStatus.Active },
  { id: 9, name: "Nome da taxa", percentage: "32%", status: TaxStatus.Active },
]
