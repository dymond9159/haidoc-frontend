"use client"

import { Asterisk, BackButton } from "@/components/common"
import { ConfirmationDialog } from "@/components/common/confirm-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMobile } from "@/hooks/use-mobile"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import {
  ChevronRightIcon,
  Eye,
  EyeOff,
  LockKeyholeIcon,
  Pencil,
  Trash2,
  UserRoundIcon,
} from "lucide-react"
import { useState } from "react"

export default function AdminRegistrationInfoPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("dados-cadastrais")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isFormChanged, setIsFormChanged] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)

  const isMobile = useMobile()
  const tabOrientation = isMobile ? "horizontal" : "vertical"

  const handleInputChange = () => {
    setIsFormChanged(true)
  }

  const handleSaveChanges = () => {
    setShowConfirmationModal(true)
  }

  const confirmSaveChanges = () => {
    // In a real implementation, this would save the changes to the backend
    setShowConfirmationModal(false)
    setIsFormChanged(false)

    toast({
      title: "Sucesso",
      description: "Sua ação foi realizada com sucesso!",
    })
  }

  const isPasswordValid = currentPassword.length > 0
  const areNewPasswordsValid =
    newPassword.length > 0 && newPassword === confirmPassword
  const canSavePassword = isPasswordValid && areNewPasswordsValid

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <BackButton text="Informações Cadastrais" />
      </div>

      <Tabs
        defaultValue="dados-cadastrais"
        value={activeTab}
        onValueChange={setActiveTab}
        orientation={tabOrientation}
      >
        <TabsList className="mb-3" orientation={tabOrientation}>
          <TabsTrigger value="dados-cadastrais" className="w-full">
            <div className="w-full flex flex-row items-center justify-between gap-2">
              <div className="flex flex-row gap-2">
                <UserRoundIcon />
                <span>Dados Cadastrais</span>
              </div>
              {!isMobile && <ChevronRightIcon />}
            </div>
          </TabsTrigger>
          <TabsTrigger value="senha" className="w-full">
            <div className="w-full flex flex-row items-center justify-between gap-2">
              <div className="flex flex-row gap-2">
                <LockKeyholeIcon />
                <span>Senha</span>
              </div>
              {!isMobile && <ChevronRightIcon />}
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dados-cadastrais">
          <Card>
            <CardContent className="pt-6 px-0 md:px-6">
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <img
                    src="/images/placeholder.svg?height=120&width=120"
                    alt="Profile"
                    className="h-24 w-24 rounded-full object-cover border-2 border-white shadow"
                  />
                  <div className="absolute -right-1 -top-1 flex flex-col gap-1">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-7 w-7 rounded-full bg-white"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      <span className="sr-only">Substituir imagem</span>
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className={cn(
                        "h-7 w-7 rounded-full",
                        "hover:bg-error-2 hover:text-error-5 hover:border-error-5",
                      )}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span className="sr-only">Remover imagem</span>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nome">
                    Nome Completo <Asterisk />
                  </Label>
                  <Input
                    id="nome"
                    placeholder="Digite aqui seu nome completo..."
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="data-nascimento">
                    Data de Nascimento <Asterisk />
                  </Label>
                  <Input
                    id="data-nascimento"
                    placeholder="Ex: 20/04/2002"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nuit">
                    NUIT <Asterisk />
                  </Label>
                  <Input
                    id="nuit"
                    placeholder="Ex: 123.456.789-0"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    E-mail <Asterisk />
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Ex: mail@exemplo.com"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone">
                    Número de Telefone <Asterisk />
                  </Label>
                  <Input
                    id="telefone"
                    placeholder="Ex: +55 (11) 99999-9999"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button
                  variant="default"
                  disabled={!isFormChanged}
                  onClick={handleSaveChanges}
                >
                  Salvar Alterações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="senha">
          <Card>
            <CardContent className="pt-6 px-0 md:px-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-secondary">
                    Alterar senha
                  </h3>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="current-password">
                    Senha atual <Asterisk />
                  </Label>
                  <div className="relative">
                    <Input
                      id="current-password"
                      type={showCurrentPassword ? "text" : "password"}
                      placeholder="Digite aqui"
                      value={currentPassword}
                      onChange={(e) => {
                        setCurrentPassword(e.target.value)
                        setIsFormChanged(true)
                      }}
                      className={
                        !isPasswordValid && currentPassword
                          ? "border-red-500"
                          : ""
                      }
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showCurrentPassword
                          ? "Hide password"
                          : "Show password"}
                      </span>
                    </Button>
                  </div>
                  <div className="text-sm text-cyan-600 hover:underline cursor-pointer">
                    Esqueci minha senha
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">
                      Nova senha <Asterisk />
                    </Label>
                    <div className="relative">
                      <Input
                        id="new-password"
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Digite aqui"
                        disabled={!isPasswordValid}
                        value={newPassword}
                        onChange={(e) => {
                          setNewPassword(e.target.value)
                          setIsFormChanged(true)
                        }}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        disabled={!isPasswordValid}
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {showNewPassword ? "Hide password" : "Show password"}
                        </span>
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">
                      Repita sua nova senha <Asterisk />
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Digite aqui"
                        disabled={!isPasswordValid}
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value)
                          setIsFormChanged(true)
                        }}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        disabled={!isPasswordValid}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {showConfirmPassword
                            ? "Hide password"
                            : "Show password"}
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button
                    variant="default"
                    disabled={!canSavePassword || !isFormChanged}
                    onClick={handleSaveChanges}
                  >
                    Salvar Alterações
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ConfirmationDialog
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={confirmSaveChanges}
        title="Tem certeza que deseja salvar alterações?"
        description="Garanta que todas as informações estejam corretas."
        confirmText="Sim, salvar alterações"
        cancelText="Cancelar"
      />
    </div>
  )
}
