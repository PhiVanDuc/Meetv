import useAgentTableActionCell from "@/app/(dashboard)/agents/_hooks/use-table-action-cell"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu"

import dynamic from "next/dynamic"
import ICONS from "@/consts/icons"

const AgentForm = dynamic(
    () => import("@/app/(dashboard)/agents/_components/form"),
    {ssr: false}
)

const Confirmation = dynamic(
    () => import("@/components/core/confirmation"),
    {ssr: false}
)

interface Props {
    agentId: string
}

export default function AgentTableActionCell({agentId}: Props) {
    const {isOpenDialog, setIsOpenDialog, handleOpenDialog, isOpenAlert, setIsOpenAlert, handleOpenAlert, deleteAgentMutation, handleDeleteAgent} = useAgentTableActionCell(agentId)

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild suppressHydrationWarning>
                    <Button variant="outline">
                        <ICONS.VERTICAL_DOTS />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    side="bottom"
                    align="end"
                    sideOffset={10}
                    className="w-fit"
                >
                    <DropdownMenuGroup className="p-[5px]">
                        <DropdownMenuItem onSelect={handleOpenDialog}>
                            <ICONS.CHANGE />
                            <span>Cập nhật</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem onSelect={handleOpenAlert}>
                            <ICONS.DELETE />
                            <span>Xoá vĩnh viễn</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            {
                isOpenDialog
                    && (
                        <AgentForm
                            action="update"
                            agentId={agentId}
                            open={isOpenDialog}
                            onOpenChange={setIsOpenDialog}
                        />
                    )
            }

            {
                isOpenAlert
                    && (
                        <Confirmation
                            open={isOpenAlert}
                            title="Xác nhận xoá agent"
                            onConfirm={handleDeleteAgent}
                            actionIcon={<ICONS.DELETE />}
                            onOpenChange={setIsOpenAlert}
                            isPending={deleteAgentMutation.isPending}
                            description="Bạn có chắc chắn muốn xóa agent không? Hành động này không thể hoàn tác và dữ liệu liên quan sẽ bị mất vĩnh viễn."
                        />
                    )
            }
        </>
    )
}
