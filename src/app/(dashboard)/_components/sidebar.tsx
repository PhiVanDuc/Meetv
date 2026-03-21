import { Sidebar } from "@/components/ui/sidebar";
import DashboardSidebarBody from "@/app/(dashboard)/_components/sidebar-body";
import DashboardSidebarHeader from "@/app/(dashboard)/_components/sidebar-header";
import DashboardSidebarFooter from "@/app/(dashboard)/_components/sidebar-footer";

import { getCurrentUser } from "@/services/session/server-actions";

export default async function DashboardSidebar() {
    const currentUser = await getCurrentUser();

    return (
        <aside>
            <Sidebar>
                <DashboardSidebarHeader />
                <DashboardSidebarBody />
                <DashboardSidebarFooter currentUser={currentUser} />
            </Sidebar>
        </aside>
    )
}
