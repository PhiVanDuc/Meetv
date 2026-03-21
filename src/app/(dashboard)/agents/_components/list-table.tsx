"use client"

import useGetAgents from "@/app/(dashboard)/agents/_hooks/use-get-agents";

import Empty from "@/components/empty";
import { Table } from "@/components/table";
import Pagination from "@/components/pagination";

import columns from "@/app/(dashboard)/agents/columns";

type Props = PaginationPartial;

export default function AgentListTable({ page, limit }: Props) {
    const { isPending, isError, agents, pagination } = useGetAgents({ page, limit });

    return (
        <div className="space-y-[100px]">
            <div className="space-y-[30px]">
                <Table
                    data={agents}
                    columns={columns}
                    isPending={isPending}
                />

                {
                    (!isPending && !isError && pagination)
                        && (
                            <Pagination
                                page={pagination.page}
                                totalPages={pagination.totalPages}
                            />
                        )
                }
            </div>

            {
                (!isPending && !isError && agents.length === 0)
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