import { StarFillIcon } from "@/components/icons"
import Image from "next/image"

interface ServiceItemProps {
  name: string
  image: string
  rating: number
}

export function ServiceItem({ name, image, rating }: ServiceItemProps) {
  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-system-6">
      <Image src={image || "/placeholder.svg"} alt={name} width={60} height={60} className="rounded-lg flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm mb-1 line-clamp-2">{name}</h4>
        <div className="flex items-center gap-1 mb-1">
          <StarFillIcon className="w-3 h-3" />
          <span className="text-xs">{rating}</span>
        </div>
        <div className="inline-block bg-error-5 text-white text-xs px-2 py-0.5 rounded-md flex items-center gap-1">
          Plus Service
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <circle cx="5" cy="5" r="4" fill="white" />
            <path d="M5 2v6M2 5h6" stroke="#FF4242" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}
