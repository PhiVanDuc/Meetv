"use client"

import useAgentBody from "@/app/(dashboard)/agents/_hooks/use-body"

import { Table } from "@/components/core/table"
import Pagination from "@/components/core/pagination"
import Columns from "@/app/(dashboard)/agents/_components/colums"
import AgentFilter from "@/app/(dashboard)/agents/_components/filter"

import { IAgentFilter } from "@/types/agent"
import IllustrationMessage from "@/components/core/illustration-message"

type Props = Omit<Pagination, "totalPages">
    & {filter?: IAgentFilter}

export default function AgentBody({page, limit, filter}: Props) {
    const {queryAgents} = useAgentBody({page, limit, filter})

    if (!queryAgents.isPending && queryAgents.isError) return null

    return (
        <div className="space-y-[100px]">
            <div className="space-y-[30px]">
                <div className="space-y-[10px]">
                    <AgentFilter filter={filter} />

                    <Table
                        columns={Columns}
                        isPending={queryAgents.isPending}
                        data={queryAgents.data?.data?.agents ?? []}
                    />
                </div>

                {
                    (!queryAgents.isPending && queryAgents.data?.data?.pagination)
                        && <Pagination totalPages={queryAgents.data.data.pagination.totalPages} />
                }
            </div>

            {
                (!queryAgents.isPending && !queryAgents.data.data?.createdAgent)
                    && (
                        <IllustrationMessage
                            title="Bắt đầu với agent đầu tiên"
                            description="Tạo agent tham gia vào các cuộc họp của bạn. Mỗi agent sẽ thực hiện theo hướng dẫn và có thể tương tác trực tiếp với những người tham gia trong cuộc gọi."
                        />
                    )
            }
        </div>
    )
}