import useMeetingDetailBody from "@/app/(dashboard)/meetings/[id]/_hooks/use-body";

import Link from "next/link";
import Empty from "@/components/empty";
import { Meeting } from "@/types/meeting";
import Skeleton from "@/components/skeleton";
import { Button } from "@/components/ui/button";

import ICONS from "@/consts/icons";
import MEETING_STATUSES from "@/consts/meeting-statuses";

interface Props {
    data?: Meeting,
    isPending: boolean
}

export default function MeetingDetailBody({ data, isPending }: Props) {
    const { emptyTitle, emptyDescription } = useMeetingDetailBody({ data, isPending });

    return (
        <div className="flex-1 content-center">
            <div className="space-y-[30px]">
                <Empty
                    title={emptyTitle}
                    description={emptyDescription}
                />

                <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-[10px]">
                    {
                        isPending
                            ? (
                                <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-[10px]">
                                    <Skeleton className="order-2 md:order-1 w-full md:w-fit">
                                        <Skeleton.Input className="w-full md:w-[158.88px]" />
                                    </Skeleton>

                                    <Skeleton className="order-1 md:order-2 w-full md:w-fit">
                                        <Skeleton.Input className="w-full md:w-[164.7px]" />
                                    </Skeleton>
                                </div>
                            )
                            : (data?.status && data.status === MEETING_STATUSES["upcoming"].value)
                                && (
                                    <>
                                        <Button
                                            asChild
                                            variant="outline"
                                            className="order-2 md:order-1 w-full md:w-fit"
                                        >
                                            <Link href="/meetings">
                                                <ICONS.LOG_OUT />
                                                <span>Thoát khỏi cuộc họp</span>
                                            </Link>
                                        </Button>
    
                                        <Button
                                            asChild
                                            variant="brand"
                                            className="order-1 md:order-2 w-full md:w-fit"
                                        >
                                            <Link href={`/call/${data.id}`}>
                                                <ICONS.MEETING />
                                                <span>Bắt đầu cuộc họp</span>
                                            </Link>
                                        </Button>
                                    </>
                                )
                    }
                </div>
            </div>
        </div>
    )
}
