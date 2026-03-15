import { CommandDialog, Command, CommandInput, CommandList, CommandItem, CommandSeparator } from "@/components/ui/command";

import type { Dispatch, SetStateAction } from "react";

interface Props {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function DashboardCommand({ isOpen, setIsOpen }: Props) {
    return (
        <CommandDialog
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <Command>
                <div className="p-[8px]">
                    <CommandInput placeholder="Tìm kiếm cuộc họp hoặc agent . . ." />
                </div>

                <CommandSeparator />

                <CommandList>
                    <CommandItem>
                        Test item
                    </CommandItem>
                </CommandList>
            </Command>
        </CommandDialog>
    )
}