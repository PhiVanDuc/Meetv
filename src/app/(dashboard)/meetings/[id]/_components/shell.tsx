"use client"

import { useQuery } from "@tanstack/react-query";

import MeetingDetailBody from "@/app/(dashboard)/meetings/[id]/_components/body";
import MeetingDetailHeader from "@/app/(dashboard)/meetings/[id]/_components/header";

import { getMeeting } from "@/services/meetings/client-functions";

interface Props {
    id: string
}

export default function MeetingShell({ id }: Props) {
    const { isPending, data } = useQuery({
        queryFn: () => getMeeting(id),
        queryKey: ["getMeeting", { id }]
    });

    return (
        <div className="flex-1 flex flex-col space-y-[30px]">
            <MeetingDetailHeader
                isPending={isPending}
                name={data?.data?.name ?? ""}
            />

            <MeetingDetailBody
                data={data?.data}
                isPending={isPending}
            />
        </div>
    )
}
