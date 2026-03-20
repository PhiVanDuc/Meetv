import AgentListTable from "@/app/(dashboard)/agents/_components/list-table";
import AgentListHeader from "@/app/(dashboard)/agents/_components/list-header";

interface Props {
    searchParams: Promise<PaginationPartial>
}

export default async function Page({ searchParams }: Props) {
    const { page, limit } = await searchParams;

    return (
        <div className="space-y-[30px]">
            <AgentListHeader />

            <AgentListTable
                page={page}
                limit={limit}
            />
        </div>
    )
}