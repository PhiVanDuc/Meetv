import Logo from "@/components/logo";

import { Profile } from "@/types/users";

interface DashboardSidebarFooterTriggerProps {
    profile?: Profile
}

export default function DashboardSidebarFooterTrigger({ profile }: DashboardSidebarFooterTriggerProps) {
    return (
        <div className="flex items-center gap-[10px] p-[10px] cursor-pointer text-left text-white bg-brand-primary rounded-[10px]">
            <div className="shrink-0 flex items-center justify-center size-[40px] bg-white rounded-full">
                <Logo
                    color="orange"
                    className="w-[25px]"
                />
            </div>

            <div className="min-w-0">
                <p className="text-[14px] font-medium truncate">{profile?.name}</p>
                <p className="text-[12px] font-medium truncate">{profile?.email}</p>
            </div>
        </div>
    )
}