import { Checkbox } from "@/components/ui/checkbox" // Assuming these are your UI components
import { Label } from "@/components/ui/label"
import { ChevronRight, ReceiptTextIcon } from "lucide-react"
import Link from "next/link"
import React, { AnchorHTMLAttributes } from "react"

interface TermsAndConditionsProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  error?: string // Optional error message
  termsLink?: string // Optional link to full terms, default empty
}

export const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({
  checked,
  onCheckedChange,
  error,
  termsLink = "",
}) => {
  const LinkComponent: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ children, href, ...props }) => {
    return (
      <Link href={href || ""} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <div className="bg-secondary-3 border border-secondary-3 rounded-md p-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2 text-secondary -ml-0.5">
          <ReceiptTextIcon size={18} />
          <h3 className="text-sm font-medium">Termos e condições</h3>
        </div>
        {termsLink && ( // Only render the link if termsLink is provided
          <LinkComponent href={termsLink}>
            <ChevronRight size={18} className="text-secondary-11" />
          </LinkComponent>
        )}
      </div>
      <div className="flex items-start space-x-2 mt-2">
        <Checkbox
          id="terms"
          checked={checked}
          onCheckedChange={onCheckedChange}
          className={error ? "border-error-5" : ""} // Use red-500
        />
        <Label htmlFor="terms" className="text-xs font-normal leading-tight">
          Li e concordo com os termos de uso
        </Label>
      </div>
      {error && <p className="text-xs text-error-5 mt-1">{error}</p>}
    </div>
  )
}
