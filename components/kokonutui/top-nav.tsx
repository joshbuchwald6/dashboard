"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { Bell, ChevronRight } from "lucide-react"
import Profile01 from "./profile-01"
import Link from "next/link"
import { ThemeToggle } from "../theme-toggle"
import { useAuth } from '@/components/auth/AuthProvider'
import type { User as FirebaseUser } from 'firebase/auth'
import React from 'react'
import { useRouter } from 'next/navigation'

interface BreadcrumbItem {
  label: string
  href?: string
}

export default function TopNav() {
  const { user, loading } = useAuth() as { user: FirebaseUser | null, loading: boolean }
  const router = useRouter()
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "kokonutUI", href: "#" },
    { label: "dashboard", href: "#" },
  ]

  // Show nothing while loading or if not authenticated
  if (loading || !user) {
    return null
  }

  return (
    <nav className="h-20 flex items-center px-12 py-4 border-b border-zinc-800 bg-zinc-950/80">
      <div className="font-semibold text-lg flex items-center space-x-1 truncate max-w-[400px]">
        {breadcrumbs.map((item, index) => (
          <div key={item.label} className="flex items-center">
            {index > 0 && <ChevronRight className="h-5 w-5 text-gray-500 dark:text-gray-400 mx-1" />}
            {item.href ? (
              <Link
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 dark:text-gray-100">{item.label}</span>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <button
          type="button"
          className="p-2 hover:bg-gray-100 dark:hover:bg-[#1F1F23] rounded-full transition-colors"
        >
          <Bell className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </button>

        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <Image
              src={user.photoURL || '/default-avatar.png'}
              alt={user.displayName || user.email || 'User avatar'}
              width={36}
              height={36}
              className="rounded-full ring-2 ring-gray-200 dark:ring-[#2B2B30] cursor-pointer"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-[280px] sm:w-80 bg-background border-border rounded-lg shadow-lg"
          >
            <Profile01
              name={user.displayName || user.email || ''}
              role={user.email || ''}
              avatar={user.photoURL || '/default-avatar.png'}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}
