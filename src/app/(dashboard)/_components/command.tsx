import { useIsMobile } from "@/hooks/use-mobile";

import { CommandDialog, Command, CommandInput, CommandList, CommandEmpty, CommandItem, CommandSeparator } from "@/components/ui/command";

import { cn } from "@/libs/utils";

import type { Dispatch, SetStateAction } from "react";

interface Props {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function DashboardCommand({ isOpen, setIsOpen }: Props) {
    const isMobile = useIsMobile();

    return (
        <CommandDialog
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <Command>
                <div className={cn(isMobile ? "p-[16px]": "p-[8px]")}>
                    <CommandInput placeholder="Tìm kiếm cuộc họp hoặc agent . . ." />
                </div>

                <CommandSeparator alwaysRender />

                <CommandList className={cn(isMobile ? "p-[16px]": "p-[8px]")}>
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