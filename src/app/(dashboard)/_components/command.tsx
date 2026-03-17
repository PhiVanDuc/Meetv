import { CommandDialog, Command, CommandInput, CommandList, CommandItem, CommandEmpty, CommandSeparator, CommandGroup } from "@/components/ui/command";

import { cn } from "@/libs/utils";
import { Dispatch, SetStateAction } from "react";

interface Props {
    isOpen?: boolean,
    setIsOpen?: Dispatch<SetStateAction<boolean>>
}

export default function DashboardCommand({ isOpen, setIsOpen }: Props) {
    return (
        <CommandDialog
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <Command>
                <div className="p-[15px]">
                    <CommandInput placeholder="Tìm kiếm các cuộc họp hoặc Agent . . ." />
                </div>

                <CommandSeparator alwaysRender />

                <CommandList>
                    <CommandEmpty>
                        <p>Không tìm thấy kết quả.</p>
                    </CommandEmpty>

                    <CommandGroup
                        heading="Cuộc họp"
                        className="mb-[15px]"
                    >
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

                    <CommandGroup heading="Agent">
                        {
                            Array.from({ length: 10 }).map((_, index) => {
                                return (
                                    <CommandItem 
                                        key={index}
                                        className={cn(index !== 10 ? "mb-[5px]" : "")}
                                    >
                                        <p>Nội dung cho Agent</p>
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