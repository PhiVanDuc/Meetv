"use client"

import useUpgradePricingButton from "../_hooks/use-pricing-button";

import Skeleton from "@/components/skeleton";
import { Button } from '@/components/ui/button';

import { cn } from '@/libs/utils';
import PLANS from "@/consts/plans";

interface Props {
    plan: (typeof PLANS)[number]
}

export default function UpgradePricingButton({ plan: propPlan }: Props) {
    const { isPending, isError, plan, isSubscribe, labelButton } = useUpgradePricingButton(propPlan);

    if (isPending) {
        return (
            <Skeleton>
                <Skeleton.Input className="w-full" />
            </Skeleton>
        )
    }

    if (isError || !plan) return null;

    return (
        <Button
            className={cn(
                "w-full hover:scale-105",
                propPlan.isRecommend
                    ? "bg-white hover:bg-white text-brand-primary font-semibold"
                    : "bg-brand-primary hover:bg-brand-primary"
            )}
            disabled={isSubscribe}
        >
            {labelButton}
        </Button>
    )
}