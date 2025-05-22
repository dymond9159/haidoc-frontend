import { PlanType } from "@/types"

export const PlanList = [
  {
    type: PlanType.Business,
    titleKey: "pages.plans.business.title",
    priceKey: "pages.plans.business.price",
    featuresKeys: [
      "pages.plans.business.features.0",
      "pages.plans.business.features.1",
      "pages.plans.business.features.2",
      "pages.plans.business.features.3",
    ],
  },
  {
    type: PlanType.BusinessPlus,
    titleKey: "pages.plans.businessPlus.title",
    priceKey: "pages.plans.businessPlus.price",
    featuresKeys: [
      "pages.plans.businessPlus.features.0",
      "pages.plans.businessPlus.features.1",
      "pages.plans.businessPlus.features.2",
      "pages.plans.businessPlus.features.3",
      "pages.plans.businessPlus.features.4",
      "pages.plans.businessPlus.features.5",
      "pages.plans.businessPlus.features.6",
    ],
    currency: "pages.plans.businessPlus.currency",
    period: "pages.plans.businessPlus.period",
  },
  {
    type: PlanType.Company,
    titleKey: "pages.plans.company.title",
    priceKey: "pages.plans.company.price",
    featuresKeys: [
      "pages.plans.company.features.0",
      "pages.plans.company.features.1",
      "pages.plans.company.features.2",
      "pages.plans.company.features.3",
      "pages.plans.company.features.4",
      "pages.plans.company.features.5",
    ],
    currency: "pages.plans.company.currency",
    period: "pages.plans.company.period",
  },
]
