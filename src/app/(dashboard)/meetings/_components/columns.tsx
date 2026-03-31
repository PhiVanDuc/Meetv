"use client"

import Avatar from "boring-avatars";
import { Button } from "@/components/ui/button";
import MeetingCellActions from "@/app/(dashboard)/meetings/_components/cell-actions";

import ICONS from "@/consts/icons";
import { vi } from "date-fns/locale";
import { Meeting } from "@/types/meeting";
import { formatDistanceToNow } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import MEETING_STATUSES from "@/consts/meeting-statuses";
import capitalizeFirstLetter from "@/utils/capitalize-first-letter";

const columns: ColumnDef<Meeting>[] = [
    {
        accessorKey: "meeting",
        header: () => <h2>Cuộc họp</h2>,
        cell: ({ row }) => {
            const { name, agent, startedAt } = row.original;

            return (
                <div className="space-y-[10px] min-w-[400px] max-w-[600px]">
                    <p className="text-[15px] font-semibold capitalize line-clamp-2 whitespace-normal wrap-break-word">{name}</p>

                    <div className="flex items-center gap-[10px] text-zinc-500">
                        <ICONS.ENTER className="shrink-0 size-[18px]" />

                        <div className="flex items-center gap-[10px] min-w-0 text-[14px] font-medium">
                            <p className="capitalize truncate line-clamp-2 whitespace-normal">{agent.name}</p>

                            <Avatar
                                name={agent.name}
                                className="shrink-0 size-[20px]"
                            />

                            {
                                startedAt &&
                                    (
                                        <p className="font-normal">
                                            {
                                                capitalizeFirstLetter(
                                                    formatDistanceToNow(new Date(startedAt), {
                                                        addSuffix: true,
                                                        locale: vi,
                                                    })
                                                )
                                            }
                                        </p>
                                    )
                            }
                        </div>
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: "status",
        header: () => <h2 className="text-center">Trạng thái</h2>,
        cell: ({ row }) => {
            const { status } = row.original;
            const statusConst = MEETING_STATUSES[status];

            return (
                <div className="flex justify-center">
                    <Button
                        style={{
                            color: statusConst.textColor,
                            background: statusConst.backgroundColor
                        }}
                    >
                        <statusConst.icon />
                        {statusConst.label}
                    </Button>
                </div>
            )
        }
    },
    {
        accessorKey: "duration",
        header: () => <h2 className="text-center">Thời lượng</h2>,
        cell: ({ row }) => {
            const { startedAt, endedAt } = row.original;

            return (
                <div className="flex justify-center">
                    <Button variant="outline">
                        <ICONS.CLOCK className="text-brand-primary" />
                        <span>Chưa có thời lượng</span>
                    </Button>
                </div>
            )
        }
    },
    {
        accessorKey: "actions",
        header: () => <h2></h2>,
        cell: ({ row }) => {
            const { id } = row.original;

            return (
                <div className="flex justify-center">
                    <MeetingCellActions id={id} />
                </div>
            )
        }
    }
];

export default columns;