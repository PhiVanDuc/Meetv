import Link from "next/link";

import { SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

import { FIRST_DASHBOARD_SIDEBAR_SECTION, SECOND_DASHBOARD_SIDEBAR_SECTION } from "@/consts";

export default function DashboardSidebarBody() {
    return (
        <SidebarContent className="my-[30px] space-y-[10px]">
            <SidebarGroup className="p-0 space-y-[10px]">
                <SidebarGroupLabel className="p-0 h-fit capitalize">Ứng dụng</SidebarGroupLabel>

                <SidebarGroupContent>
                    <SidebarMenu className="gap-[5px]">
                        {
                            FIRST_DASHBOARD_SIDEBAR_SECTION.map(item => {
                                return (
                                    <SidebarMenuItem key={item.href}>
                                        <SidebarMenuButton
                                            asChild
                                            size="lg"
                                            className="gap-[10px] [&_svg]:w-5 [&_svg]:h-5 text-zinc-500 font-medium color-sidebar-btn!"
                                        >
                                            <Link href={item.href}>
                                                <item.icon/>
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

            <SidebarGroup className="p-0 space-y-[10px]">
                <SidebarGroupLabel className="p-0 h-fit capitalize">Hoá đơn</SidebarGroupLabel>

                <SidebarGroupContent>
                    <SidebarMenu className="gap-[5px]">
                        {
                            SECOND_DASHBOARD_SIDEBAR_SECTION.map(item => {
                                return (
                                    <SidebarMenuItem key={item.href}>
                                        <SidebarMenuButton
                                            asChild
                                            size="lg"
                                            className="gap-[10px] [&_svg]:w-5 [&_svg]:h-5 text-zinc-500 font-medium color-sidebar-btn!"
                                        >
                                            <Link href={item.href}>
                                                <item.icon/>
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