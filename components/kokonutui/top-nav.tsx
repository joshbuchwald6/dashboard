"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { Bell, ChevronRight } from "lucide-react"
import Profile01 from "./profile-01"
import Link from "next/link"
import { ThemeToggle } from "../theme-toggle"

interface BreadcrumbItem {
  label: string
  href?: string
}

export default function TopNav({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItem[] }) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-[#1F1F23]">
      <div className="flex items-center space-x-4">
        {breadcrumbs.map((item, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />}
            {item.href ? (
              <Link href={item.href} className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                {item.label}
              </Link>
            ) : (
              <span className="text-sm font-medium text-gray-900 dark:text-white">{item.label}</span>
            )}
          </div>
        ))}
      </div>
      
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          <Bell className="h-5 w-5" />
        </button>
        <Profile01 />
      </div>
    </div>
  )
}
