"use client"

import { ServiceCategoryCard } from "@/components/cards/service-category-card"
import { Asterisk, BackButton } from "@/components/common"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useParams } from "next/navigation"
import { useState } from "react"

enum ServiceTabOptions {
  OnlineConsultation = "teleconsulta",
  HomeConsultation = "domicilio",
}

export interface DayAvailability {
  id: string
  name: string
  enabled: boolean
  startTime: string
  endTime: string
}

export default function EditServiceCategoryPage() {
  const { toast } = useToast()

  const params = useParams()
  const [activeTab, setActiveTab] = useState<ServiceTabOptions>(ServiceTabOptions.OnlineConsultation)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [price, setPrice] = useState("100,00 MZN")

  // Days of week with availability settings
  const [days, setDays] = useState([
    { id: "segunda", name: "Segunda", enabled: true, startTime: "00:00", endTime: "00:00" },
    { id: "terca", name: "Terça", enabled: true, startTime: "00:00", endTime: "00:00" },
    { id: "quarta", name: "Quarta", enabled: true, startTime: "00:00", endTime: "00:00" },
    { id: "quinta", name: "Quinta", enabled: true, startTime: "00:00", endTime: "00:00" },
    { id: "sexta", name: "Sexta", enabled: true, startTime: "00:00", endTime: "00:00" },
    { id: "sabado", name: "Sábado", enabled: true, startTime: "00:00", endTime: "00:00" },
    { id: "domingo", name: "Domingo", enabled: false, startTime: "00:00", endTime: "00:00" },
  ])

  const categoryName = decodeURIComponent(params.category as string)

  const handleSave = () => {
    toast({
      title: "Serviço atualizado",
      description: "As configurações do serviço foram atualizadas com sucesso.",
      variant: "success",
    })
  }

  const handleCancel = () => {
    setIsConfirmDialogOpen(true)
  }

  const confirmCancel = () => {
    setIsConfirmDialogOpen(false)
    // Navigate back
  }

  const handleDayToggle = (dayId: string) => {
    setDays(
      days.map((day) => {
        if (day.id === dayId) {
          return { ...day, enabled: !day.enabled }
        }
        return day
      }),
    )
  }

  const handleTimeChange = (dayId: string, field: "startTime" | "endTime", value: string) => {
    setDays(
      days.map((day) => {
        if (day.id === dayId) {
          return { ...day, [field]: value }
        }
        return day
      }),
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <BackButton text={`Edição de categoria - ${categoryName}`} />
      </div>

      <div>
        <Tabs
          defaultValue={ServiceTabOptions.OnlineConsultation}
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as ServiceTabOptions)}
          className="w-full"
        >
          <TabsList className="mb-6 grid grid-cols-2">
            <TabsTrigger value={ServiceTabOptions.OnlineConsultation}>Teleconsulta</TabsTrigger>
            <TabsTrigger value={ServiceTabOptions.HomeConsultation}>Domicílio</TabsTrigger>
          </TabsList>

          <TabsContent value={ServiceTabOptions.OnlineConsultation} className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Switch id="allow-teleconsulta" defaultChecked />
                <Label htmlFor="allow-teleconsulta" className="ml-2">
                  Permitir teleconsultas
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="flex items-center">
                Preço da consulta <Asterisk />
              </Label>
              <Input id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {days.map((day) => (
                <ServiceCategoryCard
                  key={day.id}
                  day={day}
                  onDayToggle={handleDayToggle}
                  onTimeChange={handleTimeChange}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value={ServiceTabOptions.HomeConsultation} className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Switch id="allow-teleconsulta" defaultChecked />
                <Label htmlFor="allow-teleconsulta" className="ml-2">
                  Permitir consultas à domicílio
                </Label>
              </div>
            </div>

            {/* Similar content for domicilio tab */}
            <div className="space-y-2">
              <Label htmlFor="price-domicilio" className="flex items-center">
                Preço da consulta <Asterisk />
              </Label>
              <Input id="price-domicilio" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {days.map((day) => (
                <ServiceCategoryCard
                  key={day.id}
                  day={day}
                  onDayToggle={handleDayToggle}
                  onTimeChange={handleTimeChange}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-end space-x-4">
          <Button variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-red-500 hover:bg-red-600">
            Salvar
          </Button>
        </div>
      </div>

      <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancelar edição</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja cancelar? Todas as alterações serão perdidas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Voltar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmCancel}>Sim, cancelar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
