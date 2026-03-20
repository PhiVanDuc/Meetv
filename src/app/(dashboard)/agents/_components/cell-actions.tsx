"use client"

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu";

import ICONS from "@/consts/icons";

export default function AgentCellActions() {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <ICONS.VERTICAL_DOTS />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                side="left"
                align="center"
                sideOffset={10}
                className="w-fit"
            >
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <ICONS.UPDATE />
                        <span>Cập nhật</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <ICONS.DELETE />
                        <span>Xoá vĩnh viễn</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
