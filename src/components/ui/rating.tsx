import { cn } from "@/lib/utils"
import React, { useCallback, useMemo, useState } from "react"
import { StarFillIcon } from "../icons"

interface RatingProps {
  value: number
  max?: number
  onChange?: (value: number) => void
  readOnly?: boolean
  className?: string
  starClassName?: string
  activeColor?: string
  emptyColor?: string
  size?: "sm" | "md" | "lg"
  showValue?: boolean
  valueClassName?: string
}

export const Rating: React.FC<RatingProps> = ({
  value: initialValue,
  max = 5,
  onChange,
  readOnly = false,
  className,
  starClassName,
  activeColor = "text-rating-4",
  emptyColor = "text-gray-300",
  size = "md",
  showValue = false,
  valueClassName,
}) => {
  const [hoverValue, setHoverValue] = useState(0)
  const [internalValue, setInternalValue] = useState(initialValue)

  const value = readOnly ? internalValue : initialValue

  const handleStarClick = useCallback(
    (starValue: number) => {
      if (!readOnly) {
        setInternalValue(starValue)
        onChange?.(starValue)
      }
    },
    [readOnly, onChange],
  )

  const handleStarHover = useCallback(
    (starValue: number) => {
      if (!readOnly) {
        setHoverValue(starValue)
      }
    },
    [readOnly],
  )

  const handleMouseLeave = useCallback(() => {
    if (!readOnly) {
      setHoverValue(0)
    }
  }, [readOnly])

  const starSizeClasses = useMemo(() => {
    switch (size) {
      case "sm":
        return "h-4 w-4"
      case "lg":
        return "h-6 w-6"
      default:
        return "h-5 w-5"
    }
  }, [size])

  const displayedValue = useMemo(() => {
    if (showValue) {
      return typeof value === "number" ? value.toFixed(1) : ""
    }
    return ""
  }, [showValue, value])

  return (
    <div
      className={cn("flex items-center", className, readOnly && "pointer-events-none")}
      onMouseLeave={handleMouseLeave}
    >
      {Array.from({ length: max }).map((_, index) => {
        const starValue = index + 1
        const isFilled = starValue <= (hoverValue || value)
        const Icon = StarFillIcon

        return (
          <div
            key={starValue}
            className={cn(starSizeClasses, "transition-colors", isFilled ? activeColor : emptyColor, starClassName)}
            onClick={() => handleStarClick(starValue)}
            onMouseEnter={() => handleStarHover(starValue)}
            style={{ cursor: readOnly ? "default" : "pointer" }}
          >
            <Icon />
          </div>
        )
      })}
      {showValue && <span className={cn("ml-2 text-sm font-medium", valueClassName)}>{displayedValue}</span>}
    </div>
  )
}
