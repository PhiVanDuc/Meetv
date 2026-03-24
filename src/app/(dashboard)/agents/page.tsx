import AgentBody from "@/app/(dashboard)/agents/_components/body";
import AgentHeader from "@/app/(dashboard)/agents/_components/header";

import { AgentFilterFields } from "@/types/agent";

interface Props {
    searchParams: Promise<PaginationPartial & AgentFilterFields>
}

export default async function Page({ searchParams }: Props) {
    const { page, limit, ...filter } = await searchParams;

    return (
        <div className="space-y-[30px]">
            <AgentHeader />

            <AgentBody
                page={page}
                limit={limit}
                filter={filter}
            />
        </div>
    )
}