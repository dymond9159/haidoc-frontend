/*
 * Chart Status
 */

export enum ChartOptions {
  Bar = "Bar",
  Line = "Line",
}

/*
 * Harvest Type
 */
export enum HarvestType {
  Laboratory = "Laboratório",
  Home = "Domicilio",
}

/*
 *  Deliver
 */
export enum DeliverStatus {
  OrderPlaced = "Pedido realizado",
  WaitingSeparation = "Esperando separação",
  WaitingDriver = "Esperando motorista",
  OnWay = "A caminho",
  Delivered = "Entregue",
  Canceled = "Cancelado",
}

/*
 * Patient
 */
export enum PatientStatus {
  Pending = "Pendente",
  Waiting = "Aguardando",
  Rejected = "Recusada",
  Completed = "Concluída",
}

/*
 * Invoice
 */
export enum InvoiceStatus {
  Paid = "Paga",
  Pending = "Pendente",
  Canceled = "Cancelada",
}

/*
 * Payment Method
 */
export enum PaymentMethod {
  CreditCard = "Cartão de crédito",
  BankTransfer = "Transferência bancária",
  Multicaixa = "Multicaixa",
}

/*
 * Taxes
 */
export enum TaxStatus {
  Active = "Ativo",
  Inactive = "Inativo",
}
