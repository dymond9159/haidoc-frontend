"use client"

import { PlanItemCard } from "@/components/admin/finances/plan-item-card"
import { BackButton } from "@/components/common"
import { Button } from "@/components/ui"
import { Plus } from "lucide-react"
import { useRouter } from "nextjs-toploader/app"

export default function PlansPage() {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="space-y-6">
      <BackButton text="Planos" onClick={handleBack} />

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Usuários por plano</h3>
        <Button onClick={() => router.push("/admin/finances/plans/new")}>
          <Plus className="h-4 w-4" />
          Novo plano
        </Button>
      </div>

      <div>
        <h3 className="text-base font-medium mb-4">Atuais</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <PlanItemCard
            planId={"1"}
            title="Individual"
            price="Grátis"
            onEdit={() => {}}
            onDeactivate={() => {}}
            onRemove={() => {}}
          />

          <PlanItemCard
            planId="2"
            title="HaiPatient"
            price="180,00"
            onEdit={() => {}}
            onDeactivate={() => {}}
            onRemove={() => {}}
          />

          <PlanItemCard
            planId="3"
            title="HaiCompany"
            price="370,00"
            onEdit={() => {}}
            onDeactivate={() => {}}
            onRemove={() => {}}
          />

          <PlanItemCard
            planId="4"
            title="HaiFamily"
            price="200,00"
            members={6}
            onEdit={() => {}}
            onDeactivate={() => {}}
            onRemove={() => {}}
          />
        </div>
      </div>

      <div>
        <h3 className="text-base font-medium mb-4">Inativos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <PlanItemCard
            planId="5"
            title="HaiFamily Pro"
            price="580,00"
            members={15}
            onEdit={() => {}}
            onDeactivate={() => {}}
            onRemove={() => {}}
          />
        </div>
      </div>
    </div>
  )
}
