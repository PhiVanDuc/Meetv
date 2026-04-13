import useMeetingCellActions from "@/app/(dashboard)/meetings/_hooks/use-cell-actions";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu";

import dynamic from "next/dynamic";
import ICONS from "@/consts/icons";

const MeetingFormDialog = dynamic(
    () => import("@/app/(dashboard)/meetings/_components/form-dialog"),
    { ssr: false }
);

const AlertDeleteDialog = dynamic(
    () => import("@/components/alert-delete-dialog"),
    { ssr: false }
);

interface Props {
    id: string
}

export default function MeetingCellActions({ id }: Props) {
    const { isOpenDialog, setIsOpenDialog, isOpenAlert, setIsOpenAlert, mutation } = useMeetingCellActions();

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
                        <DropdownMenuItem asChild>
                            <Link href={`/meetings/${id}`}>
                                <ICONS.MEETING />
                                <span>Cuộc họp</span>
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem onSelect={() => setIsOpenDialog(true)}>
                            <ICONS.UPDATE />
                            <span>Cập nhật</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem onSelect={() => setIsOpenAlert(true)}>
                            <ICONS.DELETE />
                            <span>Xoá vĩnh viễn</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            {
                isOpenDialog
                    && (
                        <MeetingFormDialog
                            id={id}
                            formType="update"
                            open={isOpenDialog}
                            onOpenChange={setIsOpenDialog}
                        />
                    )
            }

            {
                isOpenAlert
                    && (
                        <AlertDeleteDialog
                            object="cuộc họp"
                            open={isOpenAlert}
                            onOpenChange={setIsOpenAlert}
                            isPending={mutation.isPending}
                            onConfirmDelete={() => mutation.mutate(id)}
                        />
                    )
            }
        </>
    )
}