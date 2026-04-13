"use client"

import { useQuery } from "@tanstack/react-query";

import Empty from "@/components/empty";
import { Table } from "@/components/table";
import Pagination from "@/components/pagination";
import MeetingFilter from "@/app/(dashboard)/meetings/_components/filter";
import MeetingColumns from "@/app/(dashboard)/meetings/_components/columns";

import { MeetingFilterFields } from "@/types/meeting";
import { getMeetings } from "@/services/meetings/client-functions";

type Props =
    Omit<Pagination, "totalPages">
    & { filter: MeetingFilterFields };

export default function MeetingBody({ page, limit, filter }: Props) {
    const { isPending, isError, data } = useQuery({
        queryKey: ["getMeetings", { page, limit, filter }],
        queryFn: () => getMeetings({ page, limit, filter })
    });

    if (!isPending && isError) return null;

    return (
        <div className="space-y-[100px]">
            <div className="space-y-[30px]">
                <div className="space-y-[10px]">
                    <MeetingFilter filter={filter} />

                    <Table
                        isPending={isPending}
                        columns={MeetingColumns}
                        data={data?.data?.meetings || []}
                    />
                </div>

                {
                    (!isPending && data?.data?.pagination)
                        && (
                            <Pagination
                                page={data.data.pagination.page}
                                totalPages={data.data.pagination.totalPages}
                            />
                        )
                }
            </div>

            {
                (!isPending && !isError && !data?.data?.createdMeeting)
                    && (
                        <Empty
                            title="Bắt đầu với cuộc họp đầu tiên"
                            description="Lên lịch cuộc họp để kết nối mọi lúc mọi nơi. Mỗi buổi họp là cơ hội để bạn cộng tác, chia sẻ ý tưởng và tương tác trực tiếp với những người tham gia."
                        />
                    )
            }
        </div>
    )
}