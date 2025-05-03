"use client"
import { Share2, UsersRoundIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { BackButton } from "@/components/common"
import { HistoryIcon } from "@/components/icons"
import { NavigationCard } from "@/components/admin"

const profileOptions = [
  {
    href: "/admin/profile/personal-info",
    icon: <UsersRoundIcon />,
    title: "Informações Cadastrais",
    description: "Gerencie seus dados pessoais e senha",
  },
  {
    href: "/admin/profile/my-activity",
    icon: <HistoryIcon />,
    title: "Minhas Atividades",
    description: "Visualize seu histórico de ações na plataforma",
  },
]

export default function AdminProfilePage() {
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
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="relative">
              <img
                src="/images/placeholder.svg?height=120&width=120"
                alt="Profile"
                className="h-24 w-24 rounded-full object-cover border-2 border-white shadow"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Nome do Administrador</h1>
              <p className="text-sm text-gray-500">ID: 123456790</p>
              <div className="mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-cyan-600 border-cyan-600 hover:bg-cyan-50"
                  onClick={handleShareProfile}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Compartilhar Perfil
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-sm font-medium">Endereço:</p>
              <p className="text-sm text-gray-500">
                Rua do Dão, nº49, 2º Andar, Bairro Central, Maputo, Moçambique
              </p>
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
          <div className="grid gap-6 md:grid-cols-2">
            {profileOptions.map((item, idx) => (
              <NavigationCard key={idx} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
