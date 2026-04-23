"use client"

import { useQuery } from "@tanstack/react-query";

import { Skeleton } from "@/components/ui/skeleton";

import PLANS from "@/consts/plans";
import { getProfile } from "@/services/users/client-functions";

export default function UpgradePlanIndicator() {
    const query = useQuery({
        queryKey: ["getProfile"],
        queryFn: () => getProfile()
    });

    const plan = PLANS.find(plan => plan.priceId === query.data?.data?.subscription?.servicePriceId);
    
    if (query.isPending) {
        return (
            <div className="flex items-center justify-center">
                 <div className="flex items-center gap-[10px] w-fit pl-[15px] pr-[5px] py-[5px] bg-zinc-100 rounded-full">
                    <p className="text-[14px] font-medium">Gói hiện tại</p>
                    <Skeleton className="w-[80px] h-[31px] bg-brand-primary rounded-full" />
                 </div>
            </div>
        );
    }

    if (query.isError || !plan) return null;

    return (
        <div className="flex items-center justify-center">
            <div className="flex items-center gap-[10px] w-fit pl-[15px] pr-[5px] py-[5px] bg-zinc-100 rounded-full">
                <p className="text-[14px] font-medium">Gói hiện tại</p>
                <p className="px-[15px] py-[5px] bg-brand-primary rounded-full text-[14px] text-white font-medium capitalize">{plan.label}</p>
            </div>
        </div>
    )
}
