import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu";

import ICONS from "@/consts/icons";
import Link from "next/link";

export default function MeetingCellActions() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                asChild
                suppressHydrationWarning
            >
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
                    <DropdownMenuItem asChild>
                        <Link href="/">
                            <ICONS.MEETING />
                            <span>Cuộc họp</span>
                        </Link>
                    </DropdownMenuItem>

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
