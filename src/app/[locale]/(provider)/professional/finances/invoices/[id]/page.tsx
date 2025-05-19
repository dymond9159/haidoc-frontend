"use client"

import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

import { BackButton } from "@/components/common"
import { QRCode } from "@/components/common/qr-code"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { mockInvoiceDetails } from "@/lib/mock-data/finances"
import { exportElementAsJpeg, exportElementAsPdf } from "@/lib/utils"
import { InvoiceColumns } from "@/types/admin"

export default function InvoiceDetailPage() {
  const router = useRouter()
  const [invoice, setInvoice] = useState<InvoiceColumns | null>(null)
  const [isExporting, setIsExporting] = useState(false)
  const invoiceRef = useRef<HTMLDivElement>(null)

  // Fetch data
  useEffect(() => {
    const fetchDatas = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setInvoice(mockInvoiceDetails)
    }
    fetchDatas()
  }, [])

  // Mock invoice data - in a real app, this would be fetched from an API
  const handleExport = async (format: "pdf" | "jpeg") => {
    if (!invoiceRef.current) return

    setIsExporting(true)

    try {
      if (format === "pdf") {
        await exportElementAsPdf("invoice-content", `fatura-${invoice?.number}`)
      } else {
        await exportElementAsJpeg(
          "invoice-content",
          `fatura-${invoice?.number}`,
        )
      }
    } catch (error) {
      console.error(`Error exporting as ${format}:`, error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-6">
        <BackButton
          text={`Fatura ${invoice?.number}`}
          onClick={() => router.back()}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="bg-primary-9 hover:bg-primary-10 text-white"
              disabled={isExporting}
            >
              {isExporting ? "Exportando..." : "Exportar"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[120px]">
            <DropdownMenuItem onClick={() => handleExport("pdf")}>
              PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport("jpeg")}>
              JPEG
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Invoice Content - This div will be exported */}
      <div
        id="invoice-content"
        ref={invoiceRef}
        className="bg-white rounded-lg border border-system-5 p-8"
      >
        {/* Invoice Details */}
        <div className="space-y-8">
          {/* Main Invoice Info */}
          <div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-system-9 mb-1">Número da fatura</p>
                <p className="font-medium">{invoice?.number}</p>
              </div>
              <div>
                <p className="text-sm text-system-9 mb-1">Emitida em</p>
                <p className="font-medium">{invoice?.issueDate}</p>
              </div>
              <div>
                <p className="text-sm text-system-9 mb-1">Valor unitário</p>
                <p className="font-medium">{invoice?.unitValue}</p>
              </div>
              <div>
                <p className="text-sm text-system-9 mb-1">Qtd. de planos</p>
                <p className="font-medium">{invoice?.plansCount}</p>
              </div>
              <div>
                <p className="text-sm text-system-9 mb-1">
                  Método de pagamento
                </p>
                <p className="font-medium">{invoice?.paymentMethod}</p>
              </div>
              <div>
                <p className="text-sm text-system-9 mb-1">Situação</p>
                <p className="font-medium">{invoice?.status}</p>
              </div>
            </div>
          </div>

          {/* Issuer Details */}
          <div>
            <h2 className="text-lg font-medium mb-4">Detalhes do emitente</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-system-9 mb-1">Nome</p>
                <p className="font-medium">{invoice?.issuer.name}</p>
              </div>
              <div>
                <p className="text-sm text-system-9 mb-1">NUIT</p>
                <p className="font-medium">{invoice?.issuer.nuit}</p>
              </div>
              <div>
                <p className="text-sm text-system-9 mb-1">Endereço</p>
                <p className="font-medium">{invoice?.issuer.address}</p>
              </div>
              <div>
                <p className="text-sm text-system-9 mb-1">Contato</p>
                <p className="font-medium">{invoice?.issuer.email}</p>
                <p className="font-medium">{invoice?.issuer.phone}</p>
              </div>
            </div>
          </div>

          {/* Customer Details */}
          <div>
            <h2 className="text-lg font-medium mb-4">Detalhes do cliente</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-system-9 mb-1">Nome</p>
                <p className="font-medium">{invoice?.customer.name}</p>
              </div>
              <div>
                <p className="text-sm text-system-9 mb-1">NUIT</p>
                <p className="font-medium">{invoice?.customer.nuit}</p>
              </div>
              <div>
                <p className="text-sm text-system-9 mb-1">Endereço</p>
                <p className="font-medium">{invoice?.customer.address}</p>
              </div>
              <div>
                <p className="text-sm text-system-9 mb-1">Contato</p>
                <p className="font-medium">{invoice?.customer.email}</p>
                <p className="font-medium">{invoice?.customer.phone}</p>
              </div>
            </div>
          </div>

          {/* Final Value */}
          <div>
            <h2 className="text-lg font-medium mb-4">Valor final</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-system-9 mb-1">Subtotal</p>
                <p className="font-medium">{invoice?.subtotal}</p>
              </div>
              <div>
                <p className="text-sm text-system-9 mb-1">Total com impostos</p>
                <p className="font-medium">{invoice?.totalWithTaxes}</p>
              </div>
              <div>
                <p className="text-sm text-system-9 mb-1">Vencimento</p>
                <p className="font-medium">{invoice?.dueDate}</p>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center pt-4 border-t border-system-5">
            <div className="mb-2">
              <QRCode
                data="https://haidoc.com/terms-and-conditions"
                size={100}
                color="#000000"
                backgroundColor="#ffffff"
                logoUrl="/images/placeholder.svg?height=20&width=20"
              />
            </div>
            <p className="text-xs text-system-9 text-center">
              Escaneie o QR code e acesse nossos termos e condições
            </p>
          </div>
        </div>
      </div>

      {/* Export Buttons - Outside the export area */}
      <div className="flex justify-center gap-4 mt-6">
        <Button
          onClick={() => handleExport("pdf")}
          disabled={isExporting}
          className="w-40"
        >
          Exportar PDF
        </Button>
        <Button onClick={() => handleExport("jpeg")} disabled={isExporting}>
          Exportar JPEG
        </Button>
      </div>
    </div>
  )
}
