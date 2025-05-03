"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RequestsStats } from "@/components/admin/pre-assessments/requests-stats"
import { PatientTable } from "@/components/admin/pre-assessments/patients-table"

export enum PatientTabOption {
  Received = "received",
  Completed = "completed",
}

export default function PreAssessmentsPage() {
  const [activeTab, setActiveTab] = useState<PatientTabOption>(
    PatientTabOption.Received,
  )

  const handleTabChange = (tab: PatientTabOption) => {
    setActiveTab(tab)
  }

  return (
    <div className="space-y-6">
      <RequestsStats />

      <Tabs
        defaultValue={PatientTabOption.Received}
        value={activeTab}
        onValueChange={(current) =>
          handleTabChange(current as PatientTabOption)
        }
      >
        <TabsList>
          <TabsTrigger value={PatientTabOption.Received}>Recebidas</TabsTrigger>
          <TabsTrigger value={PatientTabOption.Completed}>
            Concluídas
          </TabsTrigger>
        </TabsList>
        <TabsContent value={PatientTabOption.Received} className="mt-4">
          <PatientTable mode={PatientTabOption.Received} />
        </TabsContent>
        <TabsContent value={PatientTabOption.Completed} className="mt-4">
          <PatientTable mode={PatientTabOption.Completed} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
