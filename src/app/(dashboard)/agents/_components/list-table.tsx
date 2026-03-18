"use client"

import Empty from "@/components/empty";
import { Table } from "@/components/table";
import Pagination from "@/components/pagination";

import columns from "@/app/(dashboard)/agents/columns";

export default function AgentListTable() {
    const data: Agent[] = [
        { id: "id", name: "Mentor thực hành phỏng vấn", slug: "Mentor thực hành phỏng vấn", instructions: "Đây là chỉ dẫn cho agent." },
        { id: "id", name: "Mentor chăm sóc sức khoẻ", slug: "Mentor chăm sóc sức khoẻ", instructions: "Đây là chỉ dẫn cho agent." },
        { id: "id", name: "Mentor chỉ dẫn khởi nghiệp", slug: "Mentor chỉ dẫn khởi nghiệp", instructions: "Đây là chỉ dẫn cho agent." }
    ]

    return (
        <div className="space-y-[100px]">
            <div className="space-y-[30px]">
                <Table
                    data={data}
                    columns={columns}
                />

                <Pagination />
            </div>

            <Empty
                title="Bắt đầu với agent đầu tiên"
                description="Tạo agent tham gia vào các cuộc họp của bạn. Mỗi agent sẽ thực hiện theo hướng dẫn và có thể tương tác trực tiếp với những người tham gia trong cuộc gọi."
            />
        </div>
    )
}