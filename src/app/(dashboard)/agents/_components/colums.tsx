"use client"

import Avatar from "boring-avatars"
import { Button } from "@/components/ui/button"

import ICONS from "@/consts/icons"
import { Agent } from "@/types/agent"
import { ColumnDef } from "@tanstack/react-table"
import AgentTableActionCell from "@/app/(dashboard)/agents/_components/table-action-cell"

const Columns: ColumnDef<Agent>[] = [
    {
        accessorKey: "agent",
        header: () => <h2>Agent</h2>,
        cell: ({row}) => {
            const {name, instructions} = row.original

            return (
                <div className="space-y-[10px] min-w-[400px] max-w-[600px]">
                    <div className="flex items-center gap-[10px]">
                        <Avatar
                            size={35}
                            name={name}
                            className="shrink-0"
                        />

                        <p className="text-[15px] font-semibold capitalize line-clamp-2 whitespace-normal wrap-break-word">{name}</p>
                    </div>

                    <div className="flex gap-[10px] min-w-0 text-zinc-500">
                        <div className="shrink-0 flex justify-center w-[35px]">
                            <ICONS.ENTER className="size-[18px] translate-x-[5px]" />
                        </div>
                        
                        <p className="line-clamp-3 whitespace-normal wrap-break-word">{instructions}</p>
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: "meeting-count",
        header: () => <h2 className="text-center">Các cuộc họp</h2>,
        cell: () => {
            return (
                <div className="flex justify-center">
                    <Button variant="outline">
                        <ICONS.MEETING className="text-blue-600" />
                        <span className="text-[13px] text-zinc-700">10 Cuộc họp</span>
                    </Button>
                </div>
            )
        }
    },
    {
        accessorKey: "actions",
        header: () => <h2></h2>,
        cell: ({row}) => {
            const {id: agentId} = row.original

            return (
                <div className="flex justify-center">
                    <AgentTableActionCell agentId={agentId} />
                </div>
            )
        }
    }
]

export default Columns