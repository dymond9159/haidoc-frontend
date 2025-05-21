import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

const alertVariants = cva(
  // use explicit grid and spacing that works across icon sizes
  "relative w-full rounded-lg border px-4 py-3 text-sm grid grid-cols-[auto_1fr] gap-x-4 items-center",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive: "text-destructive bg-card *:data-[slot=alert-description]:text-destructive/90",
        info: "bg-info-1 text-info-6 border-info-1",
        warning: "bg-warning-2 text-warning-5 border-warning-2",
        success: "bg-success-2 text-success-6 border-success-2",
        error: "bg-error-2 text-error-6 border-error-2",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

type AlertProps = React.ComponentProps<"div"> & VariantProps<typeof alertVariants>

function Alert({ className, variant, ...props }: AlertProps) {
  return <div data-slot="alert" role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-title" className={cn("font-medium tracking-tight", className)} {...props} />
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="alert-description" className={cn("text-sm [&_p]:leading-relaxed mt-2", className)} {...props} />
  )
}

function AlertIcon({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-icon" className={cn("text-sm [&_p]:leading-relaxed mt-3", className)} {...props} />
}

export { Alert, AlertDescription, AlertIcon, AlertTitle }
