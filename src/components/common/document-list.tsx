import { AllowedFileType } from "@/types"
import {
  Download,
  Eye,
  FileArchiveIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  FileTypeIcon,
  ImageIcon,
} from "lucide-react"
import { Button } from "../ui"
import { ColumnDef, DataTable } from "./data-table"

export type Document = {
  id: string
  name: string
  type: AllowedFileType
  uploadedAt: string | Date
  url?: string
}

export interface DocumentColumn extends Document {}

interface DocumentListProps {
  documents: DocumentColumn[]
}

export function DocumentList({ documents }: DocumentListProps) {
  const getDocumentIcon = (docType: DocumentColumn["type"]) => {
    switch (docType) {
      case "pdf":
        return <FileTextIcon className="h-5 w-5 text-muted-foreground" />
      case "docx":
        return <FileTypeIcon className="h-5 w-5 text-muted-foreground" />
      case "image":
        return <ImageIcon className="h-5 w-5 text-muted-foreground" />
      case "txt":
        return <FileTextIcon className="h-5 w-5 text-muted-foreground" />
      case "xls":
        return <FileSpreadsheetIcon className="h-5 w-5 text-muted-foreground" />
      default:
        return <FileArchiveIcon className="h-5 w-5 text-muted-foreground" />
    }
  }

  const handleDownloadDocument = (doc: Document) => {
    console.log("Downloading:", doc.name, "from URL:", doc.url || `API call for ID ${doc.id}`)
    if (doc.url) {
      window.open(doc.url, "_blank")
    }
  }

  const handleViewDocument = (doc: Document) => {
    console.log("Viewing:", doc.name, "from URL:", doc.url || `API call for ID ${doc.id}`)
    if (doc.url) {
      window.open(doc.url, "_blank")
    }
  }

  const columns: ColumnDef<DocumentColumn>[] = [
    {
      accessorKey: "name",
      header: "NOME DO ARQUIVO",
      headerClassName: "text-start",
      className: "text-start py-0",
      cell: (row) => {
        const icon = getDocumentIcon(row.type)
        return (
          <div className="flex flex-row gap-2 items-center">
            {icon}
            <span className="truncate">{row.name}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "uploadedAt",
      header: "DATA DE UPLOAD",
      className: "text-start py-0",
      cell: (row) => {
        const uploadedAt = row.uploadedAt
        const formattedDate =
          typeof uploadedAt === "string" ? uploadedAt : (uploadedAt as Date)?.toLocaleDateString() || "N/A"
        return <span className="text-sm">{formattedDate}</span>
      },
    },
    {
      accessorKey: "actions",
      header: "OPÇÕES",
      className: "text-center py-0",
      cell: (row) => {
        const doc = row
        return (
          <div className="flex justify-center space-x-1 md:space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="px-1 py-1"
              onClick={() => handleDownloadDocument(doc)}
              title="Download"
            >
              <Download size={16} />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => handleViewDocument(doc)} title="Visualizar">
              <Eye size={16} />
            </Button>
          </div>
        )
      },
    },
  ]

  return (
    <div>
      <DataTable data={documents} columns={columns} isLoading={false} borderable={false} />
    </div>
  )
}
