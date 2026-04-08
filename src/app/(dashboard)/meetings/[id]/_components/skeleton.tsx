import Empty from "@/components/empty";
import Skeleton from "@/components/skeleton";

export function MeetingDetailHeaderSkeleton() {
    return (
        <Skeleton>
            <Skeleton.Heading />
        </Skeleton>
    )
}

interface MeetingDetailBodySkeletonProps {
    emptyTitle: string,
    emptyDescription: string
}

export function MeetingDetailBodySkeleton({ emptyTitle, emptyDescription }: MeetingDetailBodySkeletonProps) {
    return (
        <div className="flex-1 content-center">
            <div className="space-y-[30px]">
                <Empty
                    title={emptyTitle}
                    description={emptyDescription}
                />

                <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-[10px]">
                    <Skeleton className="order-2 md:order-1 w-full md:w-fit">
                        <Skeleton.Input className="w-full md:w-[158.88px]" />
                    </Skeleton>

                    <Skeleton className="order-1 md:order-2 w-full md:w-fit">
                        <Skeleton.Input className="w-full md:w-[164.7px]" />
                    </Skeleton>
                </div>
            </div>
        </div>
    )
}