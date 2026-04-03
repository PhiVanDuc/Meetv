import Skeleton from "@/components/skeleton";

export default function CallSkeleton() {
    return (
        <div className="flex-1 flex items-center justify-center p-[15px] md:p-[30px] bg-black overflow-y-auto">
            <div className="w-full max-w-[500px] space-y-[30px] p-[20px] text-center bg-white rounded-[10px]">
                <Skeleton>
                    <Skeleton.Header>
                        <Skeleton.SmallHeading />
                        <Skeleton.Description />
                    </Skeleton.Header>
                </Skeleton>

                <Skeleton>
                    <Skeleton.PreviewVideoCall />
                </Skeleton>
            </div>
        </div>
    )
}
