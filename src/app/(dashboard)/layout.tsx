import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/app/(dashboard)/_components/sidebar";

interface Props {
    children: React.ReactNode
}

export default function Layout({ children }: Props) {
    return (
        <SidebarProvider>
            <DashboardSidebar />

            <main className="flex flex-col h-screen w-screen">
                {children}
            </main>
        </SidebarProvider>
    )
}