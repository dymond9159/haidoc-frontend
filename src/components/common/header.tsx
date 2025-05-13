"use client"

import Link from "next/link"
import { useSelector } from "react-redux"

import { ChevronDown, CircleUserRoundIcon, LogOutIcon, Menu, ShoppingBag } from "lucide-react"

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
import { cn, getPageTitleFromPath } from "@/lib/utils"
import { RootState } from "@/store"
import { setSideBarOpen, toggleCollapse } from "@/store/reducers/settings-slice"
import { usePathname } from "next/navigation"
import { useRouter } from "nextjs-toploader/app"

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  const { isMobile, isTablet, isDesktop } = useScreen()

  const isCollapse = useSelector((state: RootState) => state.settings.isCollapse)

  const pageTitles: Record<string, string> = {
    "/professional/agenda": "Agenda",
    "/professional/consultations": "Consultas",
    "/professional/consultation-online": "Consulta online",
    "/professional/chat": "Chat rápido",
    "/professional/support": "Suporte",
    "/professional/notifications": "Notificações",
    "/professional": "Home",
  }

  const pageTitle = getPageTitleFromPath(pageTitles, pathname)

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
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between bg-system-2 px-6">
      <div className="flex items-center">
        <MenuButton />
        <h1 className="text-xl font-semibold">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-4">
        <Link href="#" className="hidden md:flex items-center text-primary-9 gap-2">
          <ShoppingBag className="h-5 w-5" />
          <span className="text-sm">Visitar loja</span>
        </Link>

        <NotificationsDropdown />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="lg" className="flex items-center gap-2 rounded-full !pl-1 !pr-2 py-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-system-3 text-system-11">AD</AvatarFallback>
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
              <Link href="/profile" className="flex items-center gap-2">
                <CircleUserRoundIcon size="14" />
                Informações Pessoais
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/login")}>
              <LogOutIcon size="14" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
