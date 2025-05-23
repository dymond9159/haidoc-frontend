"use client"

import { ProfileApprovedIcon, ProfilePendingIcon, ProfileUnapprovedIcon } from "@/components/icons"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { useRouter } from "nextjs-toploader/app"

export enum ProfileApprovalStatus {
  Approved = "approved",
  Pending = "pending",
  Rejected = "rejected",
  Cancelled = "cancelled",
  Suspended = "suspended",
}

interface AlertContent {
  title: string
  description: string | React.ReactNode
  icon: React.ComponentType<{ size: number; className?: string }>
  variant: "success" | "warning" | "error"
  actionButton?: {
    label: string
    onClick: () => void
  }
}

interface ProfileApprovalAlertProps {
  status: ProfileApprovalStatus
  onActionClick?: () => void
  className?: string
}

/**
 * ProfileApprovalAlert component displays different alert messages based on the profile approval status.
 * @param {ProfileApprovalStatus} status - The current approval status of the profile
 * @param {() => void} [onActionClick] - Optional callback function for the action button
 * @param {string} [className] - Optional additional CSS classes
 */
export const ProfileApprovalAlert = ({ status, onActionClick, className = "" }: ProfileApprovalAlertProps) => {
  const router = useRouter()
  const t = useTranslations("pages.provider.home.profileApproval")

  const ALERT_CONTENT: Record<ProfileApprovalStatus, AlertContent> = {
    [ProfileApprovalStatus.Pending]: {
      title: t("pending.title"),
      description: t.rich("pending.description", { bold: (chunk) => <b>{chunk}</b> }),
      icon: ProfilePendingIcon,
      variant: "warning",
    },
    [ProfileApprovalStatus.Approved]: {
      title: t("approved.title"),
      description: t("approved.description"),
      icon: ProfileApprovedIcon,
      variant: "success",
      actionButton: {
        label: t("approved.cta.label"),
        onClick: () => {
          router.push("/professional/profile/public")
        },
      },
    },
    [ProfileApprovalStatus.Rejected]: {
      title: t("rejected.title"),
      description: t("rejected.description"),
      icon: ProfileUnapprovedIcon,
      variant: "error",
    },
    [ProfileApprovalStatus.Cancelled]: {
      title: t("cancelled.title"),
      description: t("cancelled.description"),
      icon: ProfileUnapprovedIcon,
      variant: "error",
    },
    [ProfileApprovalStatus.Suspended]: {
      title: t("suspended.title"),
      description: t("suspended.description"),
      icon: ProfileUnapprovedIcon,
      variant: "error",
    },
  }

  const content = ALERT_CONTENT[status]

  if (!content) return null

  return (
    <Alert variant={content.variant} className={className}>
      <div className="flex items-center gap-4">
        <content.icon size={84} className="alert-icon hidden sm:block" />
        <div className="space-y-1">
          <AlertTitle className="flex flex-row items-center gap-2">
            <content.icon size={32} className="alert-icon sm:hidden" /> {content.title}
          </AlertTitle>
          <AlertDescription className="flex flex-col md:flex-row gap-2">
            <p>{content.description}</p>
            {content.actionButton && (
              <Button variant="secondary" size="sm" onClick={content?.actionButton?.onClick}>
                {content.actionButton.label}
              </Button>
            )}
          </AlertDescription>
        </div>
      </div>
    </Alert>
  )
}
