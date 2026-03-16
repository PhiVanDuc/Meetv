import { SidebarFooter } from "@/components/ui/sidebar";
import DashboardSidebarUser from "@/app/(dashboard)/_components/sidebar-user";

import { getCurrentUser } from "@/services/session/server-actions";

export default async function DashboardSidebarFooter() {
    const currentUser = await getCurrentUser();

    return (
        <SidebarFooter>
            <DashboardSidebarUser currentUser={currentUser} />
        </SidebarFooter>
    )
}