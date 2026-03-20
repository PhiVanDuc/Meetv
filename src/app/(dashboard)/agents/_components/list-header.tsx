import Header from "@/components/header";
import AgentAddButton from "@/app/(dashboard)/agents/_components/add-button";

export default function AgentListHeader() {
    return (
        <div className="flex flex-col md:flex-row gap-[15px] md:items-center justify-between">
            <Header>
                <h1 className="medium-header">Quản lý agent</h1>
                <p className="medium-desc">Theo dõi danh sách và thao tác với các agent của bạn.</p>
            </Header>

            <AgentAddButton />
        </div>
    )
}