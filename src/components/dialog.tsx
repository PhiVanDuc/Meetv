"use client"

import { Dialog as ShadcnDialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody } from "@/components/ui/dialog";

interface Props {
    open: boolean,
    title: string,
    description: string,
    children: React.ReactNode,
    onOpenChange: (open: boolean) => void
}

export default function Dialog({ children, open, onOpenChange, title, description }: Props) {
    return (
        <ShadcnDialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                <DialogBody>
                    {children}
                </DialogBody>
            </DialogContent>
        </ShadcnDialog>
    )
}
