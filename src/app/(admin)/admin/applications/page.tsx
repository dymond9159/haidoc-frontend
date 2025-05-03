"use client"

import { ApplicationStats } from "@/components/admin/applications/application-stats"
import { ApplicationTable } from "@/components/admin/applications/application-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

export default function ApplicationsPageClient() {
  const [activeTab, setActiveTab] = useState<
    "pending" | "approved" | "rejected" | "canceled"
  >("pending")

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value as "pending" | "approved" | "rejected" | "canceled")
  }

  return (
    <div className="space-y-6">
      <ApplicationStats />

      <Tabs
        defaultValue="pending"
        value={activeTab}
        onValueChange={handleTabChange}
      >
        <TabsList>
          <TabsTrigger value="pending">Pendentes</TabsTrigger>
          <TabsTrigger value="approved">Aprovadas</TabsTrigger>
          <TabsTrigger value="rejected">Reprovadas</TabsTrigger>
          <TabsTrigger value="canceled">Canceladas</TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="mt-4">
          <ApplicationTable status="pending" />
        </TabsContent>
        <TabsContent value="approved" className="mt-4">
          <ApplicationTable status="approved" />
        </TabsContent>
        <TabsContent value="rejected" className="mt-4">
          <ApplicationTable status="rejected" />
        </TabsContent>
        <TabsContent value="canceled" className="mt-4">
          <ApplicationTable status="canceled" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
