"use client"

import { EditServiceModal } from "@/components/provider/profile/edit-service-modal"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { useTranslations } from "next-intl"
import { useRouter } from "nextjs-toploader/app"
import { useState } from "react"

export enum ServiceCategory {
  NormalConsultation = "normalConsultation",
  UrgentConsultation = "urgentConsultation",
  FollowUpConsultation = "followUpConsultation",
  QuickChatConsultation = "quickChatConsultation",
}

export default function PublicProfileServicesPage() {
  const router = useRouter()
  const t = useTranslations("pages.provider.profile.public.services")
  const tCta = useTranslations("cta")

  const mockService = [
    {
      id: 1,
      name: t("category.normalConsultation"),
      category: ServiceCategory.NormalConsultation,
      enabled: true,
      teleconsulta: { price: "100,00 MZN", enabled: true },
      domicilio: { price: "100,00 MZN", enabled: true },
    },
    {
      id: 2,
      name: t("category.urgentConsultation"),
      category: ServiceCategory.UrgentConsultation,
      enabled: true,
      teleconsulta: { price: "100,00 MZN", enabled: true },
      domicilio: { price: "100,00 MZN", enabled: true },
    },
    {
      id: 3,
      name: t("category.followUpConsultation"),
      category: ServiceCategory.FollowUpConsultation,
      description: "(leitura de exames, diagnóstico ou prescrição médica)",
      enabled: true,
      teleconsulta: { price: "100,00 MZN", enabled: true },
      domicilio: { price: "100,00 MZN", enabled: true },
    },
    {
      id: 4,
      name: t("category.quickChatConsultation"),
      category: ServiceCategory.QuickChatConsultation,
      enabled: true,
      price: "100,00 MZN",
    },
  ]

  const [services, setServices] = useState(mockService)

  const [editingService, setEditingService] = useState<any>(null)
  const { toast } = useToast()

  const handleToggleService = (id: number) => {
    setServices(
      services.map((service) => {
        if (service.id === id) {
          return { ...service, enabled: !service.enabled }
        }
        return service
      }),
    )
  }

  const handleEditService = (service: any) => {
    if (service.id === 4) {
      setEditingService(true)
    } else {
      router.push(`/professional/profile/public/services/edit/${service.category}`)
    }
  }

  const handleSaveService = (updatedService: any) => {
    setServices(
      services.map((service) => {
        if (service.id === updatedService.id) {
          return updatedService
        }
        return service
      }),
    )
    setEditingService(null)
    toast({
      title: "Serviço atualizado",
      description: "O valor do serviço foi atualizado com sucesso.",
      variant: "success",
    })
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.id} className="rounded-lg border bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="mb-2 text-lg font-medium">
                {service.name}
                {service.description && (
                  <span className="text-sm font-normal text-gray-500"> {service.description}</span>
                )}
              </h2>
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="mr-2 text-red-500 hover:bg-red-50 hover:text-red-600"
                  onClick={() => handleEditService(service)}
                >
                  {tCta("edit")}
                </Button>
                <Switch checked={service.enabled} onCheckedChange={() => handleToggleService(service.id)} />
              </div>
            </div>

            {service.id !== 4 ? (
              <div className="flex flex-wrap gap-2">
                <div className="w-fit flex flex-row items-center justify-start rounded-full bg-secondary-1 px-4 py-2 gap-2">
                  <p className="text-sm">{t("label.teleconsulta")}</p>
                  <p className="font-medium">{service.teleconsulta?.price}</p>
                </div>
                <div className="w-fit flex flex-row items-center justify-start rounded-full bg-secondary-1 px-4 py-2 gap-2">
                  <p className="text-sm">{t("label.domicilio")}</p>
                  <p className="font-medium">{service.domicilio?.price}</p>
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <EditServiceModal
        service={editingService}
        isOpen={!!editingService}
        onClose={() => setEditingService(null)}
        onSave={handleSaveService}
      />
    </div>
  )
}
