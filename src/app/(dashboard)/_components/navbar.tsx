"use client"

import useDashboardNavbar from "@/app/(dashboard)/_hooks/use-navbar";

import { Button } from "@/components/ui/button";
import DashboardCommand from "@/app/(dashboard)/_components/command";

import ICONS from "@/consts/icons";

export default function DashboardNavbar() {
    const { state, toggleSidebar, isMobile, isOpenCommand, setIsOpenCommand } = useDashboardNavbar();

    return (
        <header className="p-[15px] border-b">
            <DashboardCommand
                open={isOpenCommand}
                onOpenChange={setIsOpenCommand}
            />

            <nav className="flex items-center gap-[10px]">
                <Button
                    variant="outline"
                    onClick={toggleSidebar}
                    className="shrink-0 size-[36px]"
                >
                    { (state === "collapsed" || isMobile) ? <ICONS.EXPAND_PANEL /> : <ICONS.COLLAPSE_PANEL /> }
                </Button>

                <Button
                    variant="outline"
                    onClick={() => setIsOpenCommand(true)}
                    className="flex-1 justify-start max-w-[240px] h-[36px] text-zinc-500 hover:text-zinc-500"
                >
                    <ICONS.SEARCH />
                    <span>Tìm kiếm.</span>

                    <kbd className="inline-flex items-center gap-[4px] ml-auto px-[4px] font-mono bg-zinc-100 rounded border poiner-events-none select-none">
                        <span className="text-[12px] translate-y-[2px]">&#8984;</span>
                        <span>|</span>
                        <span>K</span>
                    </kbd>
                </Button>
            </nav>
        </header>
    )
}