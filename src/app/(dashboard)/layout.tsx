import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardNavbar from "@/app/(dashboard)/_components/navbar";
import DashboardSidebar from "@/app/(dashboard)/_components/sidebar";

interface Props {
    children: React.ReactNode
}

export default function Layout({ children }: Props) {
    return (
        <SidebarProvider>
            <aside><DashboardSidebar /></aside>

            <div className="flex flex-col h-screen w-screen">
                <header className="p-[15px] border-b"><DashboardNavbar /></header>
                
                <main className="flex-1 px-[15px] pt-[15px] md:px-[30px] md:pt-[30px]">
                    {children}
                </main>
            </div>
        </SidebarProvider>
    )
}