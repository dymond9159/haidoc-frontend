import { Check } from "lucide-react"

interface SuccessToastProps {
  message?: string
}

export function SuccessToast({
  message = "Sua ação foi realizada com sucesso!",
}: SuccessToastProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-md bg-white p-4 shadow-lg">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
        <Check className="h-4 w-4 text-green-600" />
      </div>
      <div>
        <h4 className="font-medium">Sucesso</h4>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  )
}
