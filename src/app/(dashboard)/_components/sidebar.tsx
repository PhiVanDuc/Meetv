import DashboardSidebarBody from "@/app/(dashboard)/_components/sidebar-body";
import DashboardSidebarHeader from "@/app/(dashboard)/_components/sidebar-header";
import DashboardSidebarFooter from "@/app/(dashboard)/_components/sidebar-footer";

import { Sidebar } from "@/components/ui/sidebar";

export default function DashboardSidebar() {
    return (
        <Sidebar>
            <DashboardSidebarHeader />
            <DashboardSidebarBody />
            <DashboardSidebarFooter />
        </Sidebar>
    )
}
