"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useEffect } from "react"

import { ArrowLeftIcon, ArrowRightIcon, ChevronLeft } from "lucide-react"
import {
  ClockIcon,
  DashboardIcon,
  DollarIcon,
  Edit1Icon,
  HomeIcon,
  TaxIcon,
  TruckIcon,
  UserCheckIcon,
  UserSettingsIcon,
} from "../icons"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Logo } from "../logo"
import { LogoNoText } from "../logo_no_text"
import { Separator } from "../ui/separator"

import { useAppDispatch } from "@/hooks/use-dispatch"
import { useScreen } from "@/hooks/use-screen"
import { cn } from "@/lib/utils"
import { RootState } from "@/store"
import { setSideBarOpen, toggleCollapse } from "@/store/reducers/settings-slice"
import { useSelector } from "react-redux"
import { ScrollArea, ScrollBar } from "../ui"
interface NavItem {
  icon: React.ElementType
  label: string
  href: string
}

const navItems: NavItem[] = [
  { icon: HomeIcon, label: "Home", href: "/admin" },
  { icon: DashboardIcon, label: "Dashboard", href: "/admin/dashboard" },
  {
    icon: UserSettingsIcon,
    label: "Gerenciamento de usuários",
    href: "/admin/users",
  },
  {
    icon: UserCheckIcon,
    label: "Aplicações Business",
    href: "/admin/applications",
  },
  { icon: TruckIcon, label: "Entregas", href: "/admin/deliveries" },
  { icon: Edit1Icon, label: "Pré-avaliações", href: "/admin/pre-assessments" },
  { icon: DollarIcon, label: "Finanças", href: "/admin/finances" },
  { icon: ClockIcon, label: "Log de Atividades", href: "/admin/activity-log" },
  { icon: TaxIcon, label: "Taxas", href: "/admin/taxes" },
]

const homeLink = "/admin"

const backgroundStyle = {
  backgroundImage: "url('/images/side-bottom-canvas.svg')",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "bottom left",
  backgroundSize: "100% auto",
}
const backgroundHeightClass = "h-[120px]"

export function Sidebar() {
  const dispatch = useAppDispatch()
  const pathname = usePathname()

  // Use screen hook instead of local state
  const { isMobile, isTablet } = useScreen()

  // Use Redux store instead of local state
  const isCollapsed = useSelector((state: RootState) => state.settings.isCollapse)
  const isSideBarOpen = useSelector((state: RootState) => state.settings.isSideBarOpen)

  useEffect(() => {
    // Keep sidebar open on non-mobile unless manually closed
    if (typeof window !== "undefined") {
      dispatch(setSideBarOpen(window.innerWidth >= 768))
    }
  }, [dispatch]) // Run only once on mount

  // Shared Nav Link Component
  const NavLink = ({
    item,
    isTabletView,
    closeSheet,
  }: {
    item: NavItem
    isTabletView: boolean
    closeSheet?: () => void
  }) => {
    const isActive =
      item.href === "/admin"
        ? pathname === item.href
        : pathname.startsWith(item.href)
    const Icon = item.icon
    return (
      <Link
        key={item.href}
        href={item.href}
        className={cn(
          "flex h-12 px-[14px] py-3 items-center rounded-md transition-colors",
          !isTabletView && "gap-3 text-sm",
          isActive
            ? "bg-secondary-4 text-secondary font-medium"
            : "text-system-11 hover:bg-system-3",
        )}
        title={isTabletView ? item.label : undefined}
        onClick={closeSheet}
      >
        <Icon className="h-5 w-5 flex-shrink-0" />
        {!isTabletView && <span className="break-words">{item.label}</span>}
      </Link>
    )
  }

  // Shared "Recolher" (Collapse/Back) Button
  const BackButton = ({
    isTabletView,
    closeSheet,
  }: {
    isTabletView: boolean
    closeSheet?: () => void
    }) => {

    const RecolherButton = () => {
      if (isMobile) {
        return <ChevronLeft size={16} className="flex-shrink-0" />;
      }

      if (isTablet) {
        return <ArrowLeftIcon size={16} className="flex-shrink-0" />;
      }

      return isCollapsed ? (
        <ArrowRightIcon size={16} className="flex-shrink-0" />
      ) : (
        <ArrowLeftIcon size={16} className="flex-shrink-0" />
      );
    };

    return (
      <Button
        variant="ghost"
        className={cn(
          "w-full flex !px-4 py-3 items-center rounded-md text-system-11 hover:bg-system-3 h-12",
          !isTabletView && "gap-3 justify-start text-sm",
        )}
        title={isTabletView ? "Recolher" : undefined}
        onClick={() => {
          if (closeSheet) closeSheet()
        }}
      >
        <RecolherButton />
        {!isTabletView && <span>Recolher</span>}
      </Button>
    )
  }

  if (isMobile) {
    return (
      <>
        <Sheet open={isSideBarOpen} onOpenChange={(open) => dispatch(setSideBarOpen(open))}>
          <SheetContent
            side="left"
            className="flex flex-col h-full p-0 w-[240px] border-r-0 bg-white"
          >
            <SheetHeader className="px-3 pt-6 pb-3 border-b">
              <SheetTitle>
                <Logo size="sm" href={homeLink} className="-ml-1" />
              </SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-2 py-4">
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.href}
                    item={item}
                    isTabletView={false}
                    closeSheet={() => dispatch(setSideBarOpen(false))}
                  />
                ))}
              </nav>
              <Separator className="my-3" />
              <BackButton
                isTabletView={false}
                closeSheet={() => dispatch(setSideBarOpen(false))}
              />
            </div>

            <div
              className={cn("w-full flex-shrink-0", backgroundHeightClass)}
              style={backgroundStyle}
            />
          </SheetContent>
        </Sheet>
      </>
    )
  }

  // Desktop / Tablet View
  const isTabletViewMode = isTablet || isCollapsed
  let sidebarWidth = "w-[240px]"

  if (isCollapsed) {
    sidebarWidth = "w-[65px]"
    if (isTablet) {
      sidebarWidth = "w-[0px]"
    }
  } else {
    sidebarWidth = "w-[240px]"
    if (isTablet) {
      sidebarWidth = "w-[65px]"
    }
  }

  return (
    <div
        className={cn(
        "hidden md:block h-screen border-r border-system-5 bg-white",
        sidebarWidth,
      )}
    >
      <div
        className={cn("fixed h-full flex flex-col bg-white border-r z-50 overflow-hidden", sidebarWidth)}
      >
        <div className={cn("px-2", isTabletViewMode ? "px-1" : "px-3")}>
          <div className="flex items-center border-b py-6 h-[89px]">
            {isTabletViewMode ? (
              <div className="flex w-full justify-center px-1">
                <LogoNoText size="xs" href={homeLink} />
              </div>
            ) : (
              <Logo size="sm" href={homeLink} />
            )}
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-89px)]">
          <div className="flex-1 px-2 py-4">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  item={item}
                  isTabletView={isTabletViewMode}
                />
              ))}
            </nav>
            <Separator className="my-3" />
            <BackButton
              isTabletView={isTabletViewMode}
              closeSheet={() => dispatch(toggleCollapse())}
            />
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
        {/* <div className="flex-1 overflow-y-auto px-2 py-4">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                isTabletView={isTabletViewMode}
              />
            ))}
          </nav>
          <Separator className="my-3" />
          <BackButton
            isTabletView={isTabletViewMode}
            closeSheet={() => dispatch(toggleCollapse())}
          />
        </div> */}
        <div
          className={cn("w-full flex-shrink-0", backgroundHeightClass)}
          style={backgroundStyle}
        />
      </div>
    </div>
  )
}
