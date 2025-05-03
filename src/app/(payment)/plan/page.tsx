"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useRouter } from "next/navigation"
import "./styles.css"

export default function PlansPage() {
  const router = useRouter()

  const handleContinue = () => {
    router.push("/professional/home")
  }

  const handleSubscribe = () => {
    router.push("/subscription")
  }

  const handleProposal = () => {
    router.push("/proposal")
  }

  return (
    <div className="space-y-0">
      {/* Header with background */}
      <div className="relative -mx-4 mb-6 plan-header-bg py-10">
        <div className="relative z-10 text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-800">Conheça Nossos Planos</h1>
          <p className="mx-auto max-w-2xl text-center text-gray-600">
            Explore soluções personalizadas para otimizar seus serviços e impulsionar seus negócios.
          </p>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y border border-blue-200 md:grid-cols-3 md:divide-x md:divide-y-0">
        {/* HaiDoc Business */}
        <div className="flex flex-col p-6">
          <div className="mb-4">
            <h3 className="text-xl font-medium text-blue-500">HaiDoc Business</h3>
            <div className="mt-2 text-2xl font-bold text-red-500">GRATUITO</div>
          </div>

          <div className="space-y-1">
            <FeatureItem text="Conta gratuita" />
            <FeatureItem text="Saque de fundos mensal após dedução de taxas" />
            <FeatureItem text="Acesso a serviços de business na plataforma" />
            <FeatureItem text="Ferramentas básicas de gerenciamento de agendamentos (consultas, marcações, etc.)" />
          </div>

          <div className="mt-auto pt-6">
            <Button onClick={handleContinue} className="w-full bg-red-500 hover:bg-red-600">
              Continuar
            </Button>
          </div>
        </div>

        {/* HaiDoc Business Plus */}
        <div className="flex flex-col p-6">
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-medium text-blue-500">HaiDoc Business Plus</h3>
              <Badge className="bg-red-500 text-white hover:bg-red-600">EM DESTAQUE</Badge>
            </div>
            <div className="mt-2 text-2xl font-bold">1.499 MZN/Mês</div>
          </div>

          <div className="space-y-1">
            <FeatureItem text="Todos os benefícios do plano HaiDoc Business +" />
            <FeatureItem text="Saque de fundos quinzenalmente após dedução de taxas" />
            <FeatureItem text="Gerenciamento de agenda personalizada para o seu negócio (consultas, marcações, etc.)" />
            <FeatureItem text="Análises de desempenho e relatórios personalizados" />
            <FeatureItem text="Destaque do provedor de saúde para todos os pacientes" />
            <FeatureItem text="Inclusão na lista de Serviços Recomendados da Plataforma aos pacientes" />
            <FeatureItem text="Acesso a uma linha de apoio ao cliente 24/7" />
          </div>

          <div className="mt-auto pt-6">
            <Button onClick={handleSubscribe} className="w-full bg-red-500 hover:bg-red-600">
              Assinar
            </Button>
          </div>
        </div>

        {/* HaiDoc Company */}
        <div className="flex flex-col p-6">
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-medium text-blue-500">HaiDoc Company</h3>
              <Badge className="bg-red-500 text-white hover:bg-red-600">EM DESTAQUE</Badge>
            </div>
            <div className="mt-2 text-2xl font-bold">3.980 MZN/Mês</div>
          </div>

          <div className="space-y-1">
            <FeatureItem text="Todos os benefícios do plano HaiDoc Business Plus +" />
            <FeatureItem text="Saque de fundos semanalmente após dedução de taxas" />
            <FeatureItem text="Acesso simultâneo a todos os serviços (Farmácia, Laboratório, Clínica e Profissional de Saúde)" />
            <FeatureItem text="Consultoria para otimização de operações e serviços" />
            <FeatureItem text="Suporte prioritário 24/7" />
            <FeatureItem text="Participação em eventos de networking e treinamentos personalizados" />
          </div>

          <div className="mt-auto pt-6">
            <Button onClick={handleProposal} className="w-full bg-red-500 hover:bg-red-600">
              Assinar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Simple feature item component for this page
function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 py-2">
      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50">
        <Check className="h-4 w-4 text-blue-500" />
      </div>
      <span className="text-sm text-gray-600">{text}</span>
    </div>
  )
}
