import { Sidebar } from "@/components/ui/sidebar";
import DashboardSidebarBody from "@/app/(dashboard)/_components/sidebar-body";
import DashboardSidebarHeader from "@/app/(dashboard)/_components/sidebar-header";
import DashboardSidebarFooter from "@/app/(dashboard)/_components/sidebar-footer";

import { getSessionUser } from "@/services/auth/server-actions";

export default async function DashboardSidebar() {
    const sessionUser = await getSessionUser();

    return (
        <aside>
            <Sidebar>
                <DashboardSidebarHeader />
                <DashboardSidebarBody />
                <DashboardSidebarFooter sessionUser={sessionUser} />
            </Sidebar>
        </aside>
    )
}
