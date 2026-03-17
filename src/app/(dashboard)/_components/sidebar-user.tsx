"use client"

import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks";

import Link from "next/link";
import Logo from "@/components/logo";

import { LogOut } from "lucide-react";
import { IoMdCard } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "@/components/ui/drawer";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

import { toast } from "@pheralb/toast";
import { clearSession } from "@/services/session/server-actions";

export default function DashboardSidebarUser({ currentUser }: { currentUser?: CurrentUser }) {
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
                    <div className="flex items-center gap-[10px] p-[10px] text-white bg-brand-primary rounded-[10px]">
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
                            <Link href="/billing">
                                <IoMdCard />
                                <span>Hoá đơn</span>
                            </Link>
                        </Button>

                        <Button
                            variant="outline"
                            onClick={handleSignOut}
                        >
                            <LogOut />
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
                <div className="flex items-center gap-[10px] p-[10px] text-white bg-brand-primary rounded-[10px]">
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
                        <Link href="/billing">
                            <span>Hoá đơn</span>
                            <IoMdCard />
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onSelect={handleSignOut}
                        className="justify-between"
                    >
                        <span>Đăng xuất</span>
                        <LogOut />
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}