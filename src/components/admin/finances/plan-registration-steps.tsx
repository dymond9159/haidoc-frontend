"use client"

import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface Step {
  id: string
  number: number
  title: string
}

interface PlanRegistrationStepsProps {
  steps: Step[]
  currentStep: number
  className?: string
}

export function PlanRegistrationSteps({ steps, currentStep, className }: PlanRegistrationStepsProps) {
  return (
    <div className={cn("w-full border border-system-3 rounded-lg py-6 px-8 bg-white", className)}>
      <div className="relative flex flex-wrap items-center gap-3">
        {steps.map((step, index) => {
          const isActive = step.number === currentStep
          const isCompleted = step.number < currentStep
          const isLast = index === steps.length - 1

          return (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step with circle and title */}
              <div className="flex items-center gap-3 z-10 bg-white pr-3">
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full border-2 text-sm font-medium bg-white",
                    isActive && "border-secondary-11 text-secondary-11",
                    isCompleted && "border-success-4 bg-success-4 text-white",
                    !isActive && !isCompleted && "border-system-5 text-system-9",
                  )}
                >
                  {isCompleted ? <Check className="h-5 w-5" /> : <span>{String(step.number).padStart(2, "0")}</span>}
                </div>

                <span
                  className={cn(
                    "text-sm font-medium whitespace-nowrap",
                    isActive && "text-secondary-11",
                    isCompleted && "text-success-5",
                    !isActive && !isCompleted && "text-system-9",
                  )}
                >
                  {step.title}
                </span>
              </div>

              {/* Connector line with arrow */}
              {!isLast && (
                <div className="flex-1 relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="h-[1px] bg-system-3 w-full relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-[1px]">
                        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 0L6 5L0 10V0Z" fill="#E5E7EB" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
