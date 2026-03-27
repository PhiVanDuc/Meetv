"use client"

import Empty from "@/components/empty";
import { Table } from "@/components/table";
import Pagination from "@/components/pagination";
import MeetingFilter from "@/app/(dashboard)/meetings/_components/filter";

import { MeetingFilterFields } from "@/types/meeting";
import columns from "@/app/(dashboard)/meetings/columns";

type Props =
    Omit<Pagination, "totalPages">
    & { filter: MeetingFilterFields };

export default function MeetingBody({ page, limit, filter }: Props) {
    return (
        <div className="space-y-[100px]">
            <div className="space-y-[30px]">
                <div className="space-y-[10px]">
                    <MeetingFilter filter={filter} />

                    <Table
                        columns={columns}
                        data={[]}
                    />
                </div>

                <Pagination
                    page="1"
                    totalPages="1"
                />
            </div>

            <Empty
                title="Bắt đầu với cuộc họp đầu tiên"
                description="Lên lịch cuộc họp để kết nối mọi lúc mọi nơi. Mỗi buổi họp là cơ hội để bạn cộng tác, chia sẻ ý tưởng và tương tác trực tiếp với những người tham gia."
            />
        </div>
    )
}