"use client"

import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { cn } from "@/lib/utils"
import { ChartOptions } from "@/types/admin"

interface ChartProps {
  title?: string
  description?: string
  footer?: React.ReactNode
  data: any[]
  config: ChartConfig
  chartType: ChartOptions
  height?: string
}

export function Chart({ title, description, data, config, footer, chartType, height }: ChartProps) {
  const ChartComponent = chartType === ChartOptions.Bar ? BarChart : LineChart

  return (
    <Card className="p-6 pt-2 pl-0 pb-2">
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className="p-0">
        <ChartContainer config={config} className={cn("w-full", height && `h-[210px]`)}>
          <ChartComponent accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={data.length > 0 ? Object.keys(data[0])[0] : ""}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} verticalAlign="top" />

            {Object.entries(config).map(([key, { color }]) =>
              chartType === ChartOptions.Bar ? (
                <Bar key={key} dataKey={key} stackId="a" fill={color} radius={[4, 4, 4, 4]} />
              ) : (
                <Line key={key} dataKey={key} stroke={color} strokeWidth={2} dot={false} type="monotone" />
              ),
            )}
          </ChartComponent>
        </ChartContainer>
      </CardContent>
      {footer && <CardFooter className="flex-col items-start gap-2 text-sm">{footer}</CardFooter>}
    </Card>
  )
}
