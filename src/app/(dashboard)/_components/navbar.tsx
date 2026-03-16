"use client"

import { useEffect, useState } from "react";
import { useSidebar } from "@/components/ui/sidebar";

import DashboardCommand from "@/app/(dashboard)/_components/command";

import { Button } from "@/components/ui/button";
import { PanelLeftClose, PanelLeftIcon, SearchIcon } from "lucide-react";

export default function DashboardNavbar() {
    const { state, toggleSidebar, isMobile } = useSidebar();
    const [isOpenCommand, setIsOpenCommand] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpenCommand(state => !state);
            }
        }

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <>
            <DashboardCommand
                isOpen={isOpenCommand}
                setIsOpen={setIsOpenCommand}
            />

            <nav className="flex items-center gap-[10px]">
                <Button
                    variant="outline"
                    onClick={toggleSidebar}
                    className="shrink-0 size-[36px]"
                >
                    { (state === "collapsed" || isMobile) ? <PanelLeftIcon /> : <PanelLeftClose /> }
                </Button>

                <Button
                    variant="outline"
                    onClick={() => setIsOpenCommand(true)}
                    className="flex-1 justify-start max-w-[240px] h-[36px] text-zinc-500 hover:text-zinc-500"
                >
                    <SearchIcon />
                    <span>Tìm kiếm.</span>

                    <kbd className="inline-flex items-center gap-[4px] ml-auto px-[4px] font-mono bg-zinc-100 rounded border poiner-events-none select-none">
                        <span className="text-[12px] translate-y-[2px]">&#8984;</span>
                        <span>|</span>
                        <span>K</span>
                    </kbd>
                </Button>
            </nav>
        </>
    )
}