"use client"

import { useState } from "react"
import Link from "next/link"
import { BarChart, FileText, Home, User, Briefcase, Code, Sliders } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  const navItems = [
    { name: "Dashboard", href: "/", icon: Home, current: true },
    { name: "Profile", href: "/profile", icon: User, current: false },
    { name: "Skills", href: "/skills", icon: BarChart, current: false },
    { name: "Experience", href: "/experience", icon: Briefcase, current: false },
    { name: "Projects", href: "/projects", icon: Code, current: false },
    { name: "Preferences", href: "/preferences", icon: Sliders, current: false },
    { name: "Generated Resumes", href: "/resumes", icon: FileText, current: false },
  ]

  return (
    <div
      className={cn(
        "flex h-screen flex-col border-r bg-white transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-16 items-center border-b px-4">
        {!collapsed && <h1 className="text-xl font-bold">ResuMatch</h1>}
        {collapsed && (
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white">R</div>
        )}
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center rounded-md px-2 py-2 text-sm font-medium",
                item.current ? "bg-primary/10 text-primary" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 h-5 w-5 flex-shrink-0",
                  item.current ? "text-primary" : "text-gray-400 group-hover:text-gray-500",
                )}
              />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-200">
            <img src="/placeholder.svg?height=32&width=32" alt="User avatar" className="h-8 w-8 rounded-full" />
          </div>
          {!collapsed && (
            <div className="flex-1 truncate">
              <div className="text-sm font-medium">Alex Johnson</div>
              <div className="truncate text-xs text-gray-500">alex@example.com</div>
            </div>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="mt-4 flex w-full items-center justify-center rounded-md border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        >
          {collapsed ? <span className="sr-only">Expand</span> : <span>Collapse</span>}
        </button>
      </div>
    </div>
  )
}
