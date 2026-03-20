"use client"

import { useState } from "react";

import { Button } from "@/components/ui/button";
import AgentFormDialog from "@/app/(dashboard)/agents/_components/form-dialog";

import ICONS from "@/consts/icons";

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

            <AgentFormDialog
                formType="add"
                isOpen={isOpenDialog}
                setIsOpen={setIsOpenDialog}
            />
        </>
    )
}
