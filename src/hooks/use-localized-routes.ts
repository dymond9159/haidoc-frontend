"use client"

import { useLocale } from "@/providers/locale-provider"
import { ProviderOptions } from "@/types"
import { AccountType } from "@/types/common"

const webUrl = process.env.NEXT_PUBLIC_APP_URL

export const useRoutes = () => {
  // app routes
  return {
    // authentication
    login: () => `/login`,
    register: () => `/register`,
    registerSuccess: () => `/register/success`,
    basicData: (accountType: AccountType) => `/register/${accountType}/basic-data`,
    personalInformation: (accountType: AccountType) => `/register/${accountType}/personal-information`,
    professionalDetails: (accountType: AccountType) => `/register/${accountType}/professional-details`,
    documentation: (accountType: AccountType) => `/register/${accountType}/documentation`,
    // signature
    plans: (accountType: AccountType) => `/${accountType}/plans/`,
    subscription: () => `/subscription`,
    proposal: () => `/proposal`,
    // provider feature pages
    providerHome: (providerType: ProviderOptions) => `/${providerType}`,

    // patient feature pages
    patientHome: () => `/patient`,
  }
}

export const useLocalizedRoutes = () => {
  const { locale } = useLocale()

  return {
    home: () => `${webUrl}/${locale}`,
    pricing: () => `${webUrl}/${locale}/pricing`,
    contact: () => `${webUrl}/${locale}/contact`,
    about: () => `${webUrl}/${locale}/about`,
    terms: () => `${webUrl}/${locale}/legal/terms-of-service`,
    privacy: () => `${webUrl}/${locale}/legal/privacy-policy`,
    cookie: () => `${webUrl}/${locale}/legal/cookie-policy`,
  }
}
