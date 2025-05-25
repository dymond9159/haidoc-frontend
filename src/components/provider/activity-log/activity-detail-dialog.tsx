// src/components/dialogs/ActivityDiffDialog.tsx
"use client"

import { PdfFileIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ActivityLogColumns } from "@/types/admin"
import { useTranslations } from "next-intl"
import type React from "react"

interface ActivityDetailDialogProps {
  activity: ActivityLogColumns | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onViewDocument?: (documentName: string, type: "before" | "after") => void
}

export const ActivityDetailDialog: React.FC<ActivityDetailDialogProps> = ({
  activity,
  open,
  onOpenChange,
  onViewDocument,
}) => {
  const t = useTranslations("modal.activityDetail")

  // Prevent rendering if no activity data or wrong type
  if (!activity || activity.type !== 2) {
    return null
  }

  const handleViewClick = (docName: string | undefined, type: "before" | "after") => {
    if (docName && onViewDocument) {
      onViewDocument(docName, type)
    } else if (docName) {
      console.warn(`View action for ${type} document: ${docName}. No 'onViewDocument' handler provided.`)
      // Potentially add default behavior like alert or opening if it's a URL
      // alert(`Visualizar ${type}: ${docName}`);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <p className="text-sm">{t("label.operationName")}</p>
            <p className="text-sm font-medium">{activity.name}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm">{t("label.date")}</p>
            <p className="text-sm font-medium">{activity.date}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm">{t("label.time")}</p>
            <p className="text-sm font-medium">{activity.time}</p>
          </div>

          {/* Before Document Section */}
          <div className="space-y-2">
            <p className="text-sm">{t("label.before")}</p>
            {activity.beforeDocument ? (
              <div className="mt-1 flex items-center justify-between gap-2 bg-gray-100 dark:bg-gray-700 p-2 rounded border border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-2 overflow-hidden">
                  <PdfFileIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  <span className="truncate text-sm text-gray-800 dark:text-gray-200" title={activity.beforeDocument}>
                    {activity.beforeDocument}
                  </span>
                </div>
                <Button
                  variant="link"
                  size="sm"
                  className="text-primary hover:text-primary/80 dark:text-blue-400 dark:hover:text-blue-500 px-1 h-auto flex-shrink-0 text-sm"
                  onClick={() => handleViewClick(activity.beforeDocument, "before")}
                  disabled={!onViewDocument || !activity.beforeDocument}
                >
                  {t("cta.view")}
                </Button>
              </div>
            ) : (
              <p className="mt-1 text-sm text-gray-500 italic">{t("empty.before")}</p>
            )}
          </div>

          {/* After Document Section */}
          <div className="space-y-2">
            <p className="text-sm">{t("label.after")}</p>
            {activity.afterDocument ? (
              <div className="mt-1 flex items-center justify-between gap-2 bg-gray-100 dark:bg-gray-700 p-2 rounded border border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-2 overflow-hidden">
                  <PdfFileIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  <span className="truncate text-sm text-gray-800 dark:text-gray-200" title={activity.afterDocument}>
                    {activity.afterDocument}
                  </span>
                </div>
                <Button
                  variant="link"
                  size="sm"
                  className="text-primary hover:text-primary/80 dark:text-blue-400 dark:hover:text-blue-500 px-1 h-auto flex-shrink-0 text-sm"
                  onClick={() => handleViewClick(activity.afterDocument, "after")}
                  disabled={!onViewDocument || !activity.afterDocument}
                >
                  {t("cta.view")}
                </Button>
              </div>
            ) : (
              <p className="mt-1 text-sm text-gray-500 italic">{t("empty.after")}</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
