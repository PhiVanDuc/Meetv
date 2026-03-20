"use client"

import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";

import Link from "next/link";
import Logo from "@/components/logo";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "@/components/ui/drawer";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

import { cn } from "@/libs/utils";
import { forwardRef } from "react";
import { toast } from "@pheralb/toast";
import { clearSession } from "@/services/session/server-actions";

import ICONS from "@/consts/icons";

interface Props {
    currentUser?: CurrentUser
}

type TriggerProps = Props & React.HTMLAttributes<HTMLDivElement>;

export default function DashboardSidebarUser({ currentUser }: Props) {
    const router = useRouter();
    const isMobile = useIsMobile();

    const handleSignOut = async () => {
        await clearSession();
        router.push("/sign-in");
        toast.success({ text: "Thành công", description: "Đăng xuất thành công." });
    }

    if (isMobile) {
        return (
            <Drawer>
                <DrawerTrigger asChild>
                    <Trigger currentUser={currentUser} />
                </DrawerTrigger>

                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>{currentUser?.name}</DrawerTitle>
                        <DrawerDescription>{currentUser?.email}</DrawerDescription>
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
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Trigger currentUser={currentUser} />
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                side="right"
                sideOffset={10}
            >
                <DropdownMenuGroup>
                    <p className="text-[15px] text-zinc-700 font-medium truncate">{currentUser?.name}</p>
                    <p className="text-[13px] text-zinc-500 font-medium truncate">{currentUser?.email}</p>
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
    )
}

const Trigger = forwardRef<HTMLDivElement, TriggerProps>(
    ({ currentUser, className, ...props }, ref) => {
        return (
            <div 
                ref={ref} 
                {...props} 
                className={cn(
                    "flex items-center gap-[10px] p-[10px] cursor-pointer text-white bg-brand-primary rounded-[10px]",
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
                    <p className="text-[14px] font-medium truncate">{currentUser?.name}</p>
                    <p className="text-[12px] font-medium truncate">{currentUser?.email}</p>
                </div>
            </div>
        )
    }
)

Trigger.displayName = "Trigger";