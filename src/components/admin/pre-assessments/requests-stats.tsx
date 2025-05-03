"use client"

import { useEffect, useState } from "react"
import { StatCard } from "@/components/common"

interface RequestStatsData {
  receivedRequests: number
  completedRequests: number
}

export function RequestsStats() {
  const [stats, setStats] = useState<RequestStatsData>({
    receivedRequests: 0,
    completedRequests: 0,
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setStats({
        receivedRequests: 300,
        completedRequests: 130,
      })

      setLoading(false)
    }

    fetchStats()
  }, [])

  const cards = [
    {
      title: "Solicitações recebidas",
      value: stats.receivedRequests,
    },
    {
      title: "Solicitações concluídas",
      value: stats.completedRequests,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
      {cards.map((card, index) => (
        <StatCard
          key={index}
          title={card.title}
          value={loading ? "..." : card.value}
        />
      ))}
    </div>
  )
}
