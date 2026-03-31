"use client"

import useGetMeeting from "@/app/(dashboard)/meetings/_hooks/use-get-meeting";

import MeetingDetailBody from "@/app/(dashboard)/meetings/[id]/_components/body";
import MeetingDetailHeader from "@/app/(dashboard)/meetings/[id]/_components/header";

interface Props {
    id: string
}

export default function MeetingShell({ id }: Props) {
    const { data, isPending } = useGetMeeting(id);

    return (
        <div className="flex-1 flex flex-col space-y-[30px]">
            <MeetingDetailHeader
                isPending={isPending}
                name={data?.name || ""}
            />

            <MeetingDetailBody
                data={data}
                isPending={isPending}
            />
        </div>
    )
}
