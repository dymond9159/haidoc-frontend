import clsx from "clsx"
import Link from "next/link"

import { ArrowRightIcon } from "lucide-react"

interface LinkButtonProps {
  href: string
  children: React.ReactNode
  variant?: "primary" | "secondary"
  icon?: boolean
  className?: string
}

export default function LinkButton({ href, children, variant = "primary", icon = true, className }: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={clsx(
        "text-sm font-semibold transition-colors",
        {
          "text-primary-9 hover:text-primary-10": variant === "primary",
          "text-secondary-9 hover:text-secondary-10": variant === "secondary",
        },
        className,
      )}
    >
      {children}
      {icon && <ArrowRightIcon className="ml-2 inline-block" size={16} />}
    </Link>
  )
}
