"use client"

import { usePathname } from "next/navigation";

import Link from "next/link";

import { SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

import { FIRST_DASHBOARD_SIDEBAR_SECTION, SECOND_DASHBOARD_SIDEBAR_SECTION } from "@/consts/sidebars";

export default function DashboardSidebarBody() {
    const pathname = usePathname();

    return (
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Ứng dụng</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {
                            FIRST_DASHBOARD_SIDEBAR_SECTION.map(item => {
                                const isActive = pathname.startsWith(item.href);

                                return (
                                    <SidebarMenuItem key={item.href}>
                                        <SidebarMenuButton
                                            asChild
                                            size="lg"
                                            data-active={isActive}
                                            className="sidebar-btn!"
                                        >
                                            <Link href={item.href}>
                                                <item.icon />
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

            <SidebarGroup>
                <SidebarGroupLabel>Hoá đơn</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {
                            SECOND_DASHBOARD_SIDEBAR_SECTION.map(item => {
                                const isActive = pathname.startsWith(item.href);

                                return (
                                    <SidebarMenuItem key={item.href}>
                                        <SidebarMenuButton
                                            asChild
                                            size="lg"
                                            data-active={isActive}
                                            className="sidebar-btn!"
                                        >
                                            <Link href={item.href}>
                                                <item.icon />
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