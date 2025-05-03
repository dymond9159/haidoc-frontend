"use client"

import { UserCheck, UserPlus } from "lucide-react"

import { StatCard } from "../common"
import { UserLineChart } from "./user-line-chart"

import { ThemeColor } from "@/lib/constants"
import { generateUserData } from "@/lib/mock-data/users"
import { calculateTrend } from "@/lib/utils"
import { TimeframeOptions } from "@/types"

interface UserStatsProps {
  timeframe?: TimeframeOptions
}

export const UserStats = ({
  timeframe = TimeframeOptions.SevenDays,
}: UserStatsProps) => {
  const { newUsersData, activeUsersData } = generateUserData(timeframe)

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <StatCard
        title="Novos Usuários"
        value={newUsersData.reduce((a, b) => a + b.value, 0).toString()}
        icon={<UserPlus />}
        trend={calculateTrend(newUsersData)} // You can calculate dynamically later
        chart={
          <UserLineChart
            data={newUsersData}
            color={ThemeColor.error[5]}
            className="h-full"
          />
        }
      />

      <StatCard
        title="Usuários ativos"
        value={activeUsersData.reduce((a, b) => a + b.value, 0).toString()}
        icon={<UserCheck />}
        trend={calculateTrend(activeUsersData)}
        chart={
          <UserLineChart
            data={activeUsersData}
            color={ThemeColor.success[5]}
            className="h-full"
          />
        }
      />
    </div>
  )
}
