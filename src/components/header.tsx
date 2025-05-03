"use client"

import { Icon, IconName } from "@/components/icons/icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { useMobile } from "../hooks/use-mobile"
import { Logo } from "./logo"

interface NavItem {
  label: string
  href: string
  icon: IconName
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: "home",
  },
  {
    label: "Appointments",
    href: "/appointments",
    icon: "calendar",
  },
  {
    label: "Messages",
    href: "/messages",
    icon: "message-square",
  },
  {
    label: "Prescriptions",
    href: "/prescriptions",
    icon: "prescription",
  },
]

export function Header() {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(false)

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            pathname === item.href
              ? "bg-primary-2 text-primary-11"
              : "text-system-11 hover:bg-system-3 hover:text-system-12",
          )}
        >
          <Icon name={item.icon} className="h-4 w-4" />
          {item.label}
        </Link>
      ))}
    </>
  )

  return (
    <header className="sticky top-0 z-40 border-b border-system-5 bg-system-1">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Logo />
          {!isMobile && (
            <nav className="ml-8 flex items-center gap-1">
              <NavLinks />
            </nav>
          )}
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-system-11">
            <Icon name="search" className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-system-11">
            <Icon name="notification" className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          {isMobile && (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-system-11">
                  <Icon name="menu" className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="border-b border-system-5 p-4">
                  <Logo size="sm" />
                </div>
                <nav className="flex flex-col gap-1 p-4">
                  <NavLinks />
                </nav>
              </SheetContent>
            </Sheet>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="/images/placeholder.svg?height=32&width=32"
                    alt="User"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Icon name="user" className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icon name="settings" className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Icon name="logout" className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
