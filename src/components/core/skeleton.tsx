import Logo from "@/components/core/logo"
import { Skeleton } from "@/components/ui/skeleton"

import { cn } from "@/libs/utils"

interface Props {
    className?: string
}

export function SkeletonLabel({className}: Props) {
    return <Skeleton className={cn("h-[19.25px] w-[60px]", className)} />
}

export function SkeletonInput({className}: Props) {
    return <Skeleton className={cn("h-[32px]", className)} />
}

export function SkeletonTextarea({className}: Props) {
    return <Skeleton className={cn("h-[100px]", className)} />
}

export function SkeletonDashboardSidebarFooter() {
    return (
        <div className="flex items-center gap-[10px] p-[10px] bg-linear-to-br from-orange-500 to-orange-600 rounded-[10px] text-left text-white">
            <div className="shrink-0 flex items-center justify-center size-[40px] bg-white rounded-full">
                <Logo
                    color="orange"
                    className="w-[25px]"
                />
            </div>

            <div className="space-y-[4px] w-full">
                <Skeleton className="h-[21px] bg-white/40" />
                <Skeleton className="h-[18px] bg-white/40 rounded-full" />
            </div>
        </div>
    )
}

export function SkeletonAgentForm() {
    return (
        <div className="space-y-[15px]">
            <div className="flex flex-col gap-[8px]">
                <SkeletonLabel />
                <SkeletonInput />
            </div>

            <div className="flex flex-col gap-[8px]">
                <SkeletonLabel />
                <SkeletonTextarea />
            </div>

            <SkeletonInput />
        </div>
    )
}

export function SkeletonMeetingForm() {
    return (
        <div className="space-y-[15px]">
            <div className="flex flex-col gap-[8px]">
                <SkeletonLabel />
                <SkeletonInput />
            </div>

            <div className="flex flex-col gap-[8px]">
                <SkeletonLabel />
                <SkeletonInput />
            </div>

            <SkeletonInput />
        </div>
    )
}

export function SkeletonSelectorOptions() {
    return (
        <div className="space-y-[5px]">
            <Skeleton className="h-[32px]" />
            <Skeleton className="h-[32px]" />
            <Skeleton className="h-[32px]" />
        </div>
    )
}