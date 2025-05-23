"use client"
import { NavigationCard } from "@/components/cards"
import { BackButton } from "@/components/common"
import { HistoryIcon, UserSettingsIcon } from "@/components/icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { Loader2, LucideLayers2, Pencil, Share2, Trash2, UserRoundIcon } from "lucide-react"
import { useState } from "react"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB in bytes

const profileOptions = [
  {
    href: "/professional/profile/configurations",
    icon: <UserSettingsIcon />,
    title: "Configurações",
    description: "Atualize suas informações pessoais e senha",
  },
  {
    href: "/professional/profile/public",
    icon: <LucideLayers2 />,
    title: "Perfil público",
    description: "Veja como seu perfil aparece para outros usuários",
  },
  {
    href: "/professional/my-activity",
    icon: <HistoryIcon />,
    title: "Minhas Atividades",
    description: "Acompanhe seu histórico de ações e interações",
  },
]

export default function ProfessionalProfilePage() {
  const { toast } = useToast()
  const [avatarUrl, setAvatarUrl] = useState<string>("/images/placeholder.svg?height=120&width=120")
  const [isUploading, setIsUploading] = useState(false)

  const handleShareProfile = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Compartilhar Serviços",
          text: "Confira este perfil no Haidoc",
          url: "https://haidoc.com/admin/profile/123456790",
        })
        .then(() => {
          toast({
            title: "Sucesso",
            description: "Serviço compartilhado com sucesso!",
          })
        })
        .catch((error) => {
          toast({
            title: "Erro",
            description: "Ocorreu um erro ao compartilhar: " + error,
          })
        })
    } else {
      toast({
        title: "Compartilhar Serviços",
        description: "A funcionalidade de compartilhamento não é suportada neste dispositivo.",
      })
    }
  }

  const handleUploadImage = async () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]

      if (!file) return

      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "Erro",
          description: "O arquivo é muito grande. O tamanho máximo permitido é 5MB.",
          variant: "error",
        })
        return
      }

      setIsUploading(true)
      try {
        // Convert to WebP
        const image = new Image()
        const objectUrl = URL.createObjectURL(file)

        image.onload = async () => {
          const canvas = document.createElement("canvas")
          canvas.width = image.width
          canvas.height = image.height

          const ctx = canvas.getContext("2d")
          if (!ctx) {
            throw new Error("Could not get canvas context")
          }

          ctx.drawImage(image, 0, 0)

          // Convert to WebP with 0.8 quality
          const webpBlob = await new Promise<Blob>((resolve) => {
            canvas.toBlob(
              (blob) => {
                if (blob) resolve(blob)
              },
              "image/webp",
              0.8,
            )
          })

          // Create FormData and append the WebP image
          const formData = new FormData()
          formData.append("avatar", webpBlob, "avatar.webp")

          const response = await fetch("/api/upload-avatar", {
            method: "POST",
            body: formData,
          })

          const data = await response.json()

          if (!response.ok) {
            throw new Error(data.error || "Upload failed")
          }

          if (!data.imageUrl) {
            throw new Error("No image URL received from server")
          }

          // Update the avatar URL with the new image URL from the response
          setAvatarUrl(data.imageUrl)

          toast({
            title: "Sucesso",
            description: "Imagem de perfil atualizada com sucesso!",
          })

          // Clean up
          URL.revokeObjectURL(objectUrl)
        }

        image.onerror = () => {
          toast({
            title: "Erro",
            description: "Erro ao processar a imagem.",
            variant: "error",
          })
        }

        image.src = objectUrl
      } catch (error) {
        console.error("Upload error:", error)
        toast({
          title: "Erro",
          description: error instanceof Error ? error.message : "Ocorreu um erro ao fazer upload da imagem.",
          variant: "error",
        })
      } finally {
        setIsUploading(false)
      }
    }

    input.click()
  }

  const handleRemoveImage = () => {
    setAvatarUrl("/images/placeholder.svg?height=120&width=120")
    // TODO: Add API call to remove the avatar from the server
    toast({
      title: "Sucesso",
      description: "Imagem de perfil removida com sucesso!",
    })
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <BackButton text="Minha conta" />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-3">
          <div className="flex flex-wrap md:flex-row gap-4 items-start md:items-center">
            <div className="flex-shrink-0 relative">
              <div className="relative">
                <Avatar
                  className={cn(
                    "h-24 w-24 rounded-full object-cover border-2 border-secondary-10",
                    isUploading && "opacity-50",
                  )}
                >
                  <AvatarImage src={avatarUrl} />
                  <AvatarFallback>
                    <UserRoundIcon />
                  </AvatarFallback>
                </Avatar>

                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                )}

                <div className="absolute -right-1 -top-1 flex flex-col gap-1">
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-7 w-7 rounded-full bg-white"
                    onClick={handleUploadImage}
                    disabled={isUploading}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    <span className="sr-only">Substituir imagem</span>
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className={cn("h-7 w-7 rounded-full", "hover:bg-error-2 hover:text-error-5 hover:border-error-5")}
                    onClick={handleRemoveImage}
                    disabled={isUploading}
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
