"use client"

import useAgentCellActions from "@/app/(dashboard)/agents/_hooks/use-cell-actions";

import { Button } from "@/components/ui/button";
import AlertDeleteDialog from "@/components/alert-delete-dialog";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu";

import ICONS from "@/consts/icons";

interface Props {
    id: string
}

export default function AgentCellActions({ id }: Props) {
    const { isOpenAlert, setIsOpenAlert } = useAgentCellActions(id);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        <ICONS.VERTICAL_DOTS />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    side="left"
                    align="center"
                    sideOffset={10}
                    className="w-fit"
                >
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <ICONS.UPDATE />
                            <span>Cập nhật</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem onSelect={() => setIsOpenAlert(state => !state)}>
                            <ICONS.DELETE />
                            <span>Xoá vĩnh viễn</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDeleteDialog
                object="agent"
                open={isOpenAlert}
                onOpenChange={setIsOpenAlert}
                onConfirmDelete={() => {}}
            />
        </>
    )
}