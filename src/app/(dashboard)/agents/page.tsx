import AgentListTable from "@/app/(dashboard)/agents/_components/list-table";
import AgentListHeader from "@/app/(dashboard)/agents/_components/list-header";

export default function Page() {
    return (
        <div className="space-y-[30px]">
            <AgentListHeader />
            <AgentListTable />
        </div>
    )
}