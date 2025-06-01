"use client"

import { StarFillIcon } from "@/components/icons"
import Image from "next/image"

interface DoctorCardProps {
  name: string
  image: string
  address: string
  rating: number
}

export function DoctorCard({ name, image, address, rating }: DoctorCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-system-6 relative">
      <div className="absolute top-2 left-2 bg-error-5 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
        Plus Service
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="5" fill="white" />
          <path d="M6 3v6M3 6h6" stroke="#FF4242" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <Image
        src={image || "/placeholder.svg"}
        alt={name}
        width={200}
        height={120}
        className="w-full h-30 object-cover"
      />
      <div className="p-3">
        <h3 className="font-medium text-sm mb-1">{name}</h3>
        <p className="text-xs text-system-10 mb-2">{address}</p>
        <div className="flex items-center gap-1">
          <StarFillIcon className="w-4 h-4" />
          <span className="text-sm">{rating}</span>
        </div>
      </div>
    </div>
  )
}
