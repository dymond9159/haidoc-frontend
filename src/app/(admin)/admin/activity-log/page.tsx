"use client"

import type React from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatCard } from "@/components/common"
import { ActivityLogTable } from "@/components/admin/activity-log/activity-log-table"

export enum ActivityLogTab {
  Patients = "patients",
  Business = "business",
}

export const mockStatData = [
  { title: "Total de usuários", value: 120, icon: null },
  { title: "Pacientes", value: 120, icon: null },
  { title: "Usuários Business", value: 120, icon: null },
]

export default function ActivityLogPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {mockStatData?.map((item, index) => (
          <StatCard
            key={index}
            title={item.title}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </div>

      <Tabs defaultValue={ActivityLogTab.Patients} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value={ActivityLogTab.Patients} className="flex-1">
            Pacientes
          </TabsTrigger>
          <TabsTrigger value={ActivityLogTab.Business} className="flex-1">
            Usuários Business
          </TabsTrigger>
        </TabsList>

        <TabsContent value={ActivityLogTab.Patients} className="mt-0">
          <ActivityLogTable mode={ActivityLogTab.Patients} />
        </TabsContent>

        <TabsContent value={ActivityLogTab.Business} className="mt-0">
          <ActivityLogTable mode={ActivityLogTab.Business} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
