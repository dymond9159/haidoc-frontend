"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import {
  ChevronDown,
  CircleUserRoundIcon,
  LogOutIcon,
  Menu,
  ShoppingBag,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NotificationsDropdown } from "./notifications-dropdown"

import { useAppDispatch } from "@/hooks/use-dispatch"
import { useScreen } from "@/hooks/use-screen"
import { cn } from "@/lib/utils"
import { RootState } from "@/store"
import { setSideBarOpen, toggleCollapse } from "@/store/reducers/settings-slice"

export function Header() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const pathname = usePathname()
  const { isMobile, isTablet, isDesktop } = useScreen()
  const [pageTitle, setPageTitle] = useState("Home")

  const isCollapse = useSelector(
    (state: RootState) => state.settings.isCollapse,
  )

  useEffect(() => {
    // Set default page title based on pathname
    const pageTitles: Record<string, string> = {
      "/admin/dashboard": "Dashboard",
      "/admin/users": "Gerenciamento de Usuários",
      "/admin/applications": "Aplicações de usuários business",
      "/admin/deliveries": "Entregas",
      "/admin/pre-assessments": "Pré-avaliações",
      "/admin/finances": "Finanças",
      "/admin/activity-log": "Log de Atividades",
      "/admin/taxes": "Taxas",
      "/admin/notifications": "Notificações",
      "/admin": "Home",
    }

    // Sort paths by length DESC so more specific ones match first
    Object.keys(pageTitles).sort((a, b) => b.length - a.length)

    // Find the most relevant prefix match
    const match = Object.keys(pageTitles).find((key) =>
      pathname.startsWith(key),
    )

    if (match) {
      setPageTitle(pageTitles[match])
    } else {
      setPageTitle("")
    }
  }, [pathname])

  const MenuButton = () => (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "bg-system-1 hover:bg-transparent mt-[2px]",
        isDesktop && "hidden",
        isTablet && !isCollapse && "hidden",
      )}
      onClick={() => {
        if (isMobile) {
          dispatch(setSideBarOpen(true))
        } else {
          dispatch(toggleCollapse())
        }
      }}
      aria-label="Menu"
    >
      <Menu className="h-6 w-6" />
    </Button>
  )

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between bg-system-2 px-4">
      <div className="flex items-center">
        <MenuButton />
        <h1 className="text-xl font-semibold">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="#"
          className="hidden md:flex items-center text-primary-9 gap-2"
        >
          <ShoppingBag className="h-5 w-5" />
          <span className="text-sm">Visitar loja</span>
        </Link>

        <NotificationsDropdown />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="lg"
              className="flex items-center gap-2 rounded-full !pl-1 !pr-2 py-2"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-system-3 text-system-11">
                  AD
                </AvatarFallback>
              </Avatar>
              <div className="hidden text-xs md:block text-left">
                <span className="block font-medium">Nome do usuário</span>
                <span className="block text-[8px] text-system-10">ADM</span>
              </div>
              <ChevronDown className="h-4 w-4 text-system-10 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href="/admin/profile" className="flex items-center gap-2">
                <CircleUserRoundIcon size="14" />
                Informações Pessoais
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/admin/login")}>
              <LogOutIcon size="14" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
