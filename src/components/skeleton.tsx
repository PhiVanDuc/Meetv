import { Skeleton as ShadcnSkeleton } from "@/components/ui/skeleton";

import { cn } from "@/libs/utils";

interface SkeletonProps {
    children: React.ReactNode,
    className?: string
}

export default function Skeleton({ children, className }: SkeletonProps) {
    return <div className={cn(className)}>{children}</div>
}

Skeleton.Form = function SkeletonForm({ children, className }: SkeletonProps) {
    return (
        <div
            className={cn(
                "space-y-[15px]",
                className
            )}
        >
            {children}
        </div>
    )
}

Skeleton.FormControl = function SkeletonFormControl({ children, className }: SkeletonProps) {
    return (
        <div
            className={cn(
                "space-y-[8px]",
                className
            )}
        >
            {children}
        </div>
    )
}

Skeleton.Label = function SkeletonLabel({ className }: Omit<SkeletonProps, "children">) {
    return (
        <ShadcnSkeleton
            className={cn(
                "w-full max-w-[100px] h-[19.250px] rounded-[5px]",
                className
            )}
        />
    )
}

Skeleton.Input = function SkeletonInput({ className }: Omit<SkeletonProps, "children">) {
    return (
        <ShadcnSkeleton
            className={cn(
                "w-full h-[36px] rounded-[8px]",
                className
            )}
        />
    )
}

Skeleton.Header = function SkeletonHeader({ className }: Omit<SkeletonProps, "children">) {
    return (
        <ShadcnSkeleton
            className={cn(
                "w-[200px] h-[36px] rounded-[8px]",
                className
            )}
        />
    )
}