"use client"

import { useQuery } from "@tanstack/react-query";

import Empty from "@/components/empty";
import { Table } from "@/components/table";
import Pagination from "@/components/pagination";
import AgentFilter from "@/app/(dashboard)/agents/_components/filter";
import AgentColumns from "@/app/(dashboard)/agents/_components/columns";

import { AgentFilterFields } from "@/types/agent";
import { getAgents } from "@/services/agents/client-functions";

type Props =
    Omit<Pagination, "totalPages">
    & { filter: AgentFilterFields };

export default function AgentBody({ page, limit, filter }: Props) {
    const { isPending, isError, data } = useQuery({
        queryKey: ["getAgents", { page, limit, filter }],
        queryFn: () => getAgents({ page, limit, filter })
    });
    
    if (!isPending && isError) return null;

    return (
        <div className="space-y-[100px]">
            <div className="space-y-[30px]">
                <div className="space-y-[10px]">
                    <AgentFilter filter={filter} />

                    <Table
                        isPending={isPending}
                        columns={AgentColumns}
                        data={data?.data?.agents ?? []}
                    />
                </div>

                {
                    data?.data?.pagination
                        && (
                            <Pagination
                                page={data.data.pagination.page}
                                totalPages={data.data.pagination.totalPages}
                            />
                        )
                }
            </div>

            {
                (!isPending && !isError && !data?.data?.createdAgent)
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