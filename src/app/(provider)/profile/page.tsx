"use client"
import { NavigationCard } from "@/components/cards"
import { BackButton } from "@/components/common"
import { HistoryIcon, UserSettingsIcon } from "@/components/icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { LucideLayers2, Pencil, Share2, Trash2, UserRoundIcon } from "lucide-react"

const profileOptions = [
  {
    href: "/profile/configurations",
    icon: <UserSettingsIcon />,
    title: "Configurações",
    description: "Atualize suas informações pessoais e senha",
  },
  {
    href: "/profile/public-profile",
    icon: <LucideLayers2 />,
    title: "Perfil público",
    description: "Veja como seu perfil aparece para outros usuários",
  },
  {
    href: "/profile/my-activity",
    icon: <HistoryIcon />,
    title: "Minhas Atividades",
    description: "Acompanhe seu histórico de ações e interações",
  },
]

export default function ProfessionalProfilePage() {
  const { toast } = useToast()

  const handleShareProfile = () => {
    // In a real implementation, this would generate a shareable link
    navigator.clipboard.writeText("https://haidoc.com/admin/profile/123456790")
    toast({
      title: "Sucesso",
      description: "Sua ação foi realizada com sucesso!",
    })
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <BackButton text="Informações Pessoais" />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-3">
          <div className="flex flex-wrap md:flex-row gap-4 items-start md:items-center">
            <div className="flex-shrink-0 relative">
              {/* <Avatar className="h-24 w-24 border-1 border-secondary-10">
                <AvatarImage src="/images/placeholder.svg?height=120&width=120" />
                <AvatarFallback>
                  <UserRoundIcon />
                </AvatarFallback>
              </Avatar> */}
              <div className="relative">
                <Avatar className="h-24 w-24 rounded-full object-cover border-2 border-secondary-10">
                  <AvatarImage src="/images/placeholder.svg?height=120&width=120" />
                  <AvatarFallback>
                    <UserRoundIcon />
                  </AvatarFallback>
                </Avatar>

                <div className="absolute -right-1 -top-1 flex flex-col gap-1">
                  <Button size="icon" variant="outline" className="h-7 w-7 rounded-full bg-white">
                    <Pencil className="h-3.5 w-3.5" />
                    <span className="sr-only">Substituir imagem</span>
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className={cn("h-7 w-7 rounded-full", "hover:bg-error-2 hover:text-error-5 hover:border-error-5")}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span className="sr-only">Remover imagem</span>
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">Nome do profissional de saúde</h1>
              <p className="text-sm text-gray-500">ID: 123456790</p>
              <div className="mt-2">
                <Button size="sm" onClick={handleShareProfile}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Compartilhar serviços
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-sm font-medium">Endereço:</p>
              <p className="text-sm text-gray-500">Rua do Dão, nº49, 2º Andar, Bairro Central, Maputo, Moçambique</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Identidade Legal:</p>
              <p className="text-sm text-gray-500">123455557d8i586u</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">NUIT:</p>
              <p className="text-sm text-gray-500">12345678910</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profileOptions.map((item, idx) => (
              <NavigationCard key={idx} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
