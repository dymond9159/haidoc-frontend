"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

interface ProfileCardProps {
  title: string
  icon: React.ReactNode
  href?: string
  onClick?: () => void
}

export function ProfileCard({ title, icon, href, onClick }: ProfileCardProps) {
  const content = (
    <Card className="cursor-pointer hover:bg-secondary-2 hover:border-secondary">
      <CardContent className="flex items-center justify-between p-6">
        <div className="flex items-center">
          <div className="mr-4">{icon}</div>
          <h3 className="font-medium">{title}</h3>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-cyan-600"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </CardContent>
    </Card>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return <div onClick={onClick}>{content}</div>
}
