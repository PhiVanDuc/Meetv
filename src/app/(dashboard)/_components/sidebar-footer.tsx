"use client"

import useAuth from "@/hooks/use-auth"
import { useIsMobile } from "@/hooks/use-mobile"

import Link from "next/link"
import Logo from "@/components/core/logo"
import { SidebarFooter } from "@/components/ui/sidebar"
import { SkeletonDashboardSidebarFooter } from "@/components/core/skeleton"
import DashboardSidebarFooterUsage from "@/app/(dashboard)/_components/sidebar-footer-usage"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"

import ICONS from "@/consts/icons"

export default function DashboardSidebarFooter() {
    const isMobile = useIsMobile()
    const {isAuthPending, isProfileError, profile, handleSignOut} = useAuth()

    if (isAuthPending) {
        return (
            <SidebarFooter>
                <SkeletonDashboardSidebarFooter />
            </SidebarFooter>
        )
    }
    
    if (isProfileError) return null

    return (
        <SidebarFooter className="space-y-[10px]">
            <DashboardSidebarFooterUsage />

            <DropdownMenu>
                <DropdownMenuTrigger suppressHydrationWarning>
                    <div className="flex items-center gap-[10px] p-[10px] bg-linear-to-br from-orange-500 to-orange-600 rounded-[10px] text-left text-white">
                        <div className="shrink-0 flex items-center justify-center size-[40px] bg-white rounded-full">
                            <Logo
                                color="orange"
                                className="w-[25px]"
                            />
                        </div>

                        <div className="min-w-0 font-medium">
                            <p className="text-[14px] truncate">{profile?.name}</p>
                            <p className="text-[12px] truncate">{profile?.email}</p>
                        </div>
                    </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    sideOffset={10}
                    side={isMobile ? "top" : "right"}
                    align={isMobile ? "start" : "end"}
                >
                    <DropdownMenuGroup className="p-[10px] text-center font-medium">
                        <p className="text-[15px] text-zinc-700 truncate">{profile?.name}</p>
                        <p className="text-[13px] text-zinc-500 truncate">{profile?.email}</p>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    <DropdownMenuGroup className="p-[10px]">
                        <DropdownMenuItem
                            asChild
                            className="justify-between"
                        >
                            <Link href="/upgrade">
                                <span>Hoá đơn</span>
                                <ICONS.CARD />
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            onClick={handleSignOut}
                            className="justify-between"
                        >
                            <span>Đăng xuất</span>
                            <ICONS.LOG_OUT />
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarFooter>
    )
}