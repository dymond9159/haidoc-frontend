import { InvoiceColumns, InvoiceStatus, PaymentMethod, ReceiptColumns } from "@/types/admin"

export const mockInvoice: InvoiceColumns[] = [
  {
    id: "1",
    number: "INV-0001",
    issueDate: "04/06/2024",
    unitValue: 300,
    plansCount: "01",
    paymentMethod: PaymentMethod.CreditCard,
    status: InvoiceStatus.Paid,
    issuer: {
      name: "HaiDoc, LDA",
      nuit: "401701826",
      address:
        "Rua do Dão, nº49, 2º Andar, Bairro Central, Cidade de Maputo, Moçambique",
      email: "email@exemplo.com",
      phone: "(00) 00000-0000",
    },
    customer: {
      name: "Cliente com o nome muuuuito grande",
      nuit: "401701826",
      address:
        "Rua do Dão, nº49, 2º Andar, Bairro Central, Cidade de Maputo, Moçambique",
      email: "email@exemplo.com",
      phone: "(00) 00000-0000",
    },
    subtotal: 300,
    totalWithTaxes: 350,
    dueDate: "20/06/2024",
  },
  {
    id: "2",
    number: "INV-0002",
    issueDate: "05/06/2024",
    unitValue: 400,
    plansCount: "02",
    paymentMethod: PaymentMethod.BankTransfer,
    status: InvoiceStatus.Pending,
    issuer: {
      name: "HaiDoc, LDA",
      nuit: "401701826",
      address:
        "Rua do Dão, nº49, 2º Andar, Bairro Central, Cidade de Maputo, Moçambique",
      email: "email@exemplo.com",
      phone: "(00) 00000-0000",
    },
    customer: {
      name: "Farmácia Modelo",
      nuit: "201233456",
      address: "Avenida da Liberdade, Maputo, Moçambique",
      email: "contato@farmacia.com",
      phone: "(84) 91234-5678",
    },
    subtotal: 400,
    totalWithTaxes: 460,
    dueDate: "25/06/2024",
  },
]

export const mockInvoiceDetails: InvoiceColumns = {
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

export const mockReceiptDetails: ReceiptColumns = {
  id: "123456789",
  number: "123456789",
  issueDate: "09/07/2024",
  unitValue: 350,
  plansCount: "01",
  paymentMethod: PaymentMethod.CreditCard,
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
