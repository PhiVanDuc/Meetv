"use client"

import { useState } from "react";

import Header from "@/components/header";
import AgentFormDialog from "@/app/(dashboard)/agents/_components/form-dialog";

import { Button } from "@/components/ui/button";

import { ICONS } from "@/consts";

export default function AgentListHeader() {
    const [isOpenDialog, setIsOpenDialog] = useState(false);

    return (
        <>
            <div className="flex flex-col md:flex-row gap-[15px] md:items-center justify-between">
                <Header>
                    <h1 className="medium-header">Quản lý agent</h1>
                    <p className="medium-desc">Theo dõi danh sách và thao tác với các agent của bạn.</p>
                </Header>

                <Button
                    variant="brand"
                    className="w-fit"
                    onClick={() => setIsOpenDialog(state => !state)}
                >
                    <ICONS.ADD />
                    <span>Thêm agent</span>
                </Button>
            </div>

            <AgentFormDialog
                formType="add"
                isOpen={isOpenDialog}
                setIsOpen={setIsOpenDialog}
            />
        </>
    )
}