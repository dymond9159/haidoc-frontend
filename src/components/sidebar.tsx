"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Icon, IconName } from "@/components/icons/icons"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SidebarProps {
  className?: string
}

interface SidebarItem {
  title: string
  href: string
  icon: IconName
  variant?: "default" | "ghost"
}

const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "home",
    variant: "default",
  },
  {
    title: "Appointments",
    href: "/appointments",
    icon: "calendar",
    variant: "ghost",
  },
  {
    title: "Patients",
    href: "/patients",
    icon: "patient",
    variant: "ghost",
  },
  {
    title: "Doctors",
    href: "/doctors",
    icon: "doctor",
    variant: "ghost",
  },
  {
    title: "Messages",
    href: "/messages",
    icon: "message-square",
    variant: "ghost",
  },
  {
    title: "Prescriptions",
    href: "/prescriptions",
    icon: "prescription",
    variant: "ghost",
  },
  {
    title: "Lab Results",
    href: "/lab-results",
    icon: "lab-result",
    variant: "ghost",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: "settings",
    variant: "ghost",
  },
]

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "flex h-full w-[240px] flex-col border-r border-system-5",
        className,
      )}
    >
      <ScrollArea className="flex-1 py-4">
        <nav className="grid gap-1 px-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary-2 text-primary-11"
                  : "text-system-11 hover:bg-system-3 hover:text-system-12",
              )}
            >
              <Icon name={item.icon} className="h-5 w-5" />
              {item.title}
            </Link>
          ))}
        </nav>
      </ScrollArea>
      <div className="mt-auto border-t border-system-5 p-4">
        <div className="flex items-center gap-3 rounded-md bg-system-3 p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-9 text-white">
            <Icon name="info" className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-medium">Need help?</div>
            <div className="text-xs text-system-10">Contact support</div>
          </div>
        </div>
      </div>
    </div>
  )
}
