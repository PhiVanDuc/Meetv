"use client"

import { useState } from "react";

import { Button } from "@/components/ui/button";

import dynamic from "next/dynamic";
import ICONS from "@/consts/icons";

const MeetingFormDialog = dynamic(
    () => import("@/app/(dashboard)/meetings/_components/form-dialog"),
    { ssr: false }
)

export default function MeetingAddButton() {
    const [isOpenDialog, setIsOpenDialog] = useState(false);

    return (
        <>
            <Button
                variant="brand"
                className="w-fit"
                onClick={() => setIsOpenDialog(state => !state)}
            >
                <ICONS.ADD />
                <span>Thêm cuộc họp</span>
            </Button>

            {
                isOpenDialog
                    && (
                        <MeetingFormDialog
                            formType="add"
                            open={isOpenDialog}
                            onOpenChange={setIsOpenDialog}
                        />
                    )
            }
        </>
    )
}