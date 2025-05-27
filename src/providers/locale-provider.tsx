"use client"

import { NextIntlClientProvider } from "next-intl"
import { ReactNode, createContext, useContext } from "react"

type Props = {
  locale: string
  messages: Record<string, any>
  children: ReactNode
}

// Define a type for the context value
interface LocaleContextType {
  locale: string
}

// Create the LocaleContext with a default value
const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

// Export the LocaleContext
export { LocaleContext }

// Create a custom hook to use the LocaleContext
export const useLocale = () => {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider")
  }
  return context
}

export function LocaleProvider({ locale, messages, children }: Props) {
  return (
    <LocaleContext.Provider value={{ locale }}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  )
}
