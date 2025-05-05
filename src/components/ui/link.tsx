import clsx from "clsx"
import Link from "next/link"

import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

interface LinkButtonProps {
  href: string
  children: React.ReactNode
  variant?: "primary" | "secondary" | "default"
  icon?: boolean
  className?: string
  onClick?: () => void
  direction?: "left" | "right"
}

export default function LinkButton({
  href,
  children,
  variant = "primary",
  icon = true,
  className,
  direction = "right",
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={clsx(
        "text-sm font-semibold transition-colors",
        {
          "text-foreground hover:text-secondary": variant === "default",
          "text-primary-9 hover:text-primary-10": variant === "primary",
          "text-secondary-9 hover:text-secondary-10": variant === "secondary",
        },
        className,
      )}
    >
      {direction === "left" && icon && <ArrowLeftIcon className="mr-2 inline-block" size={16} />}
      {children}
      {direction === "right" && icon && <ArrowRightIcon className="ml-2 inline-block" size={16} />}
    </Link>
  )
}
