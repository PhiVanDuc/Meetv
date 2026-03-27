import MeetingBody from "@/app/(dashboard)/meetings/_components/body";
import MeetingHeader from "@/app/(dashboard)/meetings/_components/header";

import { MeetingFilterFields } from "@/types/meeting";

interface Props {
    searchParams: Promise<Omit<Pagination, "totalPages"> & MeetingFilterFields>
}

export default async function Page({ searchParams }: Props) {
    const { page, limit, ...filter } = await searchParams;

    return (
        <div className="space-y-[30px]">
            <MeetingHeader />

            <MeetingBody
                page={page}
                limit={limit}
                filter={filter}
            />
        </div>
    )
}