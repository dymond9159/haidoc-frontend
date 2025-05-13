import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary-10",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground hover:border-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        "outline-destructive":
          "border border-primary bg-primary-2 text-primary shadow-xs hover:bg-primary hover:text-white hover:border-primary dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:border-accent-foreground dark:hover:bg-accent/50",
        "ghost-destructive": "hover:bg-error-2 hover:text-error-5 dark:hover:bg-error-2/90",
        link: "text-primary underline-offset-4 hover:underline",
        primary: "shadow-xs hover:bg-primary/90 h-12 bg-primary-9 hover:bg-primary-10 text-white font-medium",
        white: "bg-white font-medium text-primary-9 hover:bg-white/90",
        "primary-outline": "bg-background border-primary-9 text-primary-9",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
      colorVariant: {
        success: "bg-transparent text-success-6 hover:bg-success-2 hover:text-success-6 hover:border-success-6",
        error: "hover:bg-error-2 bg-transparent text-error-5 hover:text-error-5 hover:border-error-5",
        warning: "hover:bg-warning-2 bg-transparent text-warning-5 hover:text-warning-5 hover:border-warning-5",
        info: "hover:bg-info-2 bg-transparent text-info-5 hover:text-info-5 hover:border-info-5",
        default: "hover:bg-system-6 bg-transparent text-system-11 hover:text-system-11 hover:border-system-11",
        primary: "hover:bg-primary bg-primary-11 text-white hover:text-white",
        secondary: "hover:bg-secondary bg-transparent text-white hover:text-secondary-foreground",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
)

function Button({
  className,
  variant,
  size,
  colorVariant,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn("cursor-pointer", buttonVariants({ variant, size, colorVariant, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
