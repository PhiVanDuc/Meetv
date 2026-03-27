"use client"

import Avatar from "boring-avatars";
import { Button } from "@/components/ui/button";
import MeetingCellActions from "@/app/(dashboard)/meetings/_components/cell-actions";

import ICONS from "@/consts/icons";
import { Meeting } from "@/types/meeting";
import { ColumnDef } from "@tanstack/react-table";
import MEETING_STATUSES from "@/consts/meeting-statuses";

const columns: ColumnDef<number>[] = [
    {
        accessorKey: "meeting",
        header: () => <h2>Cuộc họp</h2>,
        cell: () => {
            return (
                <div className="space-y-[5px] min-w-[400px] max-w-[600px]">
                    <p className="text-[15px] font-semibold capitalize line-clamp-2 whitespace-normal wrap-break-word">Phiên luyện tập tiếng việt</p>

                    <div className="flex items-center gap-[10px] text-zinc-500">
                        <ICONS.ENTER className="shrink-0 size-[18px]" />

                        <div className="flex items-center gap-[10px] min-w-0 text-[14px] font-medium">
                            <p className="capitalize truncate line-clamp-2 whitespace-normal">Gia sư dạy tiếng</p>

                            <Avatar
                                name="Gia sư dạy tiếng"
                                className="shrink-0 size-[20px]"
                            />

                            <p>20 Tháng 05 Năm 2026</p>
                        </div>
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: "status",
        header: () => <h2 className="text-center">Trạng thái</h2>,
        cell: () => {
            return (
                <div className="flex justify-center">
                    <Button
                        style={{
                            color: MEETING_STATUSES.completed.textColor,
                            background: MEETING_STATUSES.completed.backgroundColor
                        }}
                    >
                        <MEETING_STATUSES.completed.icon />
                        {MEETING_STATUSES.completed.label}
                    </Button>
                </div>
            )
        }
    },
    {
        accessorKey: "actions",
        header: () => <h2></h2>,
        cell: () => {
            return (
                <div className="flex justify-center">
                    <MeetingCellActions />
                </div>
            )
        }
    }
];

export default columns;