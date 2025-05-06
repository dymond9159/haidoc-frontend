"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { useRouter } from "nextjs-toploader/app"

interface RestrictedAccessModalProps {
  isOpen: boolean
  onClose: () => void
}

export function RestrictedAccessModal({ isOpen, onClose }: RestrictedAccessModalProps) {
  const router = useRouter()
  const handleUpdatePlan = () => {
    // Navigate to plan upgrade page
    router.push("/plan")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="py-6">
          <h2 className="text-xl font-semibold mb-2">Acesso Restrito</h2>
          <p className="text-system-9">
            Você precisa ter o plano HaiDoc Plus para agendar uma nova consulta. Por favor, atualize seu plano para
            continuar.
          </p>
        </div>
        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
          <Button onClick={handleUpdatePlan}>Atualizar plano</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
