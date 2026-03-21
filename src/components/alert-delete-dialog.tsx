"use client"

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogBody, AlertDialogCancel } from "@/components/ui/alert-dialog";

import ICONS from "@/consts/icons";

interface Props {
    open: boolean,
    object: string,
    isPending?: boolean,
    onConfirmDelete: () => void,
    onOpenChange: (open: boolean) => void,
}

export default function AlertDeleteDialog({ open, onOpenChange, object, onConfirmDelete, isPending }: Props) {
    return (
        <AlertDialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Xác nhận xoá {object}</AlertDialogTitle>
                    <AlertDialogDescription>Bạn có chắc chắn muốn xóa {object} không? Hành động này không thể hoàn tác và dữ liệu liên quan sẽ bị mất vĩnh viễn.</AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogBody>
                    <AlertDialogCancel>
                        <span>Từ chối</span>
                    </AlertDialogCancel>

                    <Button
                        disabled={isPending}
                        variant="destructive"
                        onClick={() => onConfirmDelete()}
                    >
                        { isPending ? <Spinner /> : <ICONS.DELETE /> }
                        <span>Xác nhận xoá</span>
                    </Button>
                </AlertDialogBody>
            </AlertDialogContent>
        </AlertDialog>
    )
}
