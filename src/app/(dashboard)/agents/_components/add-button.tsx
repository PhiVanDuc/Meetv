"use client"

import { useState } from "react";

import { Button } from "@/components/ui/button";

import dynamic from "next/dynamic";
import ICONS from "@/consts/icons";

const AgentFormDialog = dynamic(
    () => import("@/app/(dashboard)/agents/_components/form-dialog"),
    { ssr: false }
);

export default function AgentAddButton() {
    const [isOpenDialog, setIsOpenDialog] = useState(false);

    return (
        <>
            <Button
                variant="brand"
                className="w-fit"
                onClick={() => setIsOpenDialog(state => !state)}
            >
                <ICONS.ADD />
                <span>Thêm agent</span>
            </Button>

            {
                isOpenDialog
                    && (
                        <AgentFormDialog
                            formType="add"
                            open={isOpenDialog}
                            onOpenChange={setIsOpenDialog}
                        />
                    )
            }
        </>
    )
}
