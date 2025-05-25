"use client"

import { BackButton } from "@/components/common"
import { ActivityDetailDialog } from "@/components/provider/activity-log/activity-detail-dialog"
import { Button } from "@/components/ui/button"
import { Pagination } from "@/components/ui/pagination"
import { ActivityLogColumns } from "@/types/admin"
import { useState } from "react"

import { activities as mockActivities } from "@/lib/mock-data/activity-log"
import { useTranslations } from "next-intl"

export default function AdminActivitiesPage() {
  const t = useTranslations("pages.provider.activityLog")
  const tCta = useTranslations("cta")

  const [currentPage, setCurrentPage] = useState(1)
  const [selectedActivity, setSelectedActivity] = useState<ActivityLogColumns | null>(null)

  // Mock data for activities
  const activities = mockActivities

  const handleViewActivity = (activity: ActivityLogColumns) => {
    setSelectedActivity(activity)
  }

  const handleCloseDialog = () => {
    setSelectedActivity(null)
  }

  const handleViewDocument = (documentName: string, type: "before" | "after") => {
    console.log(`Request to view ${type} document: ${documentName}`)
    // Implement actual document viewing logic here
    // Maybe open a new tab, or trigger another modal/view
    alert(`Simulating view for ${type} document: ${documentName}`)
    // Decide if the dialog should close after viewing
    // handleCloseDialog();
  }

  // --- Pagination Logic ---
  const ITEMS_PER_PAGE = 10
  const totalPages = Math.ceil(activities.length / ITEMS_PER_PAGE)
  const paginatedActivities = activities.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <BackButton text={t("cta.backButton")} />
      </div>

      <div className="space-y-4">
        {paginatedActivities.length > 0 ? (
          paginatedActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex flex-wrap justify-between items-center gap-2 border-b pb-4 dark:border-gray-700"
            >
              <div>
                <h3 className="font-medium">{activity.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {activity.date} · {activity.time}
                </p>
              </div>
              <Button variant="link" className="text-primary h-auto p-0" onClick={() => handleViewActivity(activity)}>
                {tCta("view")}
              </Button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">{t("empty.title")}</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pt-4">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />
        </div>
      )}

      <ActivityDetailDialog
        key={selectedActivity?.id ? `desc-${selectedActivity.id}` : "desc-null"}
        open={!!selectedActivity}
        onOpenChange={(isOpen) => !isOpen && handleCloseDialog()}
        activity={selectedActivity}
        onViewDocument={handleViewDocument}
      />
    </div>
  )
}
