import { Checkbox } from "@/components/ui/checkbox" // Assuming these are your UI components
import { Label } from "@/components/ui/label"
import { CheckboxProps } from "@radix-ui/react-checkbox"
import { ChevronRight, ReceiptTextIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"
import React, { AnchorHTMLAttributes } from "react"
import { Asterisk } from "./asterisk"

interface TermsAndConditionsProps extends CheckboxProps {
  error?: string
  termsLink?: string
}

export const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({
  termsLink = "/terms-of-service",
  error,
  ...props
}) => {
  const tCom = useTranslations("common")

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
          <h3 className="text-sm font-medium">{tCom("termsAndConditions")}</h3>
        </div>
        {termsLink && (
          <LinkComponent href={termsLink} target="_blank">
            <ChevronRight size={18} className="text-secondary-11" />
          </LinkComponent>
        )}
      </div>
      <div className="flex items-start space-x-2 mt-2">
        <Checkbox id="terms" {...props} />
        <Label htmlFor="terms" className="text-xs font-normal leading-tight">
          {tCom("termsAndConditionsDesc")} <Asterisk />
        </Label>
      </div>
      {/* {error && <p className="text-xs text-error-5 mt-1">{error}</p>} */}
    </div>
  )
}
