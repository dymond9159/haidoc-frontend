import { CheckCircleIcon, StarFillIcon } from "@/components/icons"
import Image from "next/image"

interface ServiceItemProps {
  name: string
  image: string
  rating: number
}

export function ServiceItem({ name, image, rating }: ServiceItemProps) {
  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-system-6">
      <Image
        src={image || "/images/placeholder.svg"}
        alt={name}
        width={80}
        height={80}
        className="rounded-lg flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm mb-1 line-clamp-2">{name}</h4>
        <div className="flex items-center gap-1 mb-2 text-rating-4">
          <StarFillIcon className="w-4 h-4" />
          <span className="text-xs">{rating}</span>
        </div>
        <div className="w-fit bg-primary-5 text-primary-10 text-xs px-2 py-1 rounded-md flex items-center gap-1 rounded-tl-none rounded-bl-none rounded-tr-none">
          Plus Service
          <CheckCircleIcon className="w-4 h-4" />
        </div>
      </div>
    </div>
  )
}
