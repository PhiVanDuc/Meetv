import { Sidebar } from "@/components/ui/sidebar";
import DashboardSidebarBody from "@/app/(dashboard)/_components/sidebar-body";
import DashboardSidebarHeader from "@/app/(dashboard)/_components/sidebar-header";
import DashboardSidebarFooter from "@/app/(dashboard)/_components/sidebar-footer";

export default async function DashboardSidebar() {
    return (
        <aside>
            <Sidebar>
                <DashboardSidebarHeader />
                <DashboardSidebarBody />
                <DashboardSidebarFooter />
            </Sidebar>
        </aside>
    )
}
