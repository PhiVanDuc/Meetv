import Logo from "@/components/logo";
import Skeleton from "@/components/skeleton";

export default function DashboardSidebarFooterSkeleton() {
    return (
        <div className="flex items-center gap-[10px] p-[10px] cursor-pointer text-left text-white bg-brand-primary rounded-[10px]">
            <div className="shrink-0 flex items-center justify-center size-[40px] bg-white rounded-full">
                <Logo
                    color="orange"
                    className="w-[25px]"
                />
            </div>

            <div className="min-w-0 w-full">
                <Skeleton className="space-y-[4px] w-full">
                    <Skeleton.DashboardSidebarFooterName />
                    <Skeleton.DashboardSidebarFooterEmail />
                </Skeleton>
            </div>
        </div>
    )
}