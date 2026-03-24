"use client"

import useDashboardSidebarFooter from "@/app/(dashboard)/_hooks/use-sidebar-footer";

import Link from "next/link";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { SidebarFooter } from "@/components/ui/sidebar";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "@/components/ui/drawer";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

import { cn } from "@/libs/utils";
import { forwardRef } from "react";
import ICONS from "@/consts/icons";

interface Props {
    sessionUser?: SessionUser
}

export default function DashboardSidebarFooter({ sessionUser }: Props) {
    const { isMobile, handleSignOut } = useDashboardSidebarFooter();

    if (isMobile) {
        return (
            <SidebarFooter>
                <Drawer>
                    <DrawerTrigger>
                        <Trigger sessionUser={sessionUser} />
                    </DrawerTrigger>

                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>{sessionUser?.name}</DrawerTitle>
                            <DrawerDescription>{sessionUser?.email}</DrawerDescription>
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
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Trigger sessionUser={sessionUser} />
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="end"
                    side="right"
                    sideOffset={10}
                >
                    <DropdownMenuGroup>
                        <p className="text-[15px] text-zinc-700 font-medium truncate">{sessionUser?.name}</p>
                        <p className="text-[13px] text-zinc-500 font-medium truncate">{sessionUser?.email}</p>
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

type TriggerProps = Props & React.HTMLAttributes<HTMLDivElement>;

const Trigger = forwardRef<HTMLDivElement, TriggerProps>(
    ({ sessionUser, className, ...props }, ref) => {
        return (
            <div 
                ref={ref} 
                {...props} 
                className={cn(
                    "flex items-center gap-[10px] p-[10px] cursor-pointer text-left text-white bg-brand-primary rounded-[10px]",
                    className
                )}
            >
                <div className="shrink-0 flex items-center justify-center size-[40px] bg-white rounded-full">
                    <Logo
                        color="orange"
                        className="w-[25px]"
                    />
                </div>

                <div className="min-w-0">
                    <p className="text-[14px] font-medium truncate">{sessionUser?.name}</p>
                    <p className="text-[12px] font-medium truncate">{sessionUser?.email}</p>
                </div>
            </div>
        )
    }
)

Trigger.displayName = "Trigger";