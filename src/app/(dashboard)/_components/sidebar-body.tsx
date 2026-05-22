"use client"

import { usePathname } from "next/navigation"

import Link from "next/link"
import { SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"

import SIDEBAR_MENU_ITEMS from "@/consts/sidebar-menu-items"

export default function DashboardSidebarBody() {
    const pathname = usePathname()

    return (
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Ứng dụng</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {
                            SIDEBAR_MENU_ITEMS.map(item => {
                                const formatHref = item.href === "/" ? "/meetings" : item.href
                                const formatPathname = pathname === "/" ? "/meetings" : pathname
                                const isActive = formatPathname.startsWith(formatHref)

                                return (
                                    <SidebarMenuItem key={item.href}>
                                        <SidebarMenuButton
                                            asChild
                                            size="lg"
                                            data-active={isActive}
                                            className="sidebar-menu-btn!"
                                        >
                                            <Link href={item.href}>
                                                {item.icon}
                                                <span>{item.label}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })
                        }
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    )
}
