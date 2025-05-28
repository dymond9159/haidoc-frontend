import { ProviderOptions, UploadedFile } from "@/types"
import { useState } from "react"

type FormData = {
  fullName?: string
  email?: string
  phone?: string
  birthDate?: string
  gender?: string
  password?: string
  confirmPassword?: string
  street?: string
  number?: string
  neighborhood?: string
  city?: string
  country?: string
  specialty?: string
  institutionName?: string
  professionalNumber?: string
  nuit?: string
  termsAccepted?: boolean
  providerType?: ProviderOptions
  files?: UploadedFile[]
  maritalStatus?: string
  birthPlace?: string
  profession?: string
}

type Errors = Record<string, string>

type UseFormValidationProps = {
  initialData: FormData
  tForm: (key: string) => string
}

export const useFormValidation = ({ initialData, tForm }: UseFormValidationProps) => {
  const [formData, setFormData] = useState<FormData>(initialData)
  const [errors, setErrors] = useState<Errors>({})

  const handleChange = (field: keyof FormData, value: string | boolean | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when field is edited
    if (errors[field]) {
      const newErrors = { ...errors }
      delete newErrors[field]
      setErrors(newErrors)
    }
  }

  const validate = () => {
    const newErrors: Errors = {}

    const hasKey = (key: keyof FormData) => key in initialData

    if (!formData.fullName?.trim()) {
      newErrors.fullName = tForm("error.fullNameRequired")
    } else if (!/^[A-Za-z\s]+$/.test(formData.fullName)) {
      newErrors.fullName = tForm("error.fullNameInvalid")
    }

    if (!formData?.email?.trim()) {
      newErrors.email = tForm("error.emailRequired")
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = tForm("error.emailInvalid")
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = tForm("error.phoneRequired")
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = tForm("error.phoneInvalid")
    }

    if (!formData?.birthDate?.trim()) {
      newErrors.birthDate = tForm("error.birthDateRequired")
    }

    if (!formData?.gender) {
      newErrors.gender = tForm("error.genderRequired")
    }

    if (!formData?.password) {
      newErrors.password = tForm("error.passwordRequired")
    } else if (formData.password.length < 8) {
      newErrors.password = tForm("error.passwordShort")
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = tForm("error.confirmPasswordRequired")
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = tForm("error.passwordsDontMatch")
    }

    if (!formData?.providerType) {
      newErrors.providerType = tForm("error.providerTypeRequired")
    }

    // Validate specialty
    if (formData?.providerType === ProviderOptions.Professional && !formData.specialty) {
      newErrors.specialty = tForm("error.specialtyRequired")
    }

    // Validate institution name
    if (formData?.providerType !== ProviderOptions.Professional && !formData.institutionName) {
      newErrors.institutionName = tForm("error.institutionNameRequired")
    }

    // Validate card number/NUIT
    if (!formData?.professionalNumber) {
      newErrors.professionalNumber =
        formData?.providerType === ProviderOptions.Professional
          ? tForm("error.professionalNumberRequired")
          : tForm("error.nuitRequired")
    } else if (formData?.professionalNumber?.replace(/\D/g, "").length !== 9) {
      newErrors.professionalNumber =
        formData?.providerType === ProviderOptions.Professional
          ? tForm("error.professionalNumberLength")
          : tForm("error.nuitLength")
    }

    // Validate NUIT number
    if (!formData?.nuit) {
      newErrors.nuit = tForm("error.nuitRequired")
    } else if (formData.nuit.replace(/\D/g, "").length !== 9) {
      newErrors.nuit = tForm("error.nuitLength")
    }

    // Validate terms
    if (!formData?.termsAccepted) {
      newErrors.termsAccepted = tForm("error.termsRequired")
    }

    // Validate street
    if (!formData?.street?.trim()) {
      newErrors.street = tForm("error.streetRequired")
    }

    // Validate number
    if (!formData?.number?.trim()) {
      newErrors.number = tForm("error.numberRequired")
    }

    // Validate neighborhood
    if (!formData?.neighborhood?.trim()) {
      newErrors.neighborhood = tForm("error.neighborhoodRequired")
    }

    // Validate city
    if (!formData?.city?.trim()) {
      newErrors.city = tForm("error.cityRequired")
    }

    // Validate country
    if (!formData?.country?.trim()) {
      newErrors.country = tForm("error.countryRequired")
    }

    // Validate files
    if (formData?.files?.length === 0) {
      newErrors.files = tForm("error.filesRequired")
    }

    // Validate marital status
    if (!formData.maritalStatus) {
      newErrors.maritalStatus = tForm("error.maritalStatusRequired")
    }

    // Validate birth place
    if (!formData.birthPlace) {
      newErrors.birthPlace = tForm("error.birthPlaceRequired")
    }

    // Validate profession
    if (!formData.profession) {
      newErrors.profession = tForm("error.professionRequired")
    }

    const validErrors = Object.entries(newErrors).reduce((acc, [key, value]) => {
      if (hasKey(key as keyof FormData)) {
        acc[key] = value
      }
      return acc
    }, {} as Errors)

    setErrors(validErrors)

    return Object.keys(validErrors).length === 0
  }

  return {
    formData,
    errors,
    handleChange,
    validate,
    setFormData,
    setErrors,
  }
}
