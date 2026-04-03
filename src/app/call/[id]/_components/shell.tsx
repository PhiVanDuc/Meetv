"use client"

import useGetMeeting from "@/app/(dashboard)/meetings/_hooks/use-get-meeting";

import Empty from "@/components/empty";
import CallRoom from "@/app/call/[id]/_components/room";
import CallSkeleton from "@/app/call/[id]/_components/skeleton";
import CallProvider from "@/app/call/[id]/_components/provider";

import MEETING_STATUSES from "@/consts/meeting-statuses";

interface Props {
    id: string,
    sessionUser?: SessionUser
}

export default function CallShell({ id, sessionUser }: Props) {
    const { data, isPending } = useGetMeeting(id);

    if (isPending) return <CallSkeleton />
    
    if (data?.status === MEETING_STATUSES["processing"].value || data?.status === MEETING_STATUSES["completed"].value) {
        return (
            <Empty
                title="Cuộc họp đã kết thúc"
                description="Bạn không thể tham gia vào cuộc họp nữa."
            />
        )
    }

    if (data?.status === MEETING_STATUSES["upcoming"].value) {
        return (
            <CallProvider
                data={data}
                sessionUser={sessionUser}
            >
                <CallRoom data={data} />
            </CallProvider>
        )
    }

    return null;
}