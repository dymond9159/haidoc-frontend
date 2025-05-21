import { PlanType } from "@/types"

export const PlanList = [
  {
    type: PlanType.Business,
    title: "HaiDoc Business",
    price: "GRATUITO",
    features: [
      "Conta gratuita",
      "Saque de fundos mensal após dedução de taxas",
      "Acesso a serviços de business na plataforma",
      "Ferramentas básicas de gerenciamento de agendamentos (consultas, marcações, etc.)",
    ],
  },
  {
    type: PlanType.BusinessPlus,
    title: "HaiDoc Business Plus",
    price: "1.499 MZN/Mês",
    features: [
      "Todos os benefícios do plano HaiDoc Business +",
      "Saque de fundos quinzenalmente após dedução de taxas",
      "Gerenciamento de agenda personalizada para o seu negócio (consultas, marcações, etc.)",
      "Análises de desempenho e relatórios personalizados",
      "Destaque do provedor de saúde para todos os pacientes",
      "Inclusão na lista de Serviços Recomendados da Plataforma aos pacientes",
      "Acesso a uma linha de apoio ao cliente 24/7",
    ],
  },
  {
    type: PlanType.Company,
    title: "HaiDoc Company",
    price: "90 MZN/Mês",
    features: [
      "Todos os benefícios do plano HaiDoc Business Plus +",
      "Saque de fundos semanalmente após dedução de taxas",
      "Acesso simultâneo a todos os serviços (Farmácia, Laboratório, Clínica e Profissional de Saúde)",
      "Consultoria para otimização de operações e serviços",
      "Suporte prioritário 24/7",
      "Participação em eventos de networking e treinamentos personalizados",
    ],
  },
]
