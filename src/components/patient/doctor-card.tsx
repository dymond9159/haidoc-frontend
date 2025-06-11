"use client"

import { CheckCircleIcon, StarFillIcon } from "@/components/icons"
import Image from "next/image"

interface DoctorCardProps {
  name: string
  image: string
  address: string
  rating: number
}

export function DoctorCard({ name, image, address, rating }: DoctorCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden relative">
      <div className="absolute top-0 left-0 bg-primary-5 text-primary-10 text-xs px-2 py-1 rounded-md flex items-center gap-1 rounded-bl-none rounded-tr-none">
        Plus Service
        <CheckCircleIcon className="w-4 h-4" />
      </div>
      <Image
        src={image || "/images/placeholder.svg"}
        alt={name}
        width={200}
        height={120}
        className="w-full h-30 object-cover rounded-lg"
      />
      <div className="px-0 py-3">
        <h3 className="font-medium text-sm mb-1">{name}</h3>
        <div className="flex flex-row gap-2">
          <p className="flex-1 text-xs text-system-10 mb-2">{address}</p>
          <div className="flex items-center gap-1 text-rating-4 flex-shrink-0">
            <StarFillIcon className="w-4 h-4" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
