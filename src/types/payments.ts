export enum PaymentMethod {
  Card = "card",
  Mpesa = "mpesa",
  Emola = "emola",
  Paypal = "paypal",
}

export enum PlanType {
  Business = "business",
  BusinessPlus = "business_plus",
  Company = "company",
}

export enum PlanTypeForPatient {
  Individual = "individual",
  Patient = "patient",
  Family = "family",
}

export interface PlanProps {
  type: PlanType
  title: string
  price: string
  features: string[]
}

export interface PaymentMethodDetails {
  id: string
  paymentMethod: PaymentMethod
  cardName: string
  cardNumber: string
  expiryDate: string
  cvv?: string
  email?: string
  brand?: string
  isDefault?: boolean
}
