"use client"
import { useState } from "react"

import { ChartColumnIncreasingIcon, ChartLineIcon } from "lucide-react"

import { Chart } from "@/components/common"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { ThemeColor } from "@/lib/constants"
import { ChartOptions } from "@/types/admin"

export type ProjectionChartDataType = {
  month: string
  optimistic: number
  expected: number
  pessimistic: number
}

const chartConfig = {
  optimistic: {
    label: "Otimista",
    color: ThemeColor.secondary[6],
  },
  expected: {
    label: "Expectativa",
    color: ThemeColor.secondary[9],
  },
  pessimistic: {
    label: "Pessimista",
    color: ThemeColor.secondary[11],
  },
}

interface ChartSectionProps {
  title?: string
  data?: ProjectionChartDataType[]
}

export function ChartSection({ title, data = [] }: ChartSectionProps) {
  const [chartType, setChartType] = useState<ChartOptions>(ChartOptions.Bar)

  // Calculate averages for the scenarios
  const optimisticAvg = Math.round(
    data.reduce((sum, item) => sum + item.optimistic, 0) / data.length,
  )
  const expectedAvg = Math.round(
    data.reduce((sum, item) => sum + item.expected, 0) / data.length,
  )
  const pessimisticAvg = Math.round(
    data.reduce((sum, item) => sum + item.pessimistic, 0) / data.length,
  )

  return (
    <div className="space-y-8 p-1">
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <h3 className="text-lg font-medium mb-3 pl-2">{title}</h3>
          <Card>
            <div>
              <p className="text-sm text-muted-foreground">Cenário Otimista</p>
              <p className="text-md font-semibold">{optimisticAvg} por Mês</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Expectativa</p>
              <p className="text-md font-semibold">{expectedAvg} por Mês</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Cenário Pessimista
              </p>
              <p className="text-md font-semibold">{pessimisticAvg} por Mês</p>
            </div>
          </Card>
        </div>

        <div className="w-full md:w-2/3">
          <div className="flex flex-row justify-end items-center gap-3 mb-3">
            <h3 className="text-sm font-medium">Tipo de Visualização:</h3>
            <RadioGroup
              orientation="horizontal"
              defaultValue={ChartOptions.Bar}
              onValueChange={(value) => setChartType(value as ChartOptions)}
              className="flex flex-row gap-3"
            >
              <RadioGroupItem value={ChartOptions.Line}>
                <ChartLineIcon size="21" />
              </RadioGroupItem>
              <RadioGroupItem value={ChartOptions.Bar}>
                <ChartColumnIncreasingIcon size="21" />
              </RadioGroupItem>
            </RadioGroup>
          </div>
          <div className="w-full mb-2">
            <Chart
              data={data}
              config={chartConfig}
              chartType={chartType}
              height={"210px"}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
