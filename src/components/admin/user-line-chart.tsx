"use client"

import { cn } from "@/lib/utils"
import {
  LineChart as BaseLineChart,
  CartesianGrid,
  Line,
  XAxis,
  YAxis,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"

interface LineChartProps {
  data: Record<string, unknown>[]
  color: string
  height?: string
  className?: string
}

export function UserLineChart({ data, color, className }: LineChartProps) {
  const chartConfig = {
    value: {
      label: "Usuários",
      color: color,
    },
  }

  return (
    <ChartContainer
      config={chartConfig}
      className={cn("aspect-auto w-full", className)}
    >
      <BaseLineChart
        accessibilityLayer
        data={data}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid
          horizontal={true}
          vertical={false}
          strokeDasharray="3 3"
          stroke="#e5e5e5"
        />
        <XAxis
          dataKey="timeframe"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          fontSize={14}
        />
        <YAxis tickCount={5} tickLine={false} axisLine={false} fontSize={14} />
        <ChartTooltip
          content={
            <ChartTooltipContent className="w-[100px]" nameKey="value" />
          }
        />
        <Line
          dataKey="value"
          type="monotone"
          stroke="var(--color-value)"
          strokeWidth={1}
          dot={false}
          activeDot={{ r: 3 }}
        />
      </BaseLineChart>
    </ChartContainer>
  )
}
