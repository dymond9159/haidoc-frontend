"use client"
import { useState } from "react"

import { ChartNoAxesCombinedIcon } from "lucide-react"

import { DashboardDefaultSection } from "@/components/admin/dashboard/default-section"
import { DashboardProjectionSection } from "@/components/admin/dashboard/projection-section"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toggle } from "@/components/ui/toggle"

import { TimeframeOptions } from "@/types"

export default function DashboardPage() {
  const [isProjectionActive, setIsProjectionActive] = useState(false)
  const [timeframeTabValue, setTimeframeTabValue] = useState<TimeframeOptions>(
    TimeframeOptions.SevenDays,
  )

  const [timeframeProjectionTabValue, setTimeframeProjectionTabValue] = useState<TimeframeOptions>(
    TimeframeOptions.SixMonths,
  )

  const enabledTimeframeTabs = !isProjectionActive
    ? Object.values(TimeframeOptions)
    : [TimeframeOptions.SixMonths, TimeframeOptions.Annual]

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-3 justify-end sm:justify-between">
        <Tabs
          defaultValue={isProjectionActive ? TimeframeOptions.SixMonths : TimeframeOptions.SevenDays}
          value={isProjectionActive ? timeframeProjectionTabValue : timeframeTabValue}
          onValueChange={(value) => {
            if (isProjectionActive) setTimeframeProjectionTabValue(value as TimeframeOptions)
            else setTimeframeTabValue(value as TimeframeOptions)
          }}
          className="overflow-x-auto"
        >
          <TabsList>
            {enabledTimeframeTabs?.map((item, index) => (
              <TabsTrigger key={index} value={item}>
                {item}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <Toggle
          aria-label="Projeção"
          className="ml-4"
          pressed={isProjectionActive}
          onPressedChange={setIsProjectionActive}
          asChild
        >
          <div>
            <ChartNoAxesCombinedIcon className="h-4 w-4" />
            Projeção
            <Switch
              id="projection-toggle"
              checked={isProjectionActive}
              onCheckedChange={setIsProjectionActive}
            />
          </div>
        </Toggle>
      </div>
      {!isProjectionActive ? (
        <DashboardDefaultSection timeframe={timeframeTabValue} />
      ) : (
        <DashboardProjectionSection timeframe={timeframeProjectionTabValue} />
      )}
    </div>
  )
}
