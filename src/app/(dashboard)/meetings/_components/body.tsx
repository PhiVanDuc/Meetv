"use client"

import useGetMeetings from "@/app/(dashboard)/meetings/_hooks/use-get-meetings";

import Empty from "@/components/empty";
import { Table } from "@/components/table";
import Pagination from "@/components/pagination";
import MeetingFilter from "@/app/(dashboard)/meetings/_components/filter";
import MeetingColumns from "@/app/(dashboard)/meetings/_components/columns";

import { MeetingFilterFields } from "@/types/meeting";

type Props =
    Omit<Pagination, "totalPages">
    & { filter: MeetingFilterFields };

export default function MeetingBody({ page, limit, filter }: Props) {
    const { data, isPending, isError } = useGetMeetings({ page, limit, filter });

    return (
        <div className="space-y-[100px]">
            <div className="space-y-[30px]">
                <div className="space-y-[10px]">
                    <MeetingFilter filter={filter} />

                    <Table
                        isPending={isPending}
                        columns={MeetingColumns}
                        data={data?.meetings || []}
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
                (!isPending && !isError && !data?.createdMeeting)
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