"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useRouter } from "nextjs-toploader/app"
import { useMobile } from "../hooks/use-mobile"
import { LanguageSwitcher } from "./common/language-switcher"
import { Logo } from "./logo"

interface NavItem {
  label: string
  href: string
}

export function Header() {
  const t = useTranslations("common")
  const router = useRouter()
  const isMobile = useMobile()

  const navItems: NavItem[] = [
    {
      label: t("home"),
      href: "/home",
    },
    {
      label: t("services"),
      href: "/services",
    },
    {
      label: t("contact"),
      href: "/contact",
    },
    {
      label: t("about"),
      href: "/about",
    },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-system-5 bg-system-1">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="w-full flex items-center justify-between gap-4">
          <Logo size="sm" />
          {!isMobile && (
            <nav className="flex-1 flex items-center justify-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors border-b-2 border-transparent hover:border-secondary-11 hover:text-secondary-11",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          {!isMobile && (
            <>
              <Button onClick={() => router.push("/login")}>{t("login")}</Button>
              <Button variant="ghost" onClick={() => router.push("/register")}>
                {t("register")}
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
