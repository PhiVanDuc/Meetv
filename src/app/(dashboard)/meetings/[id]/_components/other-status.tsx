import Link from "next/link";
import { Button } from "@/components/ui/button";

import ICONS from "@/consts/icons";
import Empty from "@/components/empty";
import { Meeting } from "@/types/meeting";
import MEETING_STATUSES from "@/consts/meeting-statuses";

interface Props {
    data: Meeting,
    emptyTitle: string,
    emptyDescription: string
}

export default function MeetingDetailOtherStatus({ emptyTitle, emptyDescription, data }: Props) {
    return (
        <div className="flex-1 content-center">
            <div className="space-y-[30px]">
                <Empty
                    title={emptyTitle}
                    description={emptyDescription}
                />

                {
                    (data.status === MEETING_STATUSES["upcoming"].value || data.status === MEETING_STATUSES["happening"].value)
                        && (
                            <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-[10px]">
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

                                        <span>
                                            {
                                                data.status === MEETING_STATUSES["upcoming"].value
                                                    ? "Bắt đầu cuộc họp"
                                                    : "Tham gia cuộc họp"
                                            }
                                        </span>
                                    </Link>
                                </Button>
                            </div>
                        )
                }
            </div>
        </div>
    )
}
