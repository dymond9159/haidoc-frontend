"use client"

import { PaymentMethodCard } from "@/components/cards/payment-method-card"
import { ConfirmationModal } from "@/components/provider/payments/confirmation-modal"
import {
  PaymentMethodFormModal,
  PaymentMethodFormValues,
} from "@/components/provider/payments/payment-method-form-modal"
import { Button } from "@/components/ui/button"
import { PaymentMethod, PaymentMethodDetails } from "@/types" // Adjust path
import { CreditCard, PlusIcon, WalletMinimal } from "lucide-react" // Example brand icons
import { useState } from "react"
import { v4 as uuidv4 } from "uuid" // For generating unique IDs

// Helper to get a brand icon (customize as needed)
const getBrandIcon = (brand?: string) => {
  if (!brand) return <CreditCard className="h-5 w-5 text-muted-foreground" />
  switch (brand.toLowerCase()) {
    case "visa":
      return <CreditCard className="h-5 w-5 text-blue-600" /> // Replace with actual Visa icon
    case "mastercard":
      return <CreditCard className="h-5 w-5 text-orange-500" /> // Replace with actual Mastercard icon
    default:
      return <CreditCard className="h-5 w-5 text-muted-foreground" />
  }
}

const mockPaymentMethods: PaymentMethodDetails[] = [
  {
    id: uuidv4(),
    paymentMethod: PaymentMethod.Card,
    cardName: "Santander crédito",
    cardNumber: "**** **** **** 8888",
    expiryDate: "12/28",
    email: "user1@example.com",
    brand: "Visa",
    isDefault: true,
  },
  {
    id: uuidv4(),
    paymentMethod: PaymentMethod.Card,
    cardName: "Santander crédito",
    cardNumber: "**** **** **** 1234",
    expiryDate: "06/29",
    email: "user2@example.com",
    brand: "Mastercard",
    isDefault: false,
  },
]

export default function PaymentDetailsConfigurationsPage() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodDetails[]>(mockPaymentMethods || [])
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [formMode, setFormMode] = useState<"add" | "edit">("add")
  const [currentPaymentMethod, setCurrentPaymentMethod] = useState<PaymentMethodDetails | null>(null)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isDeleteWithPasswordModalOpen, setIsDeleteWithPasswordModalOpen] = useState(false)
  const [paymentMethodToDelete, setPaymentMethodToDelete] = useState<string | null>(null)

  // --- Form Modal Handlers ---
  const handleOpenAddModal = () => {
    setFormMode("add")
    setCurrentPaymentMethod(null)
    setIsFormModalOpen(true)
  }

  const handleOpenEditModal = (id: string) => {
    const methodToEdit = paymentMethods.find((pm) => pm.id === id)
    if (methodToEdit) {
      setFormMode("edit")
      setCurrentPaymentMethod(methodToEdit)
      setIsFormModalOpen(true)
    }
  }

  const handleFormSubmit = (data: PaymentMethodFormValues, id?: string) => {
    alert(1)
    const maskedCardNumber = `**** **** **** ${data.cardNumber?.slice(-4) || "****"}`
    const cardBrand = "Visa"

    if (formMode === "add") {
      const newPaymentMethod: PaymentMethodDetails = {
        id: uuidv4(),
        paymentMethod: PaymentMethod.Card,
        cardName: data.cardName,
        cardNumber: maskedCardNumber,
        expiryDate: data.expiryDate,
        email: data.email,
        brand: cardBrand,
        isDefault: paymentMethods.length === 0,
      }
      setPaymentMethods((prev) => [...prev, newPaymentMethod])
    } else if (formMode === "edit" && id) {
      setPaymentMethods((prev) =>
        prev.map((pm) =>
          pm.id === id
            ? {
                ...pm,
                cardName: data.cardName,
                cardNumber: maskedCardNumber, // Re-mask if full number was provided
                expiryDate: data.expiryDate,
                email: data.email,
                brand: cardBrand, // Potentially re-derive
              }
            : pm,
        ),
      )
    }
    setIsFormModalOpen(false)
    setCurrentPaymentMethod(null)
  }

  // --- Delete Modal Handlers ---
  const handleDeleteInitiate = (id: string) => {
    setPaymentMethodToDelete(id)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    if (paymentMethodToDelete) {
      const methodBeingDeleted = paymentMethods.find((pm) => pm.id === paymentMethodToDelete)
      const newPaymentMethods = paymentMethods.filter((pm) => pm.id !== paymentMethodToDelete)

      // If the deleted card was default and there are other cards, make the first one default
      if (methodBeingDeleted?.isDefault && newPaymentMethods.length > 0) {
        newPaymentMethods[0].isDefault = true
      }

      setPaymentMethods(newPaymentMethods)
    }
    closeDeleteModals()
  }

  const closeDeleteModals = () => {
    setIsDeleteModalOpen(false)
    setIsDeleteWithPasswordModalOpen(false)
    setPaymentMethodToDelete(null)
  }

  // --- Set Default Handler ---
  const handleSetDefault = (id: string) => {
    setPaymentMethods((prev) =>
      prev.map((pm) => ({
        ...pm,
        isDefault: pm.id === id,
      })),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-between items-start md:items-center">
        <h3 className="text-lg font-medium text-secondary">Dados de pagamento</h3>
        <Button className="gap-2 w-full md:w-auto" onClick={handleOpenAddModal}>
          <PlusIcon size="16" />
          Cadastrar novo método
        </Button>
      </div>

      {paymentMethods.length > 0 ? (
        <div className="flex flex-col gap-4">
          {paymentMethods.map((item) => (
            <PaymentMethodCard
              key={item.id}
              id={item.id}
              cardName={item.cardName}
              cardNumber={item.cardNumber}
              brandIcon={getBrandIcon(item.brand)}
              isDefault={item.isDefault}
              onEdit={handleOpenEditModal}
              onDelete={handleDeleteInitiate}
              onSetDefault={handleSetDefault}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground py-8 border border-dashed rounded-md">
          <WalletMinimal size={48} className="mx-auto mb-2 opacity-50" />
          <p>Nenhum método de pagamento cadastrado.</p>
          <p className="text-xs mt-1">Clique em "Cadastrar novo método" para adicionar um.</p>
        </div>
      )}
      <div>
        <PaymentMethodFormModal
          isOpen={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
          onSubmit={handleFormSubmit}
          initialData={currentPaymentMethod}
          mode={formMode}
        />

        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false)
          }}
          // onClose={closeDeleteModals}
          onConfirm={() => handleDeleteInitiate(paymentMethodToDelete || "")}
          title="Tem certeza que deseja excluir o cartão?"
          description="Essa ação não poderá ser desfeita."
        />

        <ConfirmationModal
          isOpen={isDeleteWithPasswordModalOpen}
          onClose={closeDeleteModals}
          onConfirm={handleConfirmDelete}
          title="Confirmar exclusão"
          description="Digite sua senha para confirmar a exclusão do método de pagamento."
          showPasswordConfirmation={true}
        />
      </div>
    </div>
  )
}
