export const defaultLocale = "pt"
export const locales = ["en", "pt"] as const
export type Locale = (typeof locales)[number]

export const languageNames: Record<Locale, string> = {
  en: "English",
  pt: "Português",
}

export const languageFlags: Record<Locale, string> = {
  en: "🇺🇸",
  pt: "🇲🇿",
}
