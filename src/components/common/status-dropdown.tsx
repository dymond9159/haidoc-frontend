"use client"

import { useState } from "react"
import { ChevronDown, Loader2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { statusColorMap } from "@/types/admin"

interface StatusDropdownProps<T> {
  status: T
  availableStatus: T[]
  onStatusChange: (newStatus: T) => Promise<void>
}

export function StatusDropdown<T>({
  status,
  availableStatus,
  onStatusChange,
}: StatusDropdownProps<T>) {
  const [isChanging, setIsChanging] = useState(false)

  const handleStatusChange = async (newStatus: T) => {
    setIsChanging(true)
    try {
      await onStatusChange(newStatus)
    } finally {
      setIsChanging(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "cursor-pointer px-3 py-1 rounded-full text-sm font-medium inline-flex items-center transition-colors duration-150",
            statusColorMap[status as string],
            isChanging && "bg-transparent text-foreground",
          )}
          disabled={isChanging}
        >
          {isChanging ? (
            <>
              <Loader2 className="mr-1 h-3 w-3 animate-spin" />
              Mudando...
            </>
          ) : (
            <>
              {status} {/* Enum implicitly converts to string */}
              <ChevronDown className="ml-1 h-4 w-4 opacity-70" />
            </>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {availableStatus?.map((item, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => handleStatusChange(item as T)}
          >
            {item as string}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
