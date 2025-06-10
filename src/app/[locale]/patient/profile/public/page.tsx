"use client"

import { EditProfileModal } from "@/components/provider/profile/edit-profile-modal"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Rating } from "@/components/ui/rating"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useTranslations } from "next-intl"
import { useState } from "react"

interface MockReview {
  id: number
  patientName: string
  rating: number
  comment: string
}

const mockReviews: MockReview[] = [
  {
    id: 1,
    patientName: "Alice Smith",
    rating: 4,
    comment: "Excellent service! The doctor was very attentive and explained everything clearly. Highly recommend.",
  },
  {
    id: 2,
    patientName: "Bob Johnson",
    rating: 3,
    comment: "Good overall experience. The waiting time was a bit long, but the consultation was helpful.",
  },
  // Add more mock reviews as needed
]

export default function PublicProfilePage() {
  const { toast } = useToast()
  const t = useTranslations("pages.provider.profile.public")
  const tCta = useTranslations("cta")

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const handleSaveProfile = () => {
    setIsEditModalOpen(false)
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram atualizadas com sucesso.",
      variant: "success",
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">{t("label.about.subTitle1")}</h3>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={() => setIsEditModalOpen(true)}
          >
            {tCta("edit")}
          </Button>
        </div>
        <Separator className="my-4" />
        <p className="mb-6 text-gray-700">
          Lorem ipsum dolor sit amet consectetur. Sagittis felis praesent in elit netus quisque aliquam. Amet ut gravida
          elit vitae feugiat scelerisque mi urna. Viverra vulputate pharetra sagittis mauris. Amet a nullam sit
          scelerisque sit adipiscing fames volutpat lorem.
        </p>

        <div className="mb-6 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-sm font-medium text-gray-500">Endereço</h3>
            <p className="text-gray-700">Rua do Dão, nº49, 2º Andar, Bairro Central</p>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-medium text-gray-500">Informações complementares</h3>
            <p className="text-gray-700">NUIT: 000000000000</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-medium">{t("label.about.subTitle2")}</h3>
        <Separator className="my-4" />
        <div className="space-y-6">
          {mockReviews.map((review) => (
            <Card key={review.id} className="bg-system-2">
              <div className="mb-2 flex items-center">
                <div className="mr-3 h-10 w-10 overflow-hidden rounded-full">
                  <Avatar className="w-full h-full rounded-full object-cover">
                    <AvatarImage
                      src={`/images/avatar-${(review.id % 3) + 1}.png?height=40&width=40`}
                      alt={review.patientName}
                    />
                    <AvatarFallback className="bg-gray-300">
                      {review.patientName.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <p className="font-medium">{review.patientName}</p>
                </div>
                <div className="ml-auto flex items-center">
                  <Rating value={review.rating} readOnly />
                </div>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </Card>
          ))}
        </div>
      </div>

      <EditProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSave={handleSaveProfile} />
    </div>
  )
}
