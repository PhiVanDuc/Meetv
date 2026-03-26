import MeetingHeader from "@/app/(dashboard)/meetings/_components/header";

import { MeetingFilterFields } from "@/types/meeting";

interface Props {
    searchParams: Promise<PaginationPartial & MeetingFilterFields>
}

export default async function Page({ searchParams }: Props) {
    const { page, limit, ...filter } = await searchParams;

    return (
        <div className="space-y-[30px]">
            <MeetingHeader />
        </div>
    )
}