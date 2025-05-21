"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RegistrationType } from "@/types/enum-tab-options"
import { BriefcaseMedicalIcon, CircleUserRoundIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "nextjs-toploader/app"
import { useState } from "react"

export default function RegisterPage() {
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
    <div>
      <h2 className="text-lg font-medium mb-2">Como deseja se cadastrar?</h2>
      <div className="space-y-3 mb-6">
        <Tabs
          defaultValue={RegistrationType.Patient}
          onValueChange={(value) => setSelectedType(value as RegistrationType)}
        >
          <TabsList className="bg-transparent w-full h-full py-4 flex flex-col gap-4">
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
