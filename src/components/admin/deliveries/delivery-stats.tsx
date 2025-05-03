"use client"

import { useEffect, useState } from "react"
import { PackageIcon } from "lucide-react"
import { StatCard } from "@/components/common"
import {
  DeployedHistoryIcon,
  OrderBucketIcon,
  TruckIcon,
} from "@/components/icons"

interface DeliveryStatsData {
  waitingSeparation: number
  waitingDriver: number
  onWay: number
  delivered: number
  waitingSeparationChange: number
  waitingDriverChange: number
  onWayChange: number
  deliveredChange: number
}

export function DeliveryStats() {
  const [stats, setStats] = useState<DeliveryStatsData>({
    waitingSeparation: 0,
    waitingDriver: 0,
    onWay: 0,
    delivered: 0,
    waitingSeparationChange: 0,
    waitingDriverChange: 0,
    onWayChange: 0,
    deliveredChange: 0,
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setStats({
        waitingSeparation: 300,
        waitingDriver: 150,
        onWay: 75,
        delivered: 450,
        waitingSeparationChange: 20,
        waitingDriverChange: 15,
        onWayChange: -5,
        deliveredChange: 30,
      })

      setLoading(false)
    }

    fetchStats()
  }, [])

  const cards = [
    {
      title: "Aguardando Separação",
      value: stats.waitingSeparation,
      performance: stats.waitingSeparationChange,
      icon: <OrderBucketIcon />,
    },
    {
      title: "Aguardando motorista",
      value: stats.waitingDriver,
      performance: stats.waitingDriverChange,
      icon: <DeployedHistoryIcon />,
    },
    {
      title: "À caminho",
      value: stats.onWay,
      performance: stats.onWayChange,
      icon: <TruckIcon />,
    },
    {
      title: "Entregues",
      value: stats.delivered,
      performance: stats.deliveredChange,
      icon: <PackageIcon />,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <StatCard
          key={index}
          title={card.title}
          value={loading ? "..." : card.value}
          icon={card?.icon}
          trend={card.performance}
        />
      ))}
    </div>
  )
}
