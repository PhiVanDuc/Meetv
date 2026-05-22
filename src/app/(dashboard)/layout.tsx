import DashboardNavbar from "@/app/(dashboard)/_components/navbar"
import DashboardSidebar from "@/app/(dashboard)/_components/sidebar"

interface Props {
    children: React.ReactNode
}

export default function Layout({children}: Props) {
    return (
        <DashboardSidebar>
            <div className="flex-1 flex flex-col min-w-0 w-full h-screen">
                <DashboardNavbar />

                <main className="flex-1 flex flex-col w-full p-[15px] md:p-[30px] overflow-y-auto">
                    {children}
                </main>
            </div>
        </DashboardSidebar>
    )
}