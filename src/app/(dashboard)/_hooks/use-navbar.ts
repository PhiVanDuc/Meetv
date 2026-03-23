import { useEffect, useState } from "react";
import { useSidebar } from "@/components/ui/sidebar";

export default function useDashboardNavbar() {
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

    return { state, toggleSidebar, isMobile, isOpenCommand, setIsOpenCommand };
}