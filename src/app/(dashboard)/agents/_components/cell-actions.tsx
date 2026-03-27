"use client"

import useAgentCellActions from "@/app/(dashboard)/agents/_hooks/use-cell-actions";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu";

import dynamic from "next/dynamic";
import ICONS from "@/consts/icons";

const AgentFormDialog = dynamic(
    () => import("@/app/(dashboard)/agents/_components/form-dialog"),
    { ssr: false }
);

const AlertDeleteDialog = dynamic(
    () => import("@/components/alert-delete-dialog"),
    { ssr: false }
);

interface Props {
    id: string
}

export default function AgentCellActions({ id }: Props) {
    const { isOpenDialog, setIsOpenDialog, isOpenAlert, setIsOpenAlert, mutation } = useAgentCellActions();

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger
                    asChild
                    suppressHydrationWarning
                >
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
                        <DropdownMenuItem onSelect={() => setIsOpenDialog(state => !state)}>
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

            {
                isOpenAlert
                    && (
                        <AlertDeleteDialog
                            object="agent"
                            open={isOpenAlert}
                            onOpenChange={setIsOpenAlert}
                            isPending={mutation.isPending}
                            onConfirmDelete={() => mutation.mutate(id)}
                        />
                    )
            }

            {
                isOpenDialog
                    && (
                        <AgentFormDialog
                            id={id}
                            formType="update"
                            open={isOpenDialog}
                            onOpenChange={setIsOpenDialog}
                        />
                    )
            }
        </>
    )
}