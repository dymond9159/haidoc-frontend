"use client"

import type React from "react"

import { ChevronDownIcon } from "lucide-react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

// Mock data for quotes
const quotesData = [
  {
    id: "1",
    labName: "Nome do Laboratórioooooooooooooooo",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rectangle%20767-VR7jOvQ24dE0sHDsUMLDa3mxdeYv7o.png",
    address: "Rua do Dão, nº49, 2º Andar, Bairro Central",
    total: "200.00 MZN",
    exams: [
      { name: "Nome do exame", price: "100.00 MZN" },
      { name: "Nome do exame", price: "100.00 MZN" },
    ],
  },
  {
    id: "2",
    labName: "Nome do Laboratórioooooooooooooooo",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rectangle%20767-VR7jOvQ24dE0sHDsUMLDa3mxdeYv7o.png",
    address: "Rua do Dão, nº49, 2º Andar, Bairro Central",
    total: "250.00 MZN",
    exams: [
      { name: "Nome do exame", price: "100.00 MZN" },
      { name: "Nome do exame", price: "100.00 MZN" },
      { name: "Nome do exame", price: "50.00 MZN" },
    ],
  },
]

export default function QuotesPage() {
  const params = useParams()
  const router = useRouter()
  const [expandedQuote, setExpandedQuote] = useState<string | null>("1")

  const handleQuoteClick = (quoteId: string, isExpanded: boolean) => {
    if (isExpanded) {
      router.push(`/exames/aceitar-cotacao/${quoteId}`)
    }
  }

  const toggleExpanded = (quoteId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setExpandedQuote(expandedQuote === quoteId ? null : quoteId)
  }

  return (
    <div className="space-y-8">
      {quotesData.map((quote) => {
        const isExpanded = expandedQuote === quote.id
        return (
          <div
            key={quote.id}
            className="bg-white border border-system-6 rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleQuoteClick(quote.id, isExpanded)}
          >
            <div className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={quote.image || "/placeholder.svg"}
                    alt={quote.labName}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm mb-1">{quote.labName}</h3>
                  <p className="text-xs text-system-10 mb-3">{quote.address}</p>

                  {isExpanded && (
                    <div className="space-y-2 mb-4">
                      {quote.exams.map((exam, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span>{exam.name}</span>
                          <span className="text-haidoc-blue">{exam.price}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="bg-haidoc-blue text-white px-3 py-1 rounded text-sm font-medium">TOTAL</div>
                    <span className="font-medium text-haidoc-blue">{quote.total}</span>
                  </div>
                </div>
                <button onClick={(e) => toggleExpanded(quote.id, e)} className="p-1 hover:bg-system-3 rounded">
                  <ChevronDownIcon
                    className={`w-4 h-4 text-system-10 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
