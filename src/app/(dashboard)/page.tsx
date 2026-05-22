import MeetingHeader from "@/app/(dashboard)/_components/header"

import { IMeetingFilter } from "@/types/meeting"

interface Props {
    searchParams: Promise<
        Omit<Pagination, "totalPages"> & IMeetingFilter
    >
}

export default async function Page({searchParams}: Props) {
    const {page, limit, ...filter} = await searchParams

    return (
        <div className="space-y-[30px]">
            <MeetingHeader />
        </div>
    )
}
