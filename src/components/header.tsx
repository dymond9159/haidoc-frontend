"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useRouter } from "nextjs-toploader/app"
import { useMobile } from "../hooks/use-mobile"
import { LanguageSwitcher } from "./common/language-switcher"
import { Logo } from "./logo"

interface NavItem {
  label: string
  href: string
}

const navItems: NavItem[] = [
  {
    label: "Início",
    href: "/home",
  },
  {
    label: "Serviços",
    href: "/services",
  },
  {
    label: "Contato",
    href: "/contact",
  },
  {
    label: "Sobre",
    href: "/about",
  },
]

export function Header() {
  const router = useRouter()
  const isMobile = useMobile()

  const NavLinks = () => (
    <>
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
    </>
  )

  return (
    <header className="sticky top-0 z-40 border-b border-system-5 bg-system-1">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="w-full flex items-center justify-between gap-4">
          <Logo size="sm" className="-ml-4" />
          {!isMobile && (
            <nav className="flex-1 flex items-center justify-center gap-1">
              <NavLinks />
            </nav>
          )}
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Button onClick={() => router.push("/login")}>Login</Button>
          <Button variant="ghost" onClick={() => router.push("/register")}>
            Cadastro
          </Button>
        </div>
      </div>
    </header>
  )
}
