import AgentHeader from "@/app/(dashboard)/meetings/_components/header";

interface Props {
    searchParams: Promise<PaginationPartial>
}

export default async function Page({ searchParams }: Props) {
    const { page, limit, ...filter } = await searchParams;

    return (
        <div className="space-y-[30px]">
            <AgentHeader />
        </div>
    )
}