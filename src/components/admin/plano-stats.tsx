import { ThemeColor } from "@/lib/constants"
import { generateUserData } from "@/lib/mock-data/users"
import { calculateTrend } from "@/lib/utils"
import { TimeframeOptions } from "@/types"
import { StatCard } from "../common"
import { UserLineChart } from "./user-line-chart"

interface PlanoStatsProps {
  timeframe?: TimeframeOptions
}

export const PlanoStats = ({ timeframe }: PlanoStatsProps) => {
  const { newUsersData, activeUsersData } = generateUserData(
    timeframe || TimeframeOptions.SixMonths,
  )

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <StatCard
        title="Individual"
        value={newUsersData.reduce((a, b) => a + b.value, 0).toString()}
        trend={calculateTrend(newUsersData)}
        chart={
          <UserLineChart
            data={newUsersData}
            color={ThemeColor.success[5]}
            className="h-full"
          />
        }
      />

      <StatCard
        title="HaiPatient"
        value={activeUsersData.reduce((a, b) => a + b.value, 0).toString()}
        trend={calculateTrend(activeUsersData)}
        chart={
          <UserLineChart
            data={activeUsersData}
            className="h-full"
            color={ThemeColor.success[5]}
          />
        }
      />
    </div>
  )
}
