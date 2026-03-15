import Link from "next/link";
import Logo from "@/components/logo";

import { SidebarHeader } from "@/components/ui/sidebar";

export default function DashboardSidebarHeader() {
    return (
        <SidebarHeader className="flex-row items-center gap-[10px] p-0">
            <Link
                href="/"
                className="shrink-0 flex items-center justify-center size-[45px] bg-brand-primary rounded-[10px]"
            >
                <Logo
                    color="white"
                    className="w-[30px]"
                />
            </Link>
        </SidebarHeader>
    )
}
