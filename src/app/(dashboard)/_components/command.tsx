import { CommandDialog, Command, CommandInput, CommandList, CommandItem, CommandEmpty, CommandSeparator, CommandGroup } from "@/components/ui/command";

import { cn } from "@/libs/utils";
import { Dispatch, SetStateAction } from "react";

interface Props {
    open: boolean,
    onOpenChange: Dispatch<SetStateAction<boolean>>
}

export default function DashboardCommand({ open, onOpenChange }: Props) {
    return (
        <CommandDialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <Command>
                <CommandInput placeholder="Tìm kiếm các cuộc họp hoặc agent . . ." />
                <CommandSeparator alwaysRender />

                <CommandList>
                    <CommandEmpty>Không tìm thấy kết quả.</CommandEmpty>
                    
                    <CommandGroup heading="Cuộc họp">
                        {
                            Array.from({ length: 10 }).map((_, index) => {
                                return (
                                    <CommandItem
                                        key={index}
                                        className={cn(index !== 10 ? "mb-[5px]" : "")}
                                    >
                                        <p>Nội dung cho cuộc họp</p>
                                    </CommandItem>
                                )
                            })
                        }
                    </CommandGroup>
                </CommandList>
            </Command>
        </CommandDialog>
    )
}