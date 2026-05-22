"use client"

import { useState } from "react"

import Header from "@/components/core/header"
import { Button } from "@/components/ui/button"

import dynamic from "next/dynamic"
import ICONS from "@/consts/icons"

const AgentForm = dynamic(
    () => import("@/app/(dashboard)/agents/_components/form"),
    {ssr: false}
)

export default function AgentHeader() {
    const [isOpenDialog, setIsOpenDialog] = useState(false)

    return (
        <div className="flex flex-wrap justify-between items-center gap-[15px]">
            <Header>
                <h1 className="header">Quản lý agent</h1>
                <p className="desc">Theo dõi danh sách và thao tác với các agent của bạn.</p>
            </Header>

            <Button
                className="w-fit bg-orange-600"
                onClick={() => setIsOpenDialog(true)}
            >
                <ICONS.ADD />
                <span>Thêm agent</span>
            </Button>

            {
                isOpenDialog
                    && (
                        <AgentForm
                            action="add"
                            open={isOpenDialog}
                            onOpenChange={setIsOpenDialog}
                        />
                    )
            }
        </div>
    )
}
