import { useQuery } from "@tanstack/react-query";

import Link from "next/link";

import PLANS from "@/consts/plans";
import ICONS from "@/consts/icons";
import { Profile } from "@/types/users";
import { getUsage } from "@/services/subscriptions/client-functions";

interface Props {
    profile?: Profile
}

export default function DashboardSidebarFooterUsagePlan({ profile }: Props) {
    const query = useQuery({
        queryKey: ["getUsage"],
        queryFn: () => getUsage()
    });

    const plan = PLANS.find(plan => plan.priceId === profile?.subscription?.servicePriceId);

    if (query.isError || !query.data?.data || !plan) return null;

    return (
        <div className="text-white text-[13px] bg-linear-to-br from-brand-primary to-orange-600 rounded-[10px] overflow-hidden">
            <div className="space-y-[20px] p-[10px] pb-[20px]">
                <div className="flex items-center gap-[10px] text-[14px] font-semibold capitalize">
                    <ICONS.ROCKET size={18} />
                    <p>{plan.label}</p>
                </div>

                <div className="space-y-[5px] font-medium">
                    <p>
                        {
                            isFinite(plan.features.maxAgents)
                                ? `${query.data.data.agentUsage}/${plan.features.maxAgents} Agents`
                                : "Không giới hạn agent."
                        }
                    </p>

                    <div className="w-full bg-white/30 rounded-full h-[8px] overflow-hidden">
                        <div
                            className="bg-white h-[8px] rounded-full"
                            style={{ width: `${(query.data.data.agentUsage / plan.features.maxAgents) * 100}%` }}
                        />
                    </div>
                </div>

                <div className="space-y-[5px] font-medium">
                    <p>
                        {
                            isFinite(plan.features.maxMeetings)
                                ? `${query.data.data.meetingUsage}/${plan.features.maxMeetings} Cuộc họp`
                                : "Không giới hạn cuộc họp."
                        }
                    </p>

                    <div className="w-full bg-white/30 rounded-full h-[8px] overflow-hidden">
                        <div
                            className="bg-white h-[8px] rounded-full"
                            style={{ width: `${(query.data.data.meetingUsage / plan.features.maxMeetings) * 100}%` }}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-[10px] font-medium">
                    <ICONS.CLOCK size={18} />
                    <p>{plan.features.durationPerMeeting / (60 * 1000)} phút / cuộc họp</p>
                </div>
            </div>

            {
                plan.priceId === "free"
                    && (
                        <Link
                            href="/upgrade"
                            className="flex items-center justify-center gap-[10px] p-[10px] text-[14px] font-semibold bg-black/10 cursor-pointer"
                        >
                            <ICONS.STAR size={18} />
                            <span>Nâng cấp</span>
                        </Link>
                    )
            }
        </div>
    )
}