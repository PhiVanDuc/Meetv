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
            <nav className="flex items-center gap-[10px]">
                <Button
                    variant="outline"
                    onClick={toggleSidebar}
                    className="shrink-0 size-[36px]"
                >
                    {
                        (state === "collapsed" || isMobile)
                            ? <PanelLeftIcon />
                            : <PanelLeftClose />
                    }
                </Button>

                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsOpenCommand(true)}
                    className="justify-start w-full max-w-[240px] h-[36px] font-normal text-muted-foreground hover:text-muted-foreground"
                >
                    <SearchIcon />
                    <span>Search</span>

                    <kbd className="inline-flex items-center gap-[4px] ml-auto px-1 font-mono bg-muted rounded border poiner-events-none select-none">
                        <span className="text-[12px] translate-y-[2px]">&#8984;</span>
                        <span>|</span>
                        <span>K</span>
                    </kbd>
                </Button>
            </nav>

            <DashboardCommand
                isOpen={isOpenCommand}
                setIsOpen={setIsOpenCommand}
            />
        </>
    )
}