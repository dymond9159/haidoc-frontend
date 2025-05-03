"use client"

import type React from "react"

import { useState } from "react"
import { DeliveryStats } from "@/components/admin/deliveries/delivery-stats"
import { DeliverTable } from "@/components/admin/deliveries/delivers-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export enum DeliverTabOption {
  Order = "order",
  History = "history",
}

export default function DeliveriesPage() {
  const [activeTab, setActiveTab] = useState<DeliverTabOption>(
    DeliverTabOption.Order,
  )

  const handleTabChange = (tab: DeliverTabOption) => {
    setActiveTab(tab)
  }

  return (
    <div className="space-y-6">
      <DeliveryStats />
      <Tabs
        defaultValue={DeliverTabOption.Order}
        value={activeTab}
        onValueChange={(current) =>
          handleTabChange(current as DeliverTabOption)
        }
      >
        <TabsList>
          <TabsTrigger value={DeliverTabOption.Order}>
            Pedidos atuais
          </TabsTrigger>
          <TabsTrigger value={DeliverTabOption.History}>Histórico</TabsTrigger>
        </TabsList>
        <TabsContent value={DeliverTabOption.Order} className="mt-4">
          <DeliverTable mode={DeliverTabOption.Order} />
        </TabsContent>
        <TabsContent value={DeliverTabOption.History} className="mt-4">
          <DeliverTable mode={DeliverTabOption.History} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
