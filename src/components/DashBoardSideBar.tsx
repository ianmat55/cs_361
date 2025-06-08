"use client"

import { BarChart, Briefcase, Code, FileText, Home, Sliders, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

export default function DashboardSidebar() {
  const navItems = [
    { name: "Dashboard", href: "/", icon: Home, current: true },
    { name: "Profile", href: "/profile", icon: User, current: false },
    { name: "Skills", href: "/skills", icon: BarChart, current: false },
    { name: "Experience", href: "/experience", icon: Briefcase, current: false },
    { name: "Projects", href: "/projects", icon: Code, current: false },
    { name: "Preferences", href: "/preferences", icon: Sliders, current: false },
    { name: "Generated Resumes", href: "/resumes", icon: FileText, current: false },
  ]

  const { state } = useSidebar()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex h-14 items-center px-4">
          {state === "expanded" ? (
            <h1 className="text-xl font-bold">ResuMatch</h1>
          ) : (
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              R
            </div>
          )}
        </div>
        <SidebarTrigger className="absolute right-2 top-3" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={item.current} tooltip={item.name}>
                    <a href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-3 px-4 py-2">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User avatar" />
            <AvatarFallback>AJ</AvatarFallback>
          </Avatar>
          {state === "expanded" && (
            <div className="flex-1 truncate">
              <div className="text-sm font-medium">Alex Johnson</div>
              <div className="truncate text-xs text-muted-foreground">alex@example.com</div>
            </div>
          )}
        </div>
        {state === "expanded" && (
          <div className="px-4 py-2">
            <Button variant="outline" size="sm" className="w-full">
              Settings
            </Button>
          </div>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
