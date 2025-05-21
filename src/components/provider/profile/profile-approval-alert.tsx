"use client"

import { ProfileApprovedIcon, ProfilePendingIcon, ProfileUnapprovedIcon } from "@/components/icons"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
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
  description: string
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

const ALERT_CONTENT: Record<ProfileApprovalStatus, AlertContent> = {
  [ProfileApprovalStatus.Approved]: {
    title: "Sucesso!",
    description:
      "Seu perfil foi aprovado! Agora você pode usar sua conta, completar e ajustar todas as configurações necessárias. Certifique-se de revisar suas informações para garantir uma boa experiência.",
    icon: ProfileApprovedIcon,
    variant: "success",
    actionButton: {
      label: "Personalizar meu perfil",
      onClick: () => {},
    },
  },
  [ProfileApprovalStatus.Pending]: {
    title: "Cadastro concluído!",
    description:
      "Seus dados foram enviados para que o administrador da plataforma possa aprovar. A aprovação pode levar até 48 horas, e notificaremos você assim que seu cadastro for aprovado!",
    icon: ProfilePendingIcon,
    variant: "warning",
  },
  [ProfileApprovalStatus.Rejected]: {
    title: "Cadastro reprovado!",
    description:
      "Seu cadastro foi reprovado. Você tem até 3 tentativas para corrigir suas informações. Após editar, sua aplicação será reavaliada. Caso precise de suporte, estamos aqui para ajudar.",
    icon: ProfileUnapprovedIcon,
    variant: "error",
  },
  [ProfileApprovalStatus.Cancelled]: {
    title: "Cadastro cancelado",
    description:
      "Seu cadastro foi cancelado pelo administrador. Você pode visualizar suas informações, mas não realizar edições. Para mais informações ou dúvidas, acesse o suporte.",
    icon: ProfileUnapprovedIcon,
    variant: "error",
  },
  [ProfileApprovalStatus.Suspended]: {
    title: "Cadastro suspenso",
    description:
      "Seu cadastro foi suspenso. Você pode editar suas informações, e após correções, sua aplicação será reavaliada pelo administrador.",
    icon: ProfileUnapprovedIcon,
    variant: "error",
  },
}

/**
 * ProfileApprovalAlert component displays different alert messages based on the profile approval status.
 * @param {ProfileApprovalStatus} status - The current approval status of the profile
 * @param {() => void} [onActionClick] - Optional callback function for the action button
 * @param {string} [className] - Optional additional CSS classes
 */
export const ProfileApprovalAlert = ({ status, onActionClick, className = "" }: ProfileApprovalAlertProps) => {
  const router = useRouter()
  const content = ALERT_CONTENT[status]

  if (!content) return null

  const handleActionClick = () => {
    if (content.actionButton?.onClick) {
      content.actionButton.onClick()
    }
    if (onActionClick) {
      onActionClick()
    }
    if (status === ProfileApprovalStatus.Approved) {
      router.push("/profile/public")
    }
  }

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
              <Button variant="secondary" size="sm" onClick={handleActionClick}>
                {content.actionButton.label}
              </Button>
            )}
          </AlertDescription>
        </div>
      </div>
    </Alert>
  )
}
