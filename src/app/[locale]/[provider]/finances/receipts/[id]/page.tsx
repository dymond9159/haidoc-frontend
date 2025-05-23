"use client"

import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

import { BackButton } from "@/components/common"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { mockReceiptDetails } from "@/lib/mock-data/finances"
import { exportElementAsJpeg, exportElementAsPdf } from "@/lib/utils"
import { ReceiptColumns } from "@/types/admin"
import { useTranslations } from "next-intl"

export default function ReceiptDetailPage() {
  const router = useRouter()
  const t = useTranslations("pages.provider.finances")
  const [receipt, setReceipt] = useState<ReceiptColumns | null>(null)
  const [isExporting, setIsExporting] = useState(false)
  const receiptRef = useRef<HTMLDivElement>(null)

  // Fetch data
  useEffect(() => {
    const fetchDatas = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setReceipt(mockReceiptDetails)
    }
    fetchDatas()
  }, [])

  // Mock invoice data - in a real app, this would be fetched from an API
  const handleExport = async (format: "pdf" | "jpeg") => {
    if (!receiptRef.current) return

    setIsExporting(true)

    try {
      if (format === "pdf") {
        await exportElementAsPdf("receipt-content", `recibo-${receipt?.number}`)
      } else {
        await exportElementAsJpeg("receipt-content", `recibo-${receipt?.number}`)
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
        <BackButton text={t("receipts.details.cta.backButton", { receiptNumber: receipt?.number ?? "" })} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-primary-9 hover:bg-primary-10 text-white" disabled={isExporting}>
              {isExporting ? t("cta.exporting") : t("cta.export")}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[120px]">
            <DropdownMenuItem onClick={() => handleExport("pdf")}>PDF</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport("jpeg")}>JPEG</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Receipt Content - This div will be exported */}
      <div id="receipt-content" ref={receiptRef} className="bg-white rounded-lg border border-system-5 p-8">
        <div className="space-y-8">
          <div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm mb-1">{t("label.receiptNumber")}</p>
                <p className="font-medium">{receipt?.number}</p>
              </div>
              <div>
                <p className="text-sm mb-1">{t("label.issueDate")}</p>
                <p className="font-medium">{receipt?.issueDate}</p>
              </div>
              <div>
                <p className="text-sm mb-1">{t("label.unitValue")}</p>
                <p className="font-medium">{receipt?.unitValue}</p>
              </div>
              <div>
                <p className="text-sm mb-1">{t("label.plansCount")}</p>
                <p className="font-medium">{receipt?.plansCount}</p>
              </div>
              <div>
                <p className="text-sm mb-1">{t("label.paymentMethod")}</p>
                <p className="font-medium">{receipt?.paymentMethod}</p>
              </div>
            </div>
          </div>

          {/* Issuer Details */}
          <div>
            <h2 className="text-lg font-medium mb-4">{t("label.issuerDetails")}</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm mb-1">{t("label.issuerName")}</p>
                <p className="font-medium">{receipt?.issuer.name}</p>
              </div>
              <div>
                <p className="text-sm mb-1">{t("label.issuerNuit")}</p>
                <p className="font-medium">{receipt?.issuer.nuit}</p>
              </div>
              <div>
                <p className="text-sm mb-1">{t("label.issuerAddress")}</p>
                <p className="font-medium">{receipt?.issuer.address}</p>
              </div>
              <div>
                <p className="text-sm mb-1">{t("label.issuerContact")}</p>
                <p className="font-medium">{receipt?.issuer.email}</p>
                <p className="font-medium">{receipt?.issuer.phone}</p>
              </div>
            </div>
          </div>

          {/* Customer Details */}
          <div>
            <h2 className="text-lg font-medium mb-4">{t("label.customerDetails")}</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm mb-1">{t("label.customerName")}</p>
                <p className="font-medium">{receipt?.customer.name}</p>
              </div>
              <div>
                <p className="text-sm mb-1">{t("label.customerNuit")}</p>
                <p className="font-medium">{receipt?.customer.nuit}</p>
              </div>
              <div>
                <p className="text-sm mb-1">{t("label.customerAddress")}</p>
                <p className="font-medium">{receipt?.customer.address}</p>
              </div>
              <div>
                <p className="text-sm mb-1">{t("label.customerContact")}</p>
                <p className="font-medium">{receipt?.customer.email}</p>
                <p className="font-medium">{receipt?.customer.phone}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center pt-4 border-t border-system-5">
            <p className="text-sm text-center">{t("label.receiptReceived")}</p>
          </div>
        </div>
      </div>

      {/* Export Buttons - Outside the export area */}
      <div className="flex justify-center gap-4 mt-6">
        <Button onClick={() => handleExport("pdf")} disabled={isExporting} className="w-40">
          {t("cta.exportPdf")}
        </Button>
        <Button onClick={() => handleExport("jpeg")} disabled={isExporting}>
          {t("cta.exportJpeg")}
        </Button>
      </div>
    </div>
  )
}
