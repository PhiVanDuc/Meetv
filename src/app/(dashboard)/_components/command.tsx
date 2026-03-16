import { CommandDialog, Command, CommandInput, CommandList, CommandEmpty, CommandItem, CommandSeparator } from "@/components/ui/command";

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

                <CommandSeparator alwaysRender />

                <CommandList>
                    <CommandEmpty>Không tìm thấy kết quả.</CommandEmpty>
                    <CommandItem className="mb-[5px]">Content of command item.</CommandItem>
                    <CommandItem className="mb-[5px]">Content of command item.</CommandItem>
                    <CommandItem className="mb-[5px]">Content of command item.</CommandItem>
                    <CommandItem className="mb-[5px]">Content of command item.</CommandItem>
                    <CommandItem className="mb-[5px]">Content of command item.</CommandItem>
                    <CommandItem className="mb-[5px]">Content of command item.</CommandItem>
                    <CommandItem className="mb-[5px]">Content of command item.</CommandItem>
                    <CommandItem className="mb-[5px]">Content of command item.</CommandItem>
                    <CommandItem className="mb-[5px]">Content of command item.</CommandItem>
                    <CommandItem className="mb-[5px]">Content of command item.</CommandItem>
                    <CommandItem className="mb-[5px]">Content of command item.</CommandItem>
                    <CommandItem className="mb-[5px]">Content of command item.</CommandItem>
                    <CommandItem className="mb-[5px]">Content of command item.</CommandItem>
                    <CommandItem className="mb-[5px]">Content of command item.</CommandItem>
                    <CommandItem className="mb-[5px]">Content of command item.</CommandItem>
                    <CommandItem className="mb-[5px]">Content of command item.</CommandItem>
                    <CommandItem className="mb-[5px]">Content of command item.</CommandItem>
                    <CommandItem className="mb-[5px]">Content of command item.</CommandItem>
                    <CommandItem className="mb-[5px]">Content of command item.</CommandItem>
                    <CommandItem className="mb-[5px]">Content of command item.</CommandItem>
                    <CommandItem className="mb-[5px]">Content of command item.</CommandItem>
                    <CommandItem className="mb-[5px]">Content of command item.</CommandItem>
                    <CommandItem className="mb-[5px]">Content of command item.</CommandItem>
                    <CommandItem className="mb-[5px]">Content of command item.</CommandItem>
                    <CommandItem className="mb-[5px]">Content of command item.</CommandItem>
                    <CommandItem className="mb-[5px]">Content of command item.</CommandItem>
                    <CommandItem className="mb-[5px]">Content of command item.</CommandItem>
                    <CommandItem className="mb-[5px]">Content of command item.</CommandItem>
                    <CommandItem className="mb-[5px]">Content of command item.</CommandItem>
                    <CommandItem>Content of command item.</CommandItem>
                </CommandList>
            </Command>
        </CommandDialog>
    )
}