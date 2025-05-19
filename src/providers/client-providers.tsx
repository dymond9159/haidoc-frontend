"use client"

import { ThemeProvider } from "@/providers/theme-provider"
import type { ReactNode } from "react"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

import { Loading } from "@/components/common"

import { ToastProvider } from "@/components/ui/toast"
import { persistor, store } from "@/store"

interface ProvidersProps {
  children: ReactNode
}

export function ClientProviders({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading text="Carregando..." />} persistor={persistor}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true} disableTransitionOnChange>
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}
