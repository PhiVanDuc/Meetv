"use client"

import { useIsMobile } from "@/hooks/use-mobile";

import { Drawer, DrawerHeader, DrawerContent, DrawerTitle, DrawerDescription, DrawerFooter } from "@/components/ui/drawer";
import { Dialog as ShadcnDialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface Props {
    children?: React.ReactNode,
    title: string,
    description: string,
    open?: boolean,
    onOpenChange?: (open: boolean) => void
}

export default function Dialog({ children, title, description, open, onOpenChange }: Props) {
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <Drawer
                open={open}
                onOpenChange={onOpenChange}
            >
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>{title}</DrawerTitle>
                        <DrawerDescription>{description}</DrawerDescription>
                    </DrawerHeader>

                    <DrawerFooter>
                        {children}
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        )
    }

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

                {children}
            </DialogContent>
        </ShadcnDialog>
    )
}