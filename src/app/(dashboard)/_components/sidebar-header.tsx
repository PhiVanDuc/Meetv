import Link from "next/link"
import Logo from "@/components/core/logo"
import { SidebarHeader } from "@/components/ui/sidebar"

export default function DashboardSidebarHeader() {
    return (
        <SidebarHeader>
            <Link
                href="/"
                className="flex items-center justify-center size-[45px] bg-orange-600 rounded-lg"
            >
                <Logo
                    color="white"
                    className="w-[30px]"
                />
            </Link>
        </SidebarHeader>
    )
}
