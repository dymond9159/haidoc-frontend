"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link, { LinkProps } from "next/link"
import * as React from "react"
// Import useMobile instead of useMediaQuery
import { useMobile } from "@/hooks/use-mobile" // <-- Adjust path as needed
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeft, // Keep if used in PaginationPrevious/Next Link components
  ChevronRight, // Keep if used in PaginationPrevious/Next Link components
  MoreHorizontal,
} from "lucide-react"
import { useTranslations } from "next-intl"

// --- Sub Components (PaginationContent, PaginationItem, PaginationLink, PaginationEllipsis, PaginationPrevious, PaginationNext) ---
// --- No changes needed in these sub-components from the previous version ---
// --- (Keep your corrected versions of PaginationLink, PaginationPrevious, PaginationNext if you plan to use them elsewhere) ---

const PaginationContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex w-full items-center justify-center gap-1 md:gap-2", className)} // Use md: breakpoint
      {...props}
    />
  ),
)
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { isActive?: boolean }
>(({ className, isActive, ...props }, ref) => (
  <Button
    ref={ref}
    variant={isActive ? "outline" : "ghost"}
    size="icon"
    className={cn(
      "h-8 w-8 p-0",
      isActive &&
        "border-secondary bg-secondary text-primary-foreground hover:bg-secondary/90 hover:text-primary-foreground cursor-default",
      !isActive && "hover:bg-accent hover:text-accent-foreground",
      className,
    )}
    {...props}
  />
))
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
  LinkProps & { active?: boolean }

const PaginationLink = React.forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  ({ className, active, ...props }, ref) => (
    <Link
      ref={ref}
      aria-current={active ? "page" : undefined}
      data-active={active ? "" : undefined}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background p-0 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[active]:border-secondary data-[active]:bg-secondary data-[active]:text-primary-foreground",
        className,
      )}
      {...props}
    />
  ),
)
PaginationLink.displayName = "PaginationLink"

const PaginationEllipsis = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      aria-hidden
      className={cn("flex h-8 w-8 select-none items-center justify-center text-sm font-medium", className)}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">More pages</span>
    </span>
  ),
)
PaginationEllipsis.displayName = "PaginationEllipsis"

type PaginationPreviousProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & LinkProps

const PaginationPrevious = React.forwardRef<HTMLAnchorElement, PaginationPreviousProps>(
  ({ className, ...props }, ref) => (
    <Link
      ref={ref}
      aria-label="Go to previous page"
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background p-0 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
    </Link>
  ),
)
PaginationPrevious.displayName = "PaginationPrevious"

type PaginationNextProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & LinkProps

const PaginationNext = React.forwardRef<HTMLAnchorElement, PaginationNextProps>(({ className, ...props }, ref) => (
  <Link
    ref={ref}
    aria-label="Go to next page"
    className={cn(
      "flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background p-0 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <ChevronRight className="h-4 w-4" />
  </Link>
))
PaginationNext.displayName = "PaginationNext"

// --- Main Pagination Component (Using useMobile) ---
interface PaginationProps {
  currentPage?: number
  totalPages: number
  onPageChange?: (page: number) => void
  className?: string
}

function Pagination({ currentPage = 1, totalPages, onPageChange, className }: PaginationProps) {
  const t = useTranslations("table")

  // Use your custom useMobile hook
  const isMobile = useMobile() // Returns true if window.innerWidth < 768

  const getPageNumbers = () => {
    const pageNumbers = []
    // Adjust max pages shown based on screen size (using 768px breakpoint)
    const maxPagesToShow = isMobile ? 3 : 5 // Show 3 on mobile (<768px), 5 otherwise

    // ... (The rest of the getPageNumbers logic remains the same as before) ...
    if (totalPages <= maxPagesToShow + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      const showEllipsisStart = currentPage > Math.ceil(maxPagesToShow / 2) + (maxPagesToShow % 2 === 0 ? 0 : 0)
      const showEllipsisEnd = currentPage < totalPages - Math.floor(maxPagesToShow / 2)

      pageNumbers.push(1)
      if (showEllipsisStart) pageNumbers.push(-1)

      let startPage: number, endPage: number
      const sidePages = Math.floor((maxPagesToShow - 1) / 2)

      if (!showEllipsisStart) {
        startPage = 2
        endPage = maxPagesToShow + (showEllipsisEnd ? 0 : 1)
      } else if (!showEllipsisEnd) {
        startPage = totalPages - maxPagesToShow + (showEllipsisStart ? 0 : 1)
        endPage = totalPages - 1
      } else {
        startPage = currentPage - sidePages
        endPage = currentPage + sidePages
      }

      for (let i = startPage; i <= endPage; i++) {
        if (i > 1 && i < totalPages) {
          pageNumbers.push(i)
        }
      }

      if (showEllipsisEnd) pageNumbers.push(-1)
      if (totalPages > 1) pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange?.(page)
    }
  }

  if (totalPages <= 0) {
    return null
  }

  // Avoid rendering only Prev/Next if only 1 page on mobile
  if (totalPages === 1 && isMobile) {
    return null
  }

  return (
    <nav
      role="navigation"
      aria-label="Pagination Navigation"
      className={cn("mx-auto flex w-full justify-center", className)}
    >
      <PaginationContent>
        {/* Previous Button: Use md: breakpoint */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
          className={cn(
            "h-8 text-foreground disabled:opacity-50 disabled:pointer-events-none",
            // Icon only by default (mobile < 768px)
            // Auto width, padding, text, gap at md (>= 768px) and up
            "w-8 md:w-auto md:px-3 md:gap-1",
          )}
        >
          <ArrowLeftIcon className="h-4 w-4 flex-shrink-0" />
          {/* Text hidden below md (768px) */}
          <span className="hidden md:inline">{t("cta.previous")}</span>
        </Button>

        {/* Page Numbers and Ellipsis */}
        <div className="flex items-center gap-1 md:gap-1">
          {" "}
          {/* Adjusted gap */}
          {getPageNumbers().map((pageNumber, index) =>
            pageNumber === -1 ? (
              <PaginationEllipsis key={`ellipsis-${index}`} className="h-8 w-8" />
            ) : (
              <PaginationItem
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                aria-current={pageNumber === currentPage ? "page" : undefined}
                aria-label={`Go to page ${pageNumber}`}
                isActive={pageNumber === currentPage}
              >
                {pageNumber}
              </PaginationItem>
            ),
          )}
        </div>

        {/* Next Button: Use md: breakpoint */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Go to next page"
          className={cn(
            "h-8 text-foreground disabled:opacity-50 disabled:pointer-events-none",
            // Icon only by default (mobile < 768px)
            // Auto width, padding, text, gap at md (>= 768px) and up
            "w-8 md:w-auto md:px-3 md:gap-1",
          )}
        >
          {/* Text hidden below md (768px) */}
          <span className="hidden md:inline">{t("cta.next")}</span>
          <ArrowRightIcon className="h-4 w-4 flex-shrink-0" />
        </Button>
      </PaginationContent>
    </nav>
  )
}

// Export all components
export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
