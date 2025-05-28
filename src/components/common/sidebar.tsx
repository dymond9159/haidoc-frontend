"use client"

import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { useEffect } from "react"

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarDaysIcon,
  ChevronLeft,
  ClockIcon,
  HomeIcon,
  MessageSquareTextIcon,
  MicroscopeIcon,
  ReceiptIcon,
  StethoscopeIcon,
  TruckIcon,
  UserCheckIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Logo } from "../logo"
import { LogoNoText } from "../logo_no_text"
import { Separator } from "../ui/separator"

import { useAppDispatch } from "@/hooks/use-dispatch"
import { useScreen } from "@/hooks/use-screen"
import { cn } from "@/lib/utils"
import { RootState } from "@/store"
import { setSideBarOpen, toggleCollapse } from "@/store/reducers/settings-slice"
import { AccountType } from "@/types"
import { useTranslations } from "next-intl"
import { useSelector } from "react-redux"
import { DashboardIcon, DollarIcon, Edit1Icon, SupportAgentIcon, TaxIcon, UserSettingsIcon } from "../icons"
import { ScrollArea, ScrollBar } from "../ui"

const iconMap: Record<string, React.ElementType | null> = {
  HomeIcon: HomeIcon,
  DashboardIcon: DashboardIcon,
  UserSettingsIcon: UserSettingsIcon,
  UserCheckIcon: UserCheckIcon,
  TruckIcon: TruckIcon,
  Edit1Icon: Edit1Icon,
  DollarIcon: DollarIcon,
  ClockIcon: ClockIcon,
  TaxIcon: TaxIcon,
  CalendarDaysIcon: CalendarDaysIcon,
  StethoscopeIcon: StethoscopeIcon,
  MessageSquareTextIcon: MessageSquareTextIcon,
  SupportAgentIcon: SupportAgentIcon,
  MicroscopeIcon: MicroscopeIcon,
  ReceiptIcon: ReceiptIcon,
}
export interface NavItem {
  label: string
  href: string
  iconName?: keyof typeof iconMap
}
interface SidebarProps {
  accountType: AccountType
  navItems: NavItem[]
}

const bottomCanvasImage = "/images/side-bottom-canvas.svg"

export function Sidebar({ accountType, navItems }: SidebarProps) {
  const t = useTranslations("sidebar")

  const params = useParams()
  const dispatch = useAppDispatch()
  const { isMobile, isTablet } = useScreen()

  const pathname = usePathname().replace("/pt/", "/")
  const homeLink = accountType === AccountType.Provider ? `/${params.provider}` : "/patient"

  // Use Redux store instead of local state
  const isCollapsed = useSelector((state: RootState) => state.settings.isCollapse)
  const isSideBarOpen = useSelector((state: RootState) => state.settings.isSideBarOpen)

  const backgroundStyle = {
    backgroundImage: `url(${bottomCanvasImage})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom left",
    backgroundSize: "100% auto",
    opacity: 0.8,
  }
  const backgroundHeightClass = "h-[240px]"

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
    const isActive = item.href === homeLink ? pathname === item.href : pathname.startsWith(item.href)
    const Icon = item?.iconName ? iconMap[item.iconName] : null
    return (
      <Link
        key={item.href}
        href={item.href}
        className={cn(
          "flex h-12 px-[14px] py-3 items-center rounded-md transition-colors",
          !isTabletView && "gap-3 text-sm",
          isActive ? "bg-secondary-4 text-secondary font-medium" : "text-system-11 hover:bg-system-3",
        )}
        title={isTabletView ? item.label : undefined}
        onClick={closeSheet}
      >
        {Icon && <Icon className="h-5 w-5 flex-shrink-0" />}
        {!isTabletView && <span className="break-words">{t(item.label)}</span>}
      </Link>
    )
  }

  // Shared "Recolher" (Collapse/Back) Button
  const BackButton = ({ isTabletView, closeSheet }: { isTabletView: boolean; closeSheet?: () => void }) => {
    const RecolherButton = () => {
      if (isMobile) {
        return <ChevronLeft size={16} className="flex-shrink-0" />
      }

      if (isTablet) {
        return <ArrowLeftIcon size={16} className="flex-shrink-0" />
      }

      return isCollapsed ? (
        <ArrowRightIcon size={16} className="flex-shrink-0" />
      ) : (
        <ArrowLeftIcon size={16} className="flex-shrink-0" />
      )
    }

    return (
      <Button
        variant="ghost"
        className={cn(
          "w-full flex !px-4 py-3 items-center rounded-md text-system-11 hover:bg-system-3 h-12",
          !isTabletView && "gap-3 justify-start text-sm",
        )}
        title={isTabletView ? t("collapse") : undefined}
        onClick={() => {
          if (closeSheet) closeSheet()
        }}
      >
        <RecolherButton />
        {!isTabletView && <span>{t("collapse")}</span>}
      </Button>
    )
  }

  if (isMobile) {
    return (
      <>
        <Sheet open={isSideBarOpen} onOpenChange={(open) => dispatch(setSideBarOpen(open))}>
          <SheetContent side="left" className="flex flex-col h-full p-0 w-[240px] border-r-0 bg-white">
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
              <BackButton isTabletView={false} closeSheet={() => dispatch(setSideBarOpen(false))} />
            </div>

            <div className={cn("w-full flex-shrink-0", backgroundHeightClass)} style={backgroundStyle} />
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
    <div className={cn("hidden md:block h-screen border-r border-system-5 bg-white", sidebarWidth)}>
      <div className={cn("fixed h-full flex flex-col bg-white border-r z-50 overflow-hidden", sidebarWidth)}>
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
                <NavLink key={item.href} item={item} isTabletView={isTabletViewMode} />
              ))}
            </nav>
            <Separator className="my-3" />
            <BackButton isTabletView={isTabletViewMode} closeSheet={() => dispatch(toggleCollapse())} />
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
        <div className={cn("w-full flex-shrink-0", backgroundHeightClass)} style={backgroundStyle} />
      </div>
    </div>
  )
}
