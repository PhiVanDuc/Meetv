"use client"

import useGetAgents from "@/app/(dashboard)/agents/_hooks/use-get-agents";

import Empty from "@/components/empty";
import { Table } from "@/components/table";
import Pagination from "@/components/pagination";
import AgentFilter from "@/app/(dashboard)/agents/_components/filter";

import columns from "@/app/(dashboard)/agents/columns";
import { AgentFilterFields } from "@/app/(dashboard)/agents/_components/filter";

type Props = PaginationPartial & {
    filter: AgentFilterFields
};

export default function AgentBody({ page, limit, filter }: Props) {
    const { isPending, isError, data } = useGetAgents({ page, limit, filter });

    return (
        <div className="space-y-[100px]">
            <div className="space-y-[30px]">
                <div className="space-y-[10px]">
                    <AgentFilter filter={filter} />

                    <Table
                        columns={columns}
                        isPending={isPending}
                        data={data?.agents || []}
                    />
                </div>

                {
                    (!isPending && !isError && data?.pagination)
                        && (
                            <Pagination
                                page={data.pagination.page}
                                totalPages={data.pagination.totalPages}
                            />
                        )
                }
            </div>

            {
                (!isPending && !isError && !data?.createdAgent)
                    && (
                        <Empty
                            title="Bắt đầu với agent đầu tiên"
                            description="Tạo agent tham gia vào các cuộc họp của bạn. Mỗi agent sẽ thực hiện theo hướng dẫn và có thể tương tác trực tiếp với những người tham gia trong cuộc gọi."
                        />
                    )
            }
        </div>
    )
}