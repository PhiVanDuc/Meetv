import { SidebarProvider, Sidebar } from "@/components/ui/sidebar"
import DashboardSidebarBody from "@/app/(dashboard)/_components/sidebar-body"
import DashboardSidebarHeader from "@/app/(dashboard)/_components/sidebar-header"
import DashboardSidebarFooter from "@/app/(dashboard)/_components/sidebar-footer"

interface Props {
    children: React.ReactNode
}

export default function DashboardSidebar({children}: Props) {
    return (
        <SidebarProvider>
            <aside>
                <Sidebar>
                    <DashboardSidebarHeader />
                    <DashboardSidebarBody />
                    <DashboardSidebarFooter />
                </Sidebar>
            </aside>

            {children}
        </SidebarProvider>
    )
}