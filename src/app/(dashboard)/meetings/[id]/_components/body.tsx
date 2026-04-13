import useMeetingDetailBody from "@/app/(dashboard)/meetings/[id]/_hooks/use-body";

import MeetingDetailOtherStatus from "@/app/(dashboard)/meetings/[id]/_components/other-status";
import { MeetingDetailBodySkeleton } from "@/app/(dashboard)/meetings/[id]/_components/skeleton";
import MeetingDetailCompletedStatus from "@/app/(dashboard)/meetings/[id]/_components/completed-status";

import { Meeting } from "@/types/meeting";
import MEETING_STATUSES from "@/consts/meeting-statuses";

interface Props {
    data?: Meeting,
    isPending: boolean
}

export default function MeetingDetailBody({ isPending, data }: Props) {
    const { emptyTitle, emptyDescription } = useMeetingDetailBody({ data, isPending });

    if (isPending) {
        return (
            <MeetingDetailBodySkeleton
                emptyTitle={emptyTitle}
                emptyDescription={emptyDescription}
            />
        )
    }

    if (data) {
        if (data.status !== MEETING_STATUSES["completed"].value) {
            return (
                <MeetingDetailOtherStatus
                    data={data}
                    emptyTitle={emptyTitle}
                    emptyDescription={emptyDescription}
                />
            )
        }
        
        return <MeetingDetailCompletedStatus data={data} />
    }

    return null;
}