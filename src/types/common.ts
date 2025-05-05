export interface ParamProps {
  id: string
}

export enum PlanType {
  Business = "business",
  BusinessPlus = "business_plus",
  Company = "company",
}

export interface PlanProps {
  type: PlanType
  title: string
  price: string
  features: string[]
}
