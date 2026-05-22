"use client"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel } from "@/components/ui/alert-dialog"

interface Props {
    open: boolean,
    title: string,
    isPending: boolean,
    description: string,
    onConfirm: () => void,
    cancelIcon?: React.ReactNode,
    actionIcon?: React.ReactNode,
    onOpenChange: (open: boolean) => void,
}

export default function Confirmation({open, onOpenChange, title, description, cancelIcon, actionIcon, onConfirm, isPending}: Props) {
    return (
        <AlertDialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">
                        {cancelIcon}
                        <span>Từ chối</span>
                    </AlertDialogCancel>

                    <Button
                        onClick={onConfirm}
                        disabled={isPending}
                    >
                        {
                            !isPending
                                ? actionIcon
                                : <Spinner />
                        }

                        <span>Tiếp tục</span>
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
