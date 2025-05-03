"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RegistrationType } from "@/types/enum-tab-options"
import { BriefcaseMedicalIcon, CircleUserRoundIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "nextjs-toploader/app"
import { useState } from "react"

export default function RegistrationChoicePage() {
  const router = useRouter()
  const [selectedType, setSelectedType] = useState<RegistrationType>(RegistrationType.Patient)

  const handleNext = () => {
    if (selectedType === RegistrationType.Provider) {
      router.push("/register/provider/basic-data")
    } else if (selectedType === RegistrationType.Patient) {
      router.push("/register/patient/basic-data")
    }
  }

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-medium mb-6">Como deseja se cadastrar?</h2>

      <div className="space-y-3 mb-6">
        <Tabs
          defaultValue={RegistrationType.Patient}
          onValueChange={(value) => setSelectedType(value as RegistrationType)}
        >
          <TabsList className="flex flex-col w-full h-full space-y-6 py-4 bg-transparent">
            <TabsTrigger value={RegistrationType.Patient} variant="button" size="xl" className="w-full">
              <CircleUserRoundIcon />
              Usuário Paciente
            </TabsTrigger>
            <TabsTrigger value={RegistrationType.Provider} variant="button" size="xl" className="w-full">
              <BriefcaseMedicalIcon />
              Provedor de Saúde
            </TabsTrigger>
          </TabsList>
        </Tabs>
        {/* <div
          className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
            selectedType === "patient" ? "border-primary-9 bg-primary-1" : "border-system-5 hover:border-system-7"
          }`}
          onClick={() => setSelectedType("patient")}
        >
          <div
            className={`w-5 h-5 rounded-full border flex items-center justify-center ${
              selectedType === "patient" ? "border-primary-9" : "border-system-7"
            }`}
          >
            {selectedType === "patient" && <div className="w-3 h-3 rounded-full bg-primary-9"></div>}
          </div>
          <span className="font-medium">Usuário Paciente</span>
        </div>

        <div
          className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
            selectedType === "provider" ? "border-secondary-11 bg-secondary-1" : "border-system-5 hover:border-system-7"
          }`}
          onClick={() => setSelectedType("provider")}
        >
          <div
            className={`w-5 h-5 rounded-full border flex items-center justify-center ${
              selectedType === "provider" ? "border-secondary-11" : "border-system-7"
            }`}
          >
            {selectedType === "provider" && <div className="w-3 h-3 rounded-full bg-secondary-11"></div>}
          </div>
          <span className="font-medium">Provedor de Saúde</span>
        </div> */}
      </div>

      <Button
        onClick={handleNext}
        disabled={!selectedType}
        className="w-full bg-primary-9 hover:bg-primary-10 text-white"
      >
        Próximo
      </Button>

      <div className="text-center mt-4 text-sm">
        Já tem conta?{" "}
        <Link href="/login" className="text-secondary-11 hover:text-secondary-10 font-medium">
          Faça login
        </Link>
      </div>
    </div>
  )
}
