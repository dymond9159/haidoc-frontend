import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        "secondary-light": "border-secondary-3 bg-secondary-3 text-secondary",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        info: "border-info-2 bg-info-2 text-info-5",
        warning: "border-warning-2 bg-warning-2 text-warning-5",
        success: "border-success-2 bg-success-2 text-success-5",
        error: "border-error-2 bg-error-2 text-error-5",
        outline: "text-foreground",
      },
      size: {
        xs: "px-1.5 py-0.5 text-xs",
        md: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
        xl: "px-4 py-1.5 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
