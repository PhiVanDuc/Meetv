"use client"

import useAuth from "@/hooks/use-auth";
import useDashboardSidebarFooter from "@/app/(dashboard)/_hooks/use-sidebar-footer";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SidebarFooter } from "@/components/ui/sidebar";
import DashboardSidebarFooterUsagePlan from "@/app/(dashboard)/_components/sidebar-footer-usage-plan";
import DashboardSidebarFooterTrigger from "@/app/(dashboard)/_components/sidebar-footer-trigger";
import DashboardSidebarFooterSkeleton from "@/app/(dashboard)/_components/sidebar-footer-skeleton";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "@/components/ui/drawer";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

import ICONS from "@/consts/icons";

export default function DashboardSidebarFooter() {
    const { isPending, profile } = useAuth();
    const { isMobile, handleSignOut } = useDashboardSidebarFooter();

    if (isPending) {
        return (
            <SidebarFooter>
                <DashboardSidebarFooterSkeleton />
            </SidebarFooter>
        );
    }

    if (isMobile) {
        return (
            <SidebarFooter>
                <DashboardSidebarFooterUsagePlan profile={profile} />

                <Drawer>
                    <DrawerTrigger suppressHydrationWarning>
                        <DashboardSidebarFooterTrigger profile={profile} />
                    </DrawerTrigger>

                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>{profile?.name}</DrawerTitle>
                            <DrawerDescription>{profile?.email}</DrawerDescription>
                        </DrawerHeader>

                        <DrawerFooter>
                            <Button
                                asChild
                                variant="outline"
                            >
                                <Link href="/upgrade">
                                    <ICONS.BILL />
                                    <span>Hoá đơn</span>
                                </Link>
                            </Button>

                            <Button
                                variant="outline"
                                onClick={handleSignOut}
                            >
                                <ICONS.LOG_OUT />
                                <span>Đăng xuất</span>
                            </Button>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </SidebarFooter>
        )
    }
    
    return (
        <SidebarFooter>
            <DashboardSidebarFooterUsagePlan profile={profile} />

            <DropdownMenu>
                <DropdownMenuTrigger suppressHydrationWarning>
                    <DashboardSidebarFooterTrigger profile={profile} />
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="end"
                    side="right"
                    sideOffset={10}
                >
                    <DropdownMenuGroup>
                        <p className="text-[15px] text-zinc-700 font-medium truncate">{profile?.name}</p>
                        <p className="text-[13px] text-zinc-500 font-medium truncate">{profile?.email}</p>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            asChild
                            className="justify-between"
                        >
                            <Link href="/upgrade">
                                <span>Hoá đơn</span>
                                <ICONS.BILL />
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            onSelect={handleSignOut}
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