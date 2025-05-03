import { DeliverColumns, DeliverStatus } from "@/types/admin"

export const mockDelivery: DeliverColumns = {
  id: "1",
  patientId: "123456789",
  patientName: "Ana Maria Santos de Oliveira",
  patientPhone: "82 123 4567",
  patientEmail: "ana.maria@example.com",
  patientAddress:
    "Rua do Dão, nº49, 2º Andar, Bairro Central, Cidade de Maputo, Moçambique",
  date: "04/06/2024",
  value: "300 MZN",
  status: DeliverStatus.OnWay,
  items: [
    { name: "Paracetamol 500mg", quantity: 2, price: "150 MZN" },
    { name: "Ibuprofeno 400mg", quantity: 1, price: "150 MZN" },
  ],
  statusHistory: [
    {
      status: DeliverStatus.OrderPlaced,
      timestamp: "04/06/2024 10:30",
    },
    { status: DeliverStatus.OnWay, timestamp: "04/06/2024 10:35" },
    {
      status: DeliverStatus.WaitingDriver,
      timestamp: "04/06/2024 11:00",
    },
  ],
  documents: [
    { name: "exame.pdf", type: "pdf" },
    { name: "historico.pdf", type: "pdf" },
    { name: "exame.jpeg", type: "image" },
  ],
  paymentMethod: "E-mola",
}

// Mock data using Enum
export const mockDelivers: DeliverColumns[] = [
  {
    id: "123556",
    patientId: "123456",
    patientName: "Ana Maria Santos",
    patientPhone: "82 123 4567",
    patientEmail: "ana.maria@example.com",
    patientAddress:
      "Rua do Dão, nº49, 2º Andar, Bairro Central, Cidade de Maputo, Moçambique",
    date: "09/07/2024",
    value: "24 MZN",
    status: DeliverStatus.WaitingDriver,
    items: [
      { name: "Paracetamol 500mg", quantity: 2, price: "150 MZN" },
      { name: "Ibuprofeno 400mg", quantity: 1, price: "150 MZN" },
    ],
    statusHistory: [
      {
        status: DeliverStatus.OrderPlaced,
        timestamp: "09/07/2024 10:30",
      },
      {
        status: DeliverStatus.WaitingSeparation,
        timestamp: "09/07/2024 10:35",
      },
      {
        status: DeliverStatus.WaitingDriver,
        timestamp: "09/07/2024 11:00",
      },
    ],
    documents: [
      { name: "Receita médica.pdf", type: "pdf" },
      { name: "Comprovante de pagamento.pdf", type: "pdf" },
    ],
    paymentMethod: "Cartão de crédito",
  },
  {
    id: "123557",
    patientId: "123457",
    patientName: "João Silva",
    patientPhone: "82 234 5678",
    patientEmail: "joao.silva@example.com",
    patientAddress:
      "Av. Eduardo Mondlane, nº123, Bairro Polana, Cidade de Maputo, Moçambique",
    date: "09/07/2024",
    value: "24 MZN",
    status: DeliverStatus.OnWay,
    items: [
      { name: "Vitamina C 1000mg", quantity: 1, price: "200 MZN" },
      { name: "Máscara facial N95", quantity: 5, price: "250 MZN" },
    ],
    statusHistory: [
      {
        status: DeliverStatus.OrderPlaced,
        timestamp: "09/07/2024 09:15",
      },
      {
        status: DeliverStatus.WaitingSeparation,
        timestamp: "09/07/2024 09:20",
      },
      {
        status: DeliverStatus.WaitingDriver,
        timestamp: "09/07/2024 10:00",
      },
      { status: DeliverStatus.OnWay, timestamp: "09/07/2024 10:30" },
    ],
    documents: [{ name: "Receita médica.pdf", type: "pdf" }],
    paymentMethod: "PIX",
  },
  {
    id: "123558",
    patientId: "123458",
    patientName: "Maria Fernanda",
    patientPhone: "82 345 6789",
    patientEmail: "maria.fernanda@example.com",
    patientAddress:
      "Rua Joaquim Chissano, nº78, Bairro Sommerschield, Cidade de Maputo, Moçambique",
    date: "09/07/2024",
    value: "24 MZN",
    status: DeliverStatus.WaitingSeparation,
    items: [
      { name: "Dipirona 500mg", quantity: 2, price: "120 MZN" },
      { name: "Omeprazol 20mg", quantity: 1, price: "180 MZN" },
    ],
    statusHistory: [
      {
        status: DeliverStatus.OnWay,
        timestamp: "09/07/2024 11:45",
      },
      {
        status: DeliverStatus.WaitingSeparation,
        timestamp: "09/07/2024 11:50",
      },
    ],
    documents: [
      { name: "Receita médica.jpg", type: "image" },
      { name: "Comprovante de pagamento.pdf", type: "pdf" },
    ],
    paymentMethod: "Dinheiro",
  },
  {
    id: "123563",
    patientId: "123463",
    patientName: "Pedro Oliveira",
    patientPhone: "82 890 1234",
    patientEmail: "pedro.oliveira@example.com",
    patientAddress:
      "Av. Karl Marx, nº345, Bairro Alto Maé, Cidade de Maputo, Moçambique",
    date: "08/07/2024",
    value: "30 MZN",
    status: DeliverStatus.WaitingSeparation,
    items: [
      { name: "Metformina 850mg", quantity: 2, price: "200 MZN" },
      { name: "Glibenclamida 5mg", quantity: 1, price: "180 MZN" },
    ],
    statusHistory: [
      {
        status: DeliverStatus.OrderPlaced,
        timestamp: "08/07/2024 14:30",
      },
      {
        status: DeliverStatus.WaitingSeparation,
        timestamp: "08/07/2024 14:35",
      },
      {
        status: DeliverStatus.WaitingDriver,
        timestamp: "08/07/2024 15:15",
      },
      { status: DeliverStatus.OnWay, timestamp: "08/07/2024 15:45" },
      { status: DeliverStatus.Delivered, timestamp: "08/07/2024 16:00" },
    ],
    documents: [
      { name: "Receita médica.jpg", type: "image" },
      { name: "Comprovante de pagamento.pdf", type: "pdf" },
    ],
    paymentMethod: "Dinheiro",
  },
  {
    id: "123564",
    patientId: "123465",
    patientName: "Ricardo Silva",
    patientPhone: "82 012 3456",
    patientEmail: "ricardo.silva@example.com",
    patientAddress:
      "Av. Ahmed Sekou Touré, nº78, Bairro Polana Caniço, Cidade de Maputo, Moçambique",
    date: "08/07/2024",
    value: "30 MZN",
    status: DeliverStatus.OnWay,
    items: [
      { name: "Nimesulida 100mg", quantity: 2, price: "140 MZN" },
      { name: "Dexametasona creme", quantity: 1, price: "160 MZN" },
    ],
    statusHistory: [
      {
        status: DeliverStatus.OrderPlaced,
        timestamp: "08/07/2024 16:45",
      },
      {
        status: DeliverStatus.WaitingSeparation,
        timestamp: "08/07/2024 16:50",
      },
      { status: DeliverStatus.Canceled, timestamp: "08/07/2024 17:00" },
    ],
    documents: [
      { name: "Receita médica.jpg", type: "image" },
      { name: "Comprovante de pagamento.jpg", type: "image" },
    ],
    paymentMethod: "Transferência bancária",
  },
  {
    id: "123565",
    patientId: "123465",
    patientName: "Ricardo Silva",
    patientPhone: "82 012 3456",
    patientEmail: "ricardo.silva@example.com",
    patientAddress:
      "Av. Ahmed Sekou Touré, nº78, Bairro Polana Caniço, Cidade de Maputo, Moçambique",
    date: "08/07/2024",
    value: "30 MZN",
    status: DeliverStatus.OnWay,
    items: [
      { name: "Nimesulida 100mg", quantity: 2, price: "140 MZN" },
      { name: "Dexametasona creme", quantity: 1, price: "160 MZN" },
    ],
    statusHistory: [
      {
        status: DeliverStatus.OrderPlaced,
        timestamp: "08/07/2024 16:45",
      },
      {
        status: DeliverStatus.WaitingSeparation,
        timestamp: "08/07/2024 16:50",
      },
      { status: DeliverStatus.Canceled, timestamp: "08/07/2024 17:00" },
    ],
    documents: [
      { name: "Receita médica.jpg", type: "image" },
      { name: "Comprovante de pagamento.jpg", type: "image" },
    ],
    paymentMethod: "Transferência bancária",
  },
  {
    id: "123566",
    patientId: "123465",
    patientName: "Ricardo Silva",
    patientPhone: "82 012 3456",
    patientEmail: "ricardo.silva@example.com",
    patientAddress:
      "Av. Ahmed Sekou Touré, nº78, Bairro Polana Caniço, Cidade de Maputo, Moçambique",
    date: "08/07/2024",
    value: "30 MZN",
    status: DeliverStatus.OnWay,
    items: [
      { name: "Nimesulida 100mg", quantity: 2, price: "140 MZN" },
      { name: "Dexametasona creme", quantity: 1, price: "160 MZN" },
    ],
    statusHistory: [
      {
        status: DeliverStatus.OrderPlaced,
        timestamp: "08/07/2024 16:45",
      },
      {
        status: DeliverStatus.WaitingSeparation,
        timestamp: "08/07/2024 16:50",
      },
      { status: DeliverStatus.Canceled, timestamp: "08/07/2024 17:00" },
    ],
    documents: [
      { name: "Receita médica.jpg", type: "image" },
      { name: "Comprovante de pagamento.jpg", type: "image" },
    ],
    paymentMethod: "Transferência bancária",
  },
  {
    id: "123567",
    patientId: "123465",
    patientName: "Ricardo Silva",
    patientPhone: "82 012 3456",
    patientEmail: "ricardo.silva@example.com",
    patientAddress:
      "Av. Ahmed Sekou Touré, nº78, Bairro Polana Caniço, Cidade de Maputo, Moçambique",
    date: "08/07/2024",
    value: "30 MZN",
    status: DeliverStatus.OnWay,
    items: [
      { name: "Nimesulida 100mg", quantity: 2, price: "140 MZN" },
      { name: "Dexametasona creme", quantity: 1, price: "160 MZN" },
    ],
    statusHistory: [
      {
        status: DeliverStatus.OrderPlaced,
        timestamp: "08/07/2024 16:45",
      },
      {
        status: DeliverStatus.WaitingSeparation,
        timestamp: "08/07/2024 16:50",
      },
      { status: DeliverStatus.Canceled, timestamp: "08/07/2024 17:00" },
    ],
    documents: [
      { name: "Receita médica.jpg", type: "image" },
      { name: "Comprovante de pagamento.jpg", type: "image" },
    ],
    paymentMethod: "Transferência bancária",
  },
  {
    id: "123568",
    patientId: "123465",
    patientName: "Ricardo Silva",
    patientPhone: "82 012 3456",
    patientEmail: "ricardo.silva@example.com",
    patientAddress:
      "Av. Ahmed Sekou Touré, nº78, Bairro Polana Caniço, Cidade de Maputo, Moçambique",
    date: "08/07/2024",
    value: "30 MZN",
    status: DeliverStatus.OnWay,
    items: [
      { name: "Nimesulida 100mg", quantity: 2, price: "140 MZN" },
      { name: "Dexametasona creme", quantity: 1, price: "160 MZN" },
    ],
    statusHistory: [
      {
        status: DeliverStatus.OrderPlaced,
        timestamp: "08/07/2024 16:45",
      },
      {
        status: DeliverStatus.WaitingSeparation,
        timestamp: "08/07/2024 16:50",
      },
      { status: DeliverStatus.Canceled, timestamp: "08/07/2024 17:00" },
    ],
    documents: [
      { name: "Receita médica.jpg", type: "image" },
      { name: "Comprovante de pagamento.jpg", type: "image" },
    ],
    paymentMethod: "Transferência bancária",
  },
  {
    id: "123569",
    patientId: "123465",
    patientName: "Ricardo Silva",
    patientPhone: "82 012 3456",
    patientEmail: "ricardo.silva@example.com",
    patientAddress:
      "Av. Ahmed Sekou Touré, nº78, Bairro Polana Caniço, Cidade de Maputo, Moçambique",
    date: "08/07/2024",
    value: "30 MZN",
    status: DeliverStatus.OnWay,
    items: [
      { name: "Nimesulida 100mg", quantity: 2, price: "140 MZN" },
      { name: "Dexametasona creme", quantity: 1, price: "160 MZN" },
    ],
    statusHistory: [
      {
        status: DeliverStatus.OrderPlaced,
        timestamp: "08/07/2024 16:45",
      },
      {
        status: DeliverStatus.WaitingSeparation,
        timestamp: "08/07/2024 16:50",
      },
      { status: DeliverStatus.Canceled, timestamp: "08/07/2024 17:00" },
    ],
    documents: [
      { name: "Receita médica.jpg", type: "image" },
      { name: "Comprovante de pagamento.jpg", type: "image" },
    ],
    paymentMethod: "Transferência bancária",
  },
  {
    id: "123570",
    patientId: "123465",
    patientName: "Ricardo Silva",
    patientPhone: "82 012 3456",
    patientEmail: "ricardo.silva@example.com",
    patientAddress:
      "Av. Ahmed Sekou Touré, nº78, Bairro Polana Caniço, Cidade de Maputo, Moçambique",
    date: "08/07/2024",
    value: "30 MZN",
    status: DeliverStatus.OnWay,
    items: [
      { name: "Nimesulida 100mg", quantity: 2, price: "140 MZN" },
      { name: "Dexametasona creme", quantity: 1, price: "160 MZN" },
    ],
    statusHistory: [
      {
        status: DeliverStatus.OrderPlaced,
        timestamp: "08/07/2024 16:45",
      },
      {
        status: DeliverStatus.WaitingSeparation,
        timestamp: "08/07/2024 16:50",
      },
      { status: DeliverStatus.Canceled, timestamp: "08/07/2024 17:00" },
    ],
    documents: [
      { name: "Receita médica.jpg", type: "image" },
      { name: "Comprovante de pagamento.jpg", type: "image" },
    ],
    paymentMethod: "Transferência bancária",
  },
  {
    id: "123571",
    patientId: "123465",
    patientName: "Ricardo Silva",
    patientPhone: "82 012 3456",
    patientEmail: "ricardo.silva@example.com",
    patientAddress:
      "Av. Ahmed Sekou Touré, nº78, Bairro Polana Caniço, Cidade de Maputo, Moçambique",
    date: "08/07/2024",
    value: "30 MZN",
    status: DeliverStatus.OnWay,
    items: [
      { name: "Nimesulida 100mg", quantity: 2, price: "140 MZN" },
      { name: "Dexametasona creme", quantity: 1, price: "160 MZN" },
    ],
    statusHistory: [
      {
        status: DeliverStatus.OrderPlaced,
        timestamp: "08/07/2024 16:45",
      },
      {
        status: DeliverStatus.WaitingSeparation,
        timestamp: "08/07/2024 16:50",
      },
      { status: DeliverStatus.Canceled, timestamp: "08/07/2024 17:00" },
    ],
    documents: [
      { name: "Receita médica.jpg", type: "image" },
      { name: "Comprovante de pagamento.jpg", type: "image" },
    ],
    paymentMethod: "Transferência bancária",
  },
  {
    id: "123572",
    patientId: "123465",
    patientName: "Ricardo Silva",
    patientPhone: "82 012 3456",
    patientEmail: "ricardo.silva@example.com",
    patientAddress:
      "Av. Ahmed Sekou Touré, nº78, Bairro Polana Caniço, Cidade de Maputo, Moçambique",
    date: "08/07/2024",
    value: "30 MZN",
    status: DeliverStatus.OnWay,
    items: [
      { name: "Nimesulida 100mg", quantity: 2, price: "140 MZN" },
      { name: "Dexametasona creme", quantity: 1, price: "160 MZN" },
    ],
    statusHistory: [
      {
        status: DeliverStatus.OrderPlaced,
        timestamp: "08/07/2024 16:45",
      },
      {
        status: DeliverStatus.WaitingSeparation,
        timestamp: "08/07/2024 16:50",
      },
      { status: DeliverStatus.Canceled, timestamp: "08/07/2024 17:00" },
    ],
    documents: [
      { name: "Receita médica.jpg", type: "image" },
      { name: "Comprovante de pagamento.jpg", type: "image" },
    ],
    paymentMethod: "Transferência bancária",
  },
  {
    id: "123573",
    patientId: "123465",
    patientName: "Ricardo Silva",
    patientPhone: "82 012 3456",
    patientEmail: "ricardo.silva@example.com",
    patientAddress:
      "Av. Ahmed Sekou Touré, nº78, Bairro Polana Caniço, Cidade de Maputo, Moçambique",
    date: "08/07/2024",
    value: "30 MZN",
    status: DeliverStatus.OnWay,
    items: [
      { name: "Nimesulida 100mg", quantity: 2, price: "140 MZN" },
      { name: "Dexametasona creme", quantity: 1, price: "160 MZN" },
    ],
    statusHistory: [
      {
        status: DeliverStatus.OrderPlaced,
        timestamp: "08/07/2024 16:45",
      },
      {
        status: DeliverStatus.WaitingSeparation,
        timestamp: "08/07/2024 16:50",
      },
      { status: DeliverStatus.Canceled, timestamp: "08/07/2024 17:00" },
    ],
    documents: [
      { name: "Receita médica.jpg", type: "image" },
      { name: "Comprovante de pagamento.jpg", type: "image" },
    ],
    paymentMethod: "Transferência bancária",
  },
]

export const mockDeliverHistory: DeliverColumns[] = [
  {
    id: "123556",
    patientId: "123456",
    patientName: "Ana Maria Santos",
    patientPhone: "82 123 4567",
    patientEmail: "ana.maria@example.com",
    patientAddress:
      "Rua do Dão, nº49, 2º Andar, Bairro Central, Cidade de Maputo, Moçambique",
    date: "09/07/2024",
    value: "24 MZN",
    status: DeliverStatus.Delivered,
    items: [
      { name: "Paracetamol 500mg", quantity: 2, price: "150 MZN" },
      { name: "Ibuprofeno 400mg", quantity: 1, price: "150 MZN" },
    ],
    statusHistory: [
      {
        status: DeliverStatus.OrderPlaced,
        timestamp: "09/07/2024 10:30",
      },
      {
        status: DeliverStatus.WaitingSeparation,
        timestamp: "09/07/2024 10:35",
      },
      {
        status: DeliverStatus.WaitingDriver,
        timestamp: "09/07/2024 11:00",
      },
    ],
    documents: [
      { name: "Receita médica.pdf", type: "pdf" },
      { name: "Comprovante de pagamento.pdf", type: "pdf" },
    ],
    paymentMethod: "Cartão de crédito",
  },
  {
    id: "123557",
    patientId: "123457",
    patientName: "João Silva",
    patientPhone: "82 234 5678",
    patientEmail: "joao.silva@example.com",
    patientAddress:
      "Av. Eduardo Mondlane, nº123, Bairro Polana, Cidade de Maputo, Moçambique",
    date: "09/07/2024",
    value: "24 MZN",
    status: DeliverStatus.Canceled,
    items: [
      { name: "Vitamina C 1000mg", quantity: 1, price: "200 MZN" },
      { name: "Máscara facial N95", quantity: 5, price: "250 MZN" },
    ],
    statusHistory: [
      {
        status: DeliverStatus.OrderPlaced,
        timestamp: "09/07/2024 09:15",
      },
      {
        status: DeliverStatus.WaitingSeparation,
        timestamp: "09/07/2024 09:20",
      },
      {
        status: DeliverStatus.WaitingDriver,
        timestamp: "09/07/2024 10:00",
      },
      { status: DeliverStatus.OnWay, timestamp: "09/07/2024 10:30" },
    ],
    documents: [{ name: "Receita médica.pdf", type: "pdf" }],
    paymentMethod: "PIX",
  },
  {
    id: "123558",
    patientId: "123458",
    patientName: "Maria Fernanda",
    patientPhone: "82 345 6789",
    patientEmail: "maria.fernanda@example.com",
    patientAddress:
      "Rua Joaquim Chissano, nº78, Bairro Sommerschield, Cidade de Maputo, Moçambique",
    date: "09/07/2024",
    value: "24 MZN",
    status: DeliverStatus.Canceled,
    items: [
      { name: "Dipirona 500mg", quantity: 2, price: "120 MZN" },
      { name: "Omeprazol 20mg", quantity: 1, price: "180 MZN" },
    ],
    statusHistory: [
      {
        status: DeliverStatus.OnWay,
        timestamp: "09/07/2024 11:45",
      },
      {
        status: DeliverStatus.WaitingSeparation,
        timestamp: "09/07/2024 11:50",
      },
    ],
    documents: [
      { name: "Receita médica.jpg", type: "image" },
      { name: "Comprovante de pagamento.pdf", type: "pdf" },
    ],
    paymentMethod: "Dinheiro",
  },
  {
    id: "123563",
    patientId: "123463",
    patientName: "Pedro Oliveira",
    patientPhone: "82 890 1234",
    patientEmail: "pedro.oliveira@example.com",
    patientAddress:
      "Av. Karl Marx, nº345, Bairro Alto Maé, Cidade de Maputo, Moçambique",
    date: "08/07/2024",
    value: "30 MZN",
    status: DeliverStatus.Delivered,
    items: [
      { name: "Metformina 850mg", quantity: 2, price: "200 MZN" },
      { name: "Glibenclamida 5mg", quantity: 1, price: "180 MZN" },
    ],
    statusHistory: [
      {
        status: DeliverStatus.OrderPlaced,
        timestamp: "08/07/2024 14:30",
      },
      {
        status: DeliverStatus.WaitingSeparation,
        timestamp: "08/07/2024 14:35",
      },
      {
        status: DeliverStatus.WaitingDriver,
        timestamp: "08/07/2024 15:15",
      },
      { status: DeliverStatus.OnWay, timestamp: "08/07/2024 15:45" },
      { status: DeliverStatus.Delivered, timestamp: "08/07/2024 16:00" },
    ],
    documents: [
      { name: "Receita médica.jpg", type: "image" },
      { name: "Comprovante de pagamento.pdf", type: "pdf" },
    ],
    paymentMethod: "Dinheiro",
  },
  {
    id: "123564",
    patientId: "123465",
    patientName: "Ricardo Silva",
    patientPhone: "82 012 3456",
    patientEmail: "ricardo.silva@example.com",
    patientAddress:
      "Av. Ahmed Sekou Touré, nº78, Bairro Polana Caniço, Cidade de Maputo, Moçambique",
    date: "08/07/2024",
    value: "30 MZN",
    status: DeliverStatus.Canceled,
    items: [
      { name: "Nimesulida 100mg", quantity: 2, price: "140 MZN" },
      { name: "Dexametasona creme", quantity: 1, price: "160 MZN" },
    ],
    statusHistory: [
      {
        status: DeliverStatus.OrderPlaced,
        timestamp: "08/07/2024 16:45",
      },
      {
        status: DeliverStatus.WaitingSeparation,
        timestamp: "08/07/2024 16:50",
      },
      { status: DeliverStatus.Canceled, timestamp: "08/07/2024 17:00" },
    ],
    documents: [
      { name: "Receita médica.jpg", type: "image" },
      { name: "Comprovante de pagamento.jpg", type: "image" },
    ],
    paymentMethod: "Transferência bancária",
  },
  {
    id: "123565",
    patientId: "123465",
    patientName: "Ricardo Silva",
    patientPhone: "82 012 3456",
    patientEmail: "ricardo.silva@example.com",
    patientAddress:
      "Av. Ahmed Sekou Touré, nº78, Bairro Polana Caniço, Cidade de Maputo, Moçambique",
    date: "08/07/2024",
    value: "30 MZN",
    status: DeliverStatus.Canceled,
    items: [
      { name: "Nimesulida 100mg", quantity: 2, price: "140 MZN" },
      { name: "Dexametasona creme", quantity: 1, price: "160 MZN" },
    ],
    statusHistory: [
      {
        status: DeliverStatus.OrderPlaced,
        timestamp: "08/07/2024 16:45",
      },
      {
        status: DeliverStatus.WaitingSeparation,
        timestamp: "08/07/2024 16:50",
      },
      { status: DeliverStatus.Canceled, timestamp: "08/07/2024 17:00" },
    ],
    documents: [
      { name: "Receita médica.jpg", type: "image" },
      { name: "Comprovante de pagamento.jpg", type: "image" },
    ],
    paymentMethod: "Transferência bancária",
  },
  {
    id: "123566",
    patientId: "123465",
    patientName: "Ricardo Silva",
    patientPhone: "82 012 3456",
    patientEmail: "ricardo.silva@example.com",
    patientAddress:
      "Av. Ahmed Sekou Touré, nº78, Bairro Polana Caniço, Cidade de Maputo, Moçambique",
    date: "08/07/2024",
    value: "30 MZN",
    status: DeliverStatus.Canceled,
    items: [
      { name: "Nimesulida 100mg", quantity: 2, price: "140 MZN" },
      { name: "Dexametasona creme", quantity: 1, price: "160 MZN" },
    ],
    statusHistory: [
      {
        status: DeliverStatus.OrderPlaced,
        timestamp: "08/07/2024 16:45",
      },
      {
        status: DeliverStatus.WaitingSeparation,
        timestamp: "08/07/2024 16:50",
      },
      { status: DeliverStatus.Canceled, timestamp: "08/07/2024 17:00" },
    ],
    documents: [
      { name: "Receita médica.jpg", type: "image" },
      { name: "Comprovante de pagamento.jpg", type: "image" },
    ],
    paymentMethod: "Transferência bancária",
  },
  {
    id: "123567",
    patientId: "123465",
    patientName: "Ricardo Silva",
    patientPhone: "82 012 3456",
    patientEmail: "ricardo.silva@example.com",
    patientAddress:
      "Av. Ahmed Sekou Touré, nº78, Bairro Polana Caniço, Cidade de Maputo, Moçambique",
    date: "08/07/2024",
    value: "30 MZN",
    status: DeliverStatus.Delivered,
    items: [
      { name: "Nimesulida 100mg", quantity: 2, price: "140 MZN" },
      { name: "Dexametasona creme", quantity: 1, price: "160 MZN" },
    ],
    statusHistory: [
      {
        status: DeliverStatus.OrderPlaced,
        timestamp: "08/07/2024 16:45",
      },
      {
        status: DeliverStatus.WaitingSeparation,
        timestamp: "08/07/2024 16:50",
      },
      { status: DeliverStatus.Delivered, timestamp: "08/07/2024 17:00" },
    ],
    documents: [
      { name: "Receita médica.jpg", type: "image" },
      { name: "Comprovante de pagamento.jpg", type: "image" },
    ],
    paymentMethod: "Transferência bancária",
  },
  {
    id: "123568",
    patientId: "123465",
    patientName: "Ricardo Silva",
    patientPhone: "82 012 3456",
    patientEmail: "ricardo.silva@example.com",
    patientAddress:
      "Av. Ahmed Sekou Touré, nº78, Bairro Polana Caniço, Cidade de Maputo, Moçambique",
    date: "08/07/2024",
    value: "30 MZN",
    status: DeliverStatus.Canceled,
    items: [
      { name: "Nimesulida 100mg", quantity: 2, price: "140 MZN" },
      { name: "Dexametasona creme", quantity: 1, price: "160 MZN" },
    ],
    statusHistory: [
      {
        status: DeliverStatus.OrderPlaced,
        timestamp: "08/07/2024 16:45",
      },
      {
        status: DeliverStatus.WaitingSeparation,
        timestamp: "08/07/2024 16:50",
      },
      { status: DeliverStatus.Canceled, timestamp: "08/07/2024 17:00" },
    ],
    documents: [
      { name: "Receita médica.jpg", type: "image" },
      { name: "Comprovante de pagamento.jpg", type: "image" },
    ],
    paymentMethod: "Transferência bancária",
  },
  {
    id: "123569",
    patientId: "123465",
    patientName: "Ricardo Silva",
    patientPhone: "82 012 3456",
    patientEmail: "ricardo.silva@example.com",
    patientAddress:
      "Av. Ahmed Sekou Touré, nº78, Bairro Polana Caniço, Cidade de Maputo, Moçambique",
    date: "08/07/2024",
    value: "30 MZN",
    status: DeliverStatus.Canceled,
    items: [
      { name: "Nimesulida 100mg", quantity: 2, price: "140 MZN" },
      { name: "Dexametasona creme", quantity: 1, price: "160 MZN" },
    ],
    statusHistory: [
      {
        status: DeliverStatus.OrderPlaced,
        timestamp: "08/07/2024 16:45",
      },
      {
        status: DeliverStatus.WaitingSeparation,
        timestamp: "08/07/2024 16:50",
      },
      { status: DeliverStatus.Canceled, timestamp: "08/07/2024 17:00" },
    ],
    documents: [
      { name: "Receita médica.jpg", type: "image" },
      { name: "Comprovante de pagamento.jpg", type: "image" },
    ],
    paymentMethod: "Transferência bancária",
  },
  {
    id: "123570",
    patientId: "123465",
    patientName: "Ricardo Silva",
    patientPhone: "82 012 3456",
    patientEmail: "ricardo.silva@example.com",
    patientAddress:
      "Av. Ahmed Sekou Touré, nº78, Bairro Polana Caniço, Cidade de Maputo, Moçambique",
    date: "08/07/2024",
    value: "30 MZN",
    status: DeliverStatus.Canceled,
    items: [
      { name: "Nimesulida 100mg", quantity: 2, price: "140 MZN" },
      { name: "Dexametasona creme", quantity: 1, price: "160 MZN" },
    ],
    statusHistory: [
      {
        status: DeliverStatus.OrderPlaced,
        timestamp: "08/07/2024 16:45",
      },
      {
        status: DeliverStatus.WaitingSeparation,
        timestamp: "08/07/2024 16:50",
      },
      { status: DeliverStatus.Canceled, timestamp: "08/07/2024 17:00" },
    ],
    documents: [
      { name: "Receita médica.jpg", type: "image" },
      { name: "Comprovante de pagamento.jpg", type: "image" },
    ],
    paymentMethod: "Transferência bancária",
  },
  {
    id: "123571",
    patientId: "123465",
    patientName: "Ricardo Silva",
    patientPhone: "82 012 3456",
    patientEmail: "ricardo.silva@example.com",
    patientAddress:
      "Av. Ahmed Sekou Touré, nº78, Bairro Polana Caniço, Cidade de Maputo, Moçambique",
    date: "08/07/2024",
    value: "30 MZN",
    status: DeliverStatus.Canceled,
    items: [
      { name: "Nimesulida 100mg", quantity: 2, price: "140 MZN" },
      { name: "Dexametasona creme", quantity: 1, price: "160 MZN" },
    ],
    statusHistory: [
      {
        status: DeliverStatus.OrderPlaced,
        timestamp: "08/07/2024 16:45",
      },
      {
        status: DeliverStatus.WaitingSeparation,
        timestamp: "08/07/2024 16:50",
      },
      { status: DeliverStatus.Canceled, timestamp: "08/07/2024 17:00" },
    ],
    documents: [
      { name: "Receita médica.jpg", type: "image" },
      { name: "Comprovante de pagamento.jpg", type: "image" },
    ],
    paymentMethod: "Transferência bancária",
  },
  {
    id: "123572",
    patientId: "123465",
    patientName: "Ricardo Silva",
    patientPhone: "82 012 3456",
    patientEmail: "ricardo.silva@example.com",
    patientAddress:
      "Av. Ahmed Sekou Touré, nº78, Bairro Polana Caniço, Cidade de Maputo, Moçambique",
    date: "08/07/2024",
    value: "30 MZN",
    status: DeliverStatus.Delivered,
    items: [
      { name: "Nimesulida 100mg", quantity: 2, price: "140 MZN" },
      { name: "Dexametasona creme", quantity: 1, price: "160 MZN" },
    ],
    statusHistory: [
      {
        status: DeliverStatus.Delivered,
        timestamp: "08/07/2024 16:45",
      },
      {
        status: DeliverStatus.Delivered,
        timestamp: "08/07/2024 16:50",
      },
      { status: DeliverStatus.Canceled, timestamp: "08/07/2024 17:00" },
    ],
    documents: [
      { name: "Receita médica.jpg", type: "image" },
      { name: "Comprovante de pagamento.jpg", type: "image" },
    ],
    paymentMethod: "Transferência bancária",
  },
  {
    id: "123573",
    patientId: "123465",
    patientName: "Ricardo Silva",
    patientPhone: "82 012 3456",
    patientEmail: "ricardo.silva@example.com",
    patientAddress:
      "Av. Ahmed Sekou Touré, nº78, Bairro Polana Caniço, Cidade de Maputo, Moçambique",
    date: "08/07/2024",
    value: "30 MZN",
    status: DeliverStatus.Delivered,
    items: [
      { name: "Nimesulida 100mg", quantity: 2, price: "140 MZN" },
      { name: "Dexametasona creme", quantity: 1, price: "160 MZN" },
    ],
    statusHistory: [
      {
        status: DeliverStatus.Delivered,
        timestamp: "08/07/2024 16:45",
      },
      {
        status: DeliverStatus.Delivered,
        timestamp: "08/07/2024 16:50",
      },
      { status: DeliverStatus.Canceled, timestamp: "08/07/2024 17:00" },
    ],
    documents: [
      { name: "Receita médica.jpg", type: "image" },
      { name: "Comprovante de pagamento.jpg", type: "image" },
    ],
    paymentMethod: "Transferência bancária",
  },
]
