import { locales } from "@/i18n/config"
import { routing } from "@/i18n/routing"
import { ClientProviders } from "@/providers/client-providers"
import { LocaleProvider } from "@/providers/locale-provider"
import type { Metadata } from "next"
import { hasLocale } from "next-intl"
import { Geist, Geist_Mono } from "next/font/google"
import { notFound } from "next/navigation"
import NextTopLoader from "nextjs-toploader"
import type React from "react"
import { Toaster } from "sonner"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "HaiDoc",
  description: "Healthcare platform",
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  // Validate that the incoming `locale` parameter is valid
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  let messages
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LocaleProvider locale={locale} messages={messages}>
          <NextTopLoader color={"#ff4242"} speed={200} crawlSpeed={200} showSpinner={false} />
          <ClientProviders>
            {children}
            <Toaster />
          </ClientProviders>
        </LocaleProvider>
      </body>
    </html>
  )
}
