"use client"

import { DollarSign, UserPlus, Receipt, ScrollText } from "lucide-react"
import { StatCard } from "@/components/common"
import { ApplicationStats } from "@/components/admin/applications/application-stats"
import { UserStats } from "@/components/admin/users-stats"

export default function AdminHomePage() {
  return (
    <div className="space-y-8">
      <section>
        <h3 className="mb-4 text-xl font-semibold">Usuários</h3>
        <UserStats />
      </section>

      <section>
        <h3 className="mb-4 text-xl font-semibold">Aplicações</h3>
        <ApplicationStats />
      </section>

      <div className="grid gap-8 md:grid-cols-2">
        <section>
          <h3 className="mb-4 text-xl font-semibold">Finanças</h3>
          <div className="space-y-4">
            <StatCard
              title="Faturamento total"
              value="MT 300"
              icon={<DollarSign />}
              trend={20}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <StatCard
                title="Total de Faturas"
                value="500"
                icon={<ScrollText />}
                trend={20}
              />

              <StatCard
                title="Total de Recibos"
                value="500"
                icon={<Receipt />}
                trend={0}
              />
            </div>
          </div>
        </section>

        {/* Delivery Section */}
        <section>
          <h3 className="mb-4 text-xl font-semibold">Entregas</h3>
          <div className="grid gap-4 grid-cols-2">
            <StatCard
              title="Aguardando Separação"
              value="300"
              icon={<UserPlus />}
              trend={20}
            />

            <StatCard
              title="Entregues"
              value="300"
              icon={<UserPlus />}
              trend={20}
            />

            <StatCard
              title="Aguardando motorista"
              value="300"
              icon={<UserPlus />}
              trend={20}
            />

            <StatCard
              title="A caminho"
              value="300"
              icon={<UserPlus />}
              trend={20}
            />
          </div>
        </section>
      </div>
    </div>
  )
}
