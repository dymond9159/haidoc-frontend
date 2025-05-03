import { InvoiceColumns, InvoiceStatus, PaymentMethod } from "@/types/admin"

export const mockInvoice: InvoiceColumns = {
  id: "123456789",
  number: "123456789",
  issueDate: "09/07/2024",
  unitValue: 350,
  plansCount: "01",
  paymentMethod: PaymentMethod.CreditCard,
  status: InvoiceStatus.Paid,
  issuer: {
    name: "HaiDoc, LDA",
    nuit: "401701826",
    address:
      "Rua do Dão, nº49, 2º Andar, Bairro Central, Cidade de Maputo, Moçambique",
    email: "Email@exemplo.com",
    phone: "(00) 00000-0000",
  },
  customer: {
    name: "Farmácia com nome muuuuito graaaaaaaaaaaaande",
    nuit: "401701826",
    address:
      "Rua do Dão, nº49, 2º Andar, Bairro Central, Cidade de Maputo, Moçambique",
    email: "Email@exemplo.com",
    phone: "(00) 00000-0000",
  },
  subtotal: 300,
  totalWithTaxes: 350,
  dueDate: "20/07/2024",
}
