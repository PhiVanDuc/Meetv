"use client"

import { useState } from "react"

import Header from "@/components/core/header"
import { Button } from "@/components/ui/button"

import dynamic from "next/dynamic"
import ICONS from "@/consts/icons"

const HeaderForm = dynamic(
    () => import("@/app/(dashboard)/_components/form"),
    {ssr: false}
)

export default function MeetingHeader() {
    const [isOpenDialog, setIsOpenDialog] = useState(false)

    return (
        <div className="flex flex-wrap justify-between items-center gap-[15px]">
            <Header>
                <h1 className="header">Quản lý cuộc họp</h1>
                <p className="desc">Theo dõi danh sách và thao tác với các cuộc họp của bạn.</p>
            </Header>

            <Button
                className="w-fit bg-orange-600"
                onClick={() => setIsOpenDialog(true)}
            >
                <ICONS.ADD />
                <span>Thêm cuộc họp</span>
            </Button>

            {
                isOpenDialog
                    && (
                        <HeaderForm
                            action="add"
                            open={isOpenDialog}
                            onOpenChange={setIsOpenDialog}
                        />
                    )
            }
        </div>
    )
}