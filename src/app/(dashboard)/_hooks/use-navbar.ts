import { useEffect, useState } from "react"
import { useSidebar } from "@/components/ui/sidebar"

export default function useDashboardNavbar() {
    const [isOpenCommand, setIsOpenCommand] = useState(false)
    const {state: stateSidebar, toggleSidebar} = useSidebar()

    const handleOpenCommand = () => setIsOpenCommand(true)

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setIsOpenCommand(state => !state)
            }
        }

        document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [])

    return {isOpenCommand, setIsOpenCommand, handleOpenCommand, stateSidebar, toggleSidebar}
}
